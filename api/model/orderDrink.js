import mongoose from 'mongoose'

const orderDrinkSchema = new mongoose.Schema({
  drink_id: mongoose.Schema.Types.ObjectId,
  order_id: mongoose.Schema.Types.ObjectId,
  count: Number,
  price: Number,
  temperature: { type: String, default: '正常冰' },
  sugar: { type: String, default: '不另外加糖' },
  addon: { type: Array, default: [] }
}, { timestamps: true })

export default mongoose.model( 'OrderDrink', orderDrinkSchema )