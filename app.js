(async function(){
  const express = require('express');
  const config = await require('./src/springConfigClient');
  const app = express();
  const boardRoutes = require('./src/routes/BoardRoutes');

  const port = config.port;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.listen(port, () => {
    console.log(`listen to ${port}`)
  });

  app.use('/board', boardRoutes);
  
  module.exports = app;
})();
