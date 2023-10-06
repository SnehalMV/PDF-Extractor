import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true  
});



const UserModel = mongoose.model('User', userSchema);

export default UserModel;