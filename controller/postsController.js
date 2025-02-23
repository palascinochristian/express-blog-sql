//index

const index = (req, res) => {
  let postFiltered = postsData;
  const { tags } = req.query;
  if (tags) {
    postFiltered = postFiltered.filter((post) => post.tags.includes(tags));
  }

  //throw new Error("C'è stato un errore nel server!"); test error 500

  res.json(postFiltered);
};

//show
const show = (req, res) => {
  const post = postsData.find((post) => post.id == req.params.id);
  if (!post) {
    return res.status(404).json({
      error: "Post not found",
      message: "Post non trovato",
    });
  }
  res.json(post);
};

//store
const store = (req, res) => {
  const id = Date.now();

  const newPost = {
    id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  console.log(req.body);
  postsData.push(newPost);

  res.status(201).json(newPost);
};

//update
const update = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);

  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
};

//modify
const modify = (req, res) => {
  let post = postsData.find((elm) => elm.id == req.params.id);

  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.content) {
    post.content = req.body.content;
  }
  if (req.body.image) {
    post.image = req.body.image;
  }
  if (req.body.tags) {
    post.tags = req.body.tags;
  }

  res.json(post);
};

//destroy
const destroy = (req, res) => {
  const post = postsData.find((post) => post.id == req.params.id);
  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }
  postsData.splice(postsData.indexOf(post), 1);
  res.sendStatus(204);
};
module.exports = { index, show, store, update, modify, destroy };
