(async function(){
  const express = require('express');
  const boardRoutes = require('./src/routes/BoardRoutes');
  const config = await require('./src/config/SpringConfigClient');
  const eureka = require('./src/config/EurekaClientConfig');
  
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
  const eurekaClient = eureka.createEurekaClient(config);
  eurekaClient.start();

  
  module.exports = app;
})();
