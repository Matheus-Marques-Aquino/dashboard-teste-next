const {
    MongoClient
} = require('mongodb');

const dotenv = require('dotenv');

const enviroment = process.env.AMBIENTE.toUpperCase();

dotenv.config();

class MongoConnection {
    constructor() {
        this.connections = new Map();
    }

    generateUserId(){
        let userId = '';
        
        for (let i = 0; i < 5; i++){ 
            userId += Math.random(0).toString(36).slice(-10); 
        }

        return userId.toUpperCase();
    }

    async connect(userId) {
        const client = new MongoClient(process.env.DB_URL, {
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        });

        try {
            await client.connect();

            this.connections.set(userId, client);

            console.log(`Conexão com o banco de dados aberta para o usuário ${userId}!`);
        } catch (error) {
            console.log(`Ocorreu um erro durante a conexão com o banco de dados para o usuário ${userId}!`, error);
        }

        return client;
    }

    async disconnect(userId) {
        const client = this.connections.get(userId);

        if (client) {
            try {
                await client.close();

                this.connections.delete(userId);

                console.log(`Conexão com o banco de dados fechada para o usuário ${userId}!`);
            } catch (error) {                
                console.log(`Ocorreu um erro ao fechar a conexão com o banco de dados para o usuário ${userId}!`, error);
            }
        }
    }

    getClient(userId) {
        return this.connections.get(userId);
    }

    getConnectedUsers() {
        return Array.from(this.connections.keys());
    }

    async getDatabase(userId, database) {
        const client = this.getClient(userId);

        const databaseName = enviroment == 'PRODUCAO' ? database : database + '-SandBox'

        if (client) { 
            return client.db(databaseName); 
        }

        return null;
    }

    async getCollection(userId, collection, database) {
        const db = await this.getDatabase(userId, database);

        if (db) {
            const collections = await db.listCollections({ name: collection }).toArray();
            
            if (collections.length > 0) { 
                return db.collection(collection); 
            }

            const newCollection = await db.createCollection(collection, { capped: false });

            return newCollection;
        }

        return null;
    }
}

export default MongoConnection;