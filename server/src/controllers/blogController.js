const Blog = require('../models/Blog');

async function listPosts(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const posts = await Blog.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(limit);
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { listPosts };


