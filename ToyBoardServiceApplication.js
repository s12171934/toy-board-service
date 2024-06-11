(async function(){
  const express = require('express');
  const boardRoutes = require('./src/routes/BoardRoutes');
  const { getEurekaClient } = require('./src/config/EurekaClientConfig');
  const { getConfig } = require('./src/config/SpringConfigClient');
  const { getSequelize } = require('./src/config/SequelizeConfig');
  const { setBoard } = require('./src/models/Board');
  const KafkaConsumer = require('./src/config/KafkaConsumer');

  const config = await getConfig();
  
  const app = express();

  //body-parser 대체
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //routes 설정
  app.use('/board', boardRoutes);

  //port번호 설정
  const port = config.port;

  //포트 지정
  app.listen(port, () => {
    console.log(`listen to ${port}`)
  });

  //eureka client 설정
  const eureka = await getEurekaClient();
  eureka.start();

  //sequelize 설정
  const sequelize = await getSequelize();
  await setBoard();
  sequelize.sync();

  //kafka listener 시작
  KafkaConsumer.consumeReportAlert()
    .then(() => console.log('Started consuming report messages from Kafka'))
    .catch((error) => console.error('Error consuming report messages:', error));
  KafkaConsumer.consumeUserDelete()
    .then(() => console.log('Started consuming user messages from Kafka'))
    .catch((error) => console.error('Error consuming user messages:', error));

  module.exports = app;
})();
