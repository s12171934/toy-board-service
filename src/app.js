(async function(){
  const express = require('express');
  const config = await require('./springConfigClient');
  const app = express();
  const boardRoutes = require('./routes/BoardRoutes');

  const port = config.port;

  app.listen(port, () => {
    console.log(`listen to ${port}`)
  });

  app.use('/board', boardRoutes);
  
  module.exports = app;
})();
