const posts = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const ipost = await posts.find({});

  res.render('index.ejs', {
    ipost,
  });

  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));  //dosyadaki index sayfasının çalışmasını sağlar

  // res.send(blog) //burdaki res.send middleware in atmamlandığını belirtiyor. eğer sen bunu silip ilk mw yi çalıştırırsan sıra buna geldiğinde cycle tıkanmış olur
};

exports.getOnePost = async (req, res) => {
  const post = await posts.findById(req.params.id);
  res.render('post.ejs', {
    post,
  });
};

exports.updatePost = async (req, res) => {
  const post = await posts.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.description = req.body.description;

  post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.addPost = async (req, res) => {
  await posts.create(req.body); // bu create olana kadar bekletir await ile. async

  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  await posts.findByIdAndRemove(req.params.id);

  res.redirect('/');
};
