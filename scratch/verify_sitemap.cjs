const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function verifySitemapPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Explicitly set collection names to match models
    const Page = mongoose.connection.db.collection('pages');
    const SiteContent = mongoose.connection.db.collection('site_contents');

    console.log('\n--- Verifying Dynamic Pages (Page Collection) ---');
    const dynamicSlugs = ['about', 'contact', 'gallery', 'reviews', 'faq', 'privacy', 'terms'];
    for (const slug of dynamicSlugs) {
      const page = await Page.findOne({ slug, isTrashed: false });
      console.log(`${slug}: ${page ? 'FOUND' : 'NOT FOUND'} (Title: ${page?.title || 'N/A'})`);
    }

    console.log('\n--- Verifying Services (SiteContent Collection) ---');
    const content = await SiteContent.findOne({ key: 'complete_data' });
    if (content?.data?.services) {
      const sData = content.data.services;
      const services = Array.isArray(sData) ? sData : (sData.services || []);
      
      const serviceSlugsInXml = [
        'residential-roofing', 'windows-doors', 'custom-decks', 
        'siding-soffit-fascia', 'commercial-roofing', 'gutters-protection'
      ];
      
      for (const slug of serviceSlugsInXml) {
        const found = services.find(s => s.slug === slug);
        console.log(`${slug}: ${found ? 'FOUND' : 'NOT FOUND'}`);
      }
    } else {
      console.log('Could not find services in complete_data');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Verification error:', err);
  }
}

verifySitemapPages();
