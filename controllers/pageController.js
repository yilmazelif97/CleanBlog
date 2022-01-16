const posts = require('../models/Post');

exports.aboutPage = (req, res) => {
  res.render('about.ejs');
};

exports.addpostPage = (req, res) => {
  res.render('add_post.ejs');
};

exports.editPage = async (req, res) => {
  const post = await posts.findOne({ _id: req.params.id });
  res.render('edit.ejs', {
    post,
  });
};
