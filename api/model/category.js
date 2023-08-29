import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema( {
  name: String,
  commodity_count: { type: Number, default: 0 },
  status: { type: String, defult: 'on' }
}, { timestamps: true } )

export default mongoose.model( 'Category', categorySchema )
