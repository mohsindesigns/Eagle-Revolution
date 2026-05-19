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
    console.log("Connected successfully to server");
    const db = client.db('eagle_revolution');
    const pagesCollection = db.collection('pages');
    
    const pages = await pagesCollection.find({ template: 'service-area' }).toArray();
    console.log("Found service-area pages:", pages.length);
    for (const page of pages) {
      console.log(`\n==========================================`);
      console.log(`Page Title: ${page.title} (Slug: ${page.slug})`);
      console.log(`Content structure keys:`, Object.keys(page.content || {}));
      if (page.content) {
        console.log(`- Hero:`, page.content.hero);
        console.log(`- Process steps:`, page.content.process ? `${page.content.process.length} steps` : 'None');
        console.log(`- Page FAQs (content.faqs):`, page.content.faqs ? `${page.content.faqs.length} FAQs` : 'None');
      }
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error);
