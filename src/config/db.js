const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is missing. Copy server/.env.example to server/.env first.');
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    const { host, name } = mongoose.connection;
    console.log(`  database   : connected to "${name}" on ${host}`);
  } catch (err) {
    console.error('\n  Could not reach MongoDB.');
    console.error(`  Tried: ${uri}`);
    console.error('  Start a local mongod, or point MONGODB_URI at an Atlas cluster.\n');
    throw err;
  }
}

module.exports = { connectDatabase };
