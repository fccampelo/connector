import mongoose from 'mongoose';

class User extends mongoose.Schema {

  constructor() {
    super({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String },
      date: { type: Date, default: Date.now }
    })
  }

}

export default mongoose.model('User', new User);
