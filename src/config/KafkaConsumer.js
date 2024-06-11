//Kafka Comsumer 설정 및 consume function
const { Kafka } = require('kafkajs');
const { getConfig } = require('./SpringConfigClient');
const { produceBoardDelete } = require('./KafkaProducer');
const { setBoard } = require('../models/Board');

let globalConsumer;

const getConsumer = async () => {
  if(globalConsumer) {
    return globalConsumer;
  }
  
  const config = await getConfig();

  console.log(config);

  const kafka = new Kafka({
    clientId: config['kafka.clientId'],
    brokers: [config['kafka.brokersIp']]
  });

  globalConsumer = kafka.consumer({ groupId: config['kafka.groupId'] });
  return globalConsumer;
}

//user 삭제시 해당 user가 작성한 게시글 삭제
const consumeUserDelete = async () => {
  const Board = await setBoard();
  const consumer = await getConsumer();
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-delete', fromBeginnig: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString()
      })
      const boardIds = Board.findAll({
        order: [
          ['id','asc']
        ],
        offset: (page - 1) * 3,
        limit: 3
      }).then(boards => {
        return boards.map((board) => board.id)
      });
      produceBoardDelete(boardIds);
    }
  })
}

//신고 누적으로 인한 게시물 삭제
const consumeReportAlert = async () => {
  const Board = await setBoard();
  const consumer = await getConsumer();
  await consumer.connect();
  await consumer.subscribe({ topic: 'report-alert', fromBeginnig: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString()
      })
      Board.destroy({
        where: {
          id: boardId
        }
      });
      produceBoardDelete([message]);
    }
  })
}

module.exports = {
  consumeUserDelete,
  consumeReportAlert,
};