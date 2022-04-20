
import mongoose from 'mongoose'


const refreshSchema = new mongoose.Schema({
    refresh: String,
    expire : Date,
    username : String
  });

  export default mongoose.model('RefreshTokenStore', refreshSchema)