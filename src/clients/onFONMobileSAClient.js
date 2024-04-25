
const axios = require('axios');
const onFonMobileSAAPI = "http://10.102.217.183:8001/services/OnFonMobileSA/v1";


async function onFONMobileSADetialsClient(req, res){
    const response = await axios.post(onFonMobileSAAPI, jsonData);
    return response;

}

module.exports={
    onFONMobileSADetialsClient
}