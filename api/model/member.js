import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
  name: String,
  tel: String,
  address: String,
  password: String,
  role: String,
  shop_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

export default mongoose.model( 'Member', memberSchema )
