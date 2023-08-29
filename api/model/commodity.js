import mongoose from 'mongoose'

const commoditySchema = new mongoose.Schema( {
  name: String,
  sales: { type: Number, default: 0 },
  price: Number,
  image: String,
  status: { type: String, default: 'on' },
  category_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true } )

export default mongoose.model( 'Commodity', commoditySchema )
