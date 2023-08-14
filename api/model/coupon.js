import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema( {
  name: String,
  type: Number,
  value: Number,
  start_date: Date,
  end_date: Date,
  status: { type: String, default: 'on' }
}, { timestamps: true } )

export default mongoose.model( 'Coupon', couponSchema )
