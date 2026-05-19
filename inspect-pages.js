import mongoose from 'mongoose';
import connectToDatabase from './src/lib/mongodb.js';
import Page from './src/models/Page.js';

async function main() {
  await connectToDatabase();
  console.log("Connected to MongoDB.");
  
  const pages = await Page.find({ template: 'service-area' }).lean();
  console.log("Found service-area pages:", pages.length);
  for (const page of pages) {
    console.log(`Page: ${page.title} (Slug: ${page.slug})`);
    console.log("Content:", JSON.stringify(page.content, null, 2));
  }
  
  mongoose.connection.close();
}

main().catch(console.error);
