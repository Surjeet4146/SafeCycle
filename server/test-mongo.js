const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ysurjeet148:Surjeet654321@GoogleMaps.yzu4py2.mongodb.net/safecycle?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("safecycle").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);