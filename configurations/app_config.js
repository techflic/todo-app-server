
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
process.env.PORT = process.env.PORT || 3001;

/* Move to secrets*/
const dbuser = `-server-admin`;
const dbpassword = `admin1`;

let config = {
    server: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT
    },
    database: {
        connect_uri: `mongodb://${dbuser}:${dbpassword}@ds151232.mlab.com:51232/my-shelf`
    }
};

module.exports = config;
