import mongoose, { Schema } from "mongoose";

class Post extends Schema {
  constructor() {
    super({
      user: { type: Schema.Types.ObjectId, ref: "user" },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          }
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    });
  }
}

export default mongoose.model("Post", new Post());
