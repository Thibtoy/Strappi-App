module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        user: "root",
        password: "root",
        database: "StrapiTest",
        host: "localhost"
      },
      options: {    
      },
    },
  },
});
