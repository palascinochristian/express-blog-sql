const connection = require("../data/db");

//index

const index = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM posts";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Posts not found" });
    res.json(results);
  });
};

//show
function show(req, res) {
  const sql = `SELECT * FROM posts WHERE id = ?`;
  const id = req.params.id;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    if (results.length === 0) {
      return res.status(404).json({
        error: "Post not found",
        message: "Post non trovato",
      });
    }

    res.json(results[0]);
  });
}

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
function destroy(req, res) {
  const sql = `DELETE FROM posts WHERE id = ?`;
  const id = req.params.id;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
