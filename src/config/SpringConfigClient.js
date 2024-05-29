const axios = require('axios');

let config;

const getConfigData = async () => {
  if(config) return config;

  try {
    const response = await axios.get('http://admin:admin1234@localhost:9000/board/dev');
    config = response.data.propertySources[0].source;
    return config;
  }
  catch (error) {
    console.error('Error fetching config', error);
  }
};

module.exports = { getConfigData };