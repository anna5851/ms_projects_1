
const onFONMobileSADetialsService = require('../service/onFONMobileSAService')

async function onFONMobileSADetialsController(req, res){

    return onFONMobileSADetialsService.onFONMobileSADetialsService(req, res);

}

module.exports ={
    onFONMobileSADetialsController
};