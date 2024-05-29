const axios = require('axios');
const { createEurekaClient } = require('../config/EurekaClientConfig');

const checkUsername = async (req) => {
  const eurekaClient = await createEurekaClient();
  const passportUsername = JSON.parse(req.headers.passport).username;
  const writer = req.body.writer;

  console.log(passportUsername);
  console.log(writer);

  if (passportUsername != writer) return null;

  try {
    const instances = await eurekaClient.getInstancesByAppId('USER-SERVICE');
    const randomInstance = instances[Math.floor(Math.random() * instances.length)];
    const serviceUrl = `http://${randomInstance.hostName}:${randomInstance.port.$}/user`;
    const response = await axios.get(serviceUrl, { headers: req.headers });

    console.log(response)

    if (response.data.username == passportUsername) return passportUsername;
    else return null;
  }
  catch (error) {
    console.error('Error fetching username', error);
  }
}

module.exports = { checkUsername };