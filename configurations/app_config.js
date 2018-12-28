
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.PORT = process.env.PORT || 3001;

let config = {
    server: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT
    },
    database: {
        connect_uri: ''
    }
};

module.exports = config;
