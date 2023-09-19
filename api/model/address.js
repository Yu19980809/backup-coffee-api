import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  location: String,
  name: String,
  tel: Number,
  user_id: mongoose.Schema.Types.ObjectId,
  is_default: { type: String, default: 'no' }
}, { timestamps: true })

export default mongoose.model( 'Address', addressSchema )