const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port=process.env.PORT;

        //Conectar a Base de datos
        this.connectDB();
        //MIDDLEWARE
        this.middlewares();


        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors());
        //Lectura de Body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/api/users',require('../routes/user'));
    }

    start(){
        this.app.listen(this.port,()=>{
            console.log('Servidor levantado en: ', this.port);
        });
    }
}

module.exports= Server;