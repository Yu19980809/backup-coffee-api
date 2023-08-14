import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  count: Number,
  price: Number,
  shop_id: mongoose.Schema.Types.ObjectId,
  address: String,
  type: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
  user_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

export default mongoose.model( 'Order', orderSchema )