//Post model
import Post from "../models/Post.model";

let post = {};

post.create = (req, res) => {
  const post = req.body;
  post.user = req.user.id;
  const newPost = new Post(post);

  newPost
    .save()
    .then(post => res.status(201).json(post))
    .catch(err => res.status(400).json(err));
};

export default post;
