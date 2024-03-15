const dotenv = require('dotenv');

dotenv.config();

async function waitBetweenRequest (ms) {
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, ms);
    });
}

module.exports = {
    waitBetweenRequest
};