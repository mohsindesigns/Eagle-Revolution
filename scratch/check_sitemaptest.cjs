const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function checkSitemapTestPage() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Page = mongoose.connection.db.collection('pages');
    const page = await Page.findOne({ slug: 'sitemaptest' });
    
    console.log('Full Page Doc:', JSON.stringify(page, null, 2));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkSitemapTestPage();
