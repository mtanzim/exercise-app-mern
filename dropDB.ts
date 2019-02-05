require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = process.env.MONGO_URI_LOC;
const client = new MongoClient(url, {
  useNewUrlParser: true
});

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  // console.log("Connected successfully to server: " + url);
  const dbAdmin = client.db("admin");
  // let dbList = [];
  dbAdmin
    .admin()
    .listDatabases()
    .then (res => {
      return res.databases
        .map( a=> a.name)
        .filter(a => a.includes(process.env.MONGO_DB_NAME) );
    })
    .then (dbList => {
      return Promise.all(dbList.map(dbName => {
        let db = client.db(dbName);
        return db.dropDatabase()
          .then (() => console.log(`${dbName} was dropped`))
          .catch(err=> console.log(err));
      }));
    })
    .then (() => client.close())
    .catch(err =>{
      console.log(err);
      client.close();
    });
});