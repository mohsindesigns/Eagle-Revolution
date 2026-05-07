const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function inspectCollections() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check 'contents' collection
    const Content = mongoose.connection.db.collection('contents');
    const allKeys = await Content.find({}).project({ key: 1 }).toArray();
    console.log('Keys in contents:', allKeys.map(k => k.key));
    
    // Check 'complete_data' specifically
    const completeData = await Content.findOne({ key: 'complete_data' });
    if (completeData) {
      console.log('Found complete_data. Keys in data:', Object.keys(completeData.data || {}));
    } else {
      console.log('complete_data NOT FOUND in contents');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

inspectCollections();
