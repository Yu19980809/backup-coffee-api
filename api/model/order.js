import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  count: Number,
  price: Number,
  shop_id: mongoose.Schema.Types.ObjectId,
  address: String,
  type: { type: String, default: '自提' },
  status: { type: String, default: '制作中' },
  user_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

export default mongoose.model( 'Order', orderSchema )