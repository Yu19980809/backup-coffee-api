import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  location: String,
  tag: String,
  name: String,
  tel: Number,
  default: { type: String, default: 'no' }
}, { timestamps: true })

export default mongoose.model( 'Address', addressSchema )