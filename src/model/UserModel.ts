
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: String,
    username : String,
    password : String,
    passwordSalt : String
  });

  export default mongoose.model('User', userSchema)