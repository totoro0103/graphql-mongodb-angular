export default {
    //MongoDB configuration
    development: {
        db: 'mongodb://127.0.0.1/graphql',
        app: {
            name: 'graphql'
        }
    },
    production: {
        db: 'mongodb://<taskname>:<password>@ds157325.mlab.com:57325/graphql-api',
        app: {
            name: 'graphql'
        }
    }
};