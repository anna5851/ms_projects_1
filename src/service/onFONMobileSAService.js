const onFONMobileSADetialsClient = require('../clients/onFONMobileSAClient');

async function onFONMobileSADetialsService(req, res){
    
    return onFONMobileSADetialsClient.onFONMobileSADetialsClient(req, res);
}

module.exports ={
    onFONMobileSADetialsService
};