(async function(){
  const express = require('express');
  const boardRoutes = require('./src/routes/BoardRoutes');
  const config = await require('./src/config/springConfigClient');
  const eureka = require('./src/config/EurekaClientConfig');

  const port = config.port;

  const eurekaClient = eureka.createEurekaClient(config);
  eurekaClient.start();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.listen(port, () => {
    console.log(`listen to ${port}`)
  });

  app.use('/board', boardRoutes);
  
  module.exports = app;
})();
