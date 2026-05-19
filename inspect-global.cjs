const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Read MONGODB_URI from .env.local
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const mongoUriLine = envFile.split('\n').find(line => line.startsWith('MONGODB_URI='));
const uri = mongoUriLine.split('MONGODB_URI=')[1].trim();

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('eagle_revolution');
    const contentColl = db.collection('site_contents');
    
    const content = await contentColl.findOne({ key: 'complete_data' });
    if (content && content.data) {
      console.log("Global keys:", Object.keys(content.data));
      console.log("Global hero:", content.data.hero);
    } else {
      console.log("No complete_data found");
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error);
