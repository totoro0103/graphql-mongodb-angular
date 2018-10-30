const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema.js');

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'example.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}

const environment = process.env.NODE_ENV || 'development'
const config = configurations[environment]

const apollo = new ApolloServer({
  typeDefs, resolvers, context: {
    me: {
      id: '1',
      username: 'Robin Wieruchcontext',
    },
  },
});

const app = express();
app.use(cors());
apollo.applyMiddleware({ app });

// Create the HTTPS or HTTP server, per configuration
let server
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  // server = https.createServer(
  //   {
  //     key: fs.readFileSync(`./ssl/${environment}/server.key`),
  //     cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
  //   },
  //   app
  // )
} else {
  server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
)