//PUERTO
process.env.PORT = process.env.PORT || 3000;

//Entorno (ENV)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Connection to data base
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://admin:aotqf86761@cluster0-e0vrc.mongodb.net/biblioteca';

} else {
    urlDB = 'mongodb://localhost:27017/biblioteca';
}

process.env.URLDB = urlDB;
//FIRMA DE JWT
process.env.SEED = process.env.SEED || 'firma-super-secreta';

//EXPIRE TIME JWT
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '3h';