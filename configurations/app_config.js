
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.PORT = process.env.PORT || 3001;

let config = {
    server: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT
    },
    database: {
        connect_uri: 'mongodb://fsd-server-admin:fsdadmin1@ds151232.mlab.com:51232/my-shelf'
    }
};

module.exports = config;