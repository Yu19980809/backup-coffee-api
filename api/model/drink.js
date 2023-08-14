import mongoose from 'mongoose'

const drinkSchema = new mongoose.Schema( {
  name: String,
  sales: Number,
  price: Number,
  image: String,
  status: { type: String, default: 'on' },
  category_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true } )

export default mongoose.model( 'Drink', drinkSchema )
