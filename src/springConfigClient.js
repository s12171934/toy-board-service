const axios = require('axios');

const getConfigFromServer = async () => {
  try {
    const response = await axios.get('http://admin:admin1234@localhost:9000/board/dev');
    const config = response.data.propertySources[0].source;
    return config;
  }
  catch (error) {
    console.error('Error fetching config', error);
  }
};

module.exports = getConfigFromServer();