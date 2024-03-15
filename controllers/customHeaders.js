const dotenv = require('dotenv');
dotenv.config();

const environment = process.env.AMBIENTE.toUpperCase();

const privateKey = process.env[`PAGAR_ME_SECRETA_${environment}`];
const petloveKey = process.env[`PETLOVE_TOKEN_${environment}`];

function headersPagarMe(){    
    const dataBase64 = Buffer.from(`${privateKey}:`).toString('base64');

    const header = { 
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Basic ${dataBase64}`, 
            "accept": "application/json" 
        } 
    };

    return header;
}

function headersPetlove(){    
    const header = { 
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${petloveKey}`, 
            "accept": "application/json" 
        } 
    };

    return header;
}

module.exports = { 
    headersPagarMe, 
    headersPetlove 
};
