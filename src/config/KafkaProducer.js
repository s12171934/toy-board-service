//Kafka Event Producer 설정 및 produce function
const { Kafka } = require('kafkajs');
const { getConfig } = require('./SpringConfigClient');

let globalProducer;

const getProducer = async () => {
  if(globalProducer) return globalProducer;

  const config = await getConfig();

  const kafka = new Kafka({
    clientId: config['kafka.clientId'],
    brokers: config['kafka.brokersIp']
  });

  globalProducer = kafka.producer();
  return globalProducer;
}

//게시물 삭제시 이벤트 발생
const produceBoardDelete = async (boards) => {
  const producer = await getProducer();

  await producer.connect();

  await boards.forEach((boardId) => {
    producer.send({
      topic: 'board-delete',
      messages: [
        boardId
      ]
    });

    console.log('Message send to Kafka:' + boardId);
  })

  await producer.disconnect();
}

module.exports = { produceBoardDelete };