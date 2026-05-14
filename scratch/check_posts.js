
const mongoose = require('mongoose');

const MONGODB_URL = "mongodb://bacgiangeco3:pjW8kCWRq0C04S66@ac-bydkksh-shard-00-00.omawfz2.mongodb.net:27017,ac-bydkksh-shard-00-01.omawfz2.mongodb.net:27017,ac-bydkksh-shard-00-02.omawfz2.mongodb.net:27017/tantruonggiang_db?ssl=true&replicaSet=atlas-a3ct9q-shard-0&authSource=admin&retryWrites=true&w=majority";

async function checkPosts() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URL);
    console.log('Connected!');
    
    // Define simple schema
    const Post = mongoose.models.Post || mongoose.model('Post', new mongoose.Schema({
      slug: String,
      title: String,
      isDraft: Boolean,
      deletedAt: Date
    }, { collection: 'posts' }));
    
    const posts = await Post.find({});
    console.log('Found', posts.length, 'posts in total.');
    posts.slice(0, 10).forEach(p => {
      console.log(`- Slug: "${p.slug}", Title: "${p.title}", isDraft: ${p.isDraft}, deletedAt: ${p.deletedAt}`);
    });
    
    if (posts.length > 10) console.log('... and more');
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkPosts();
