import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema( {
  name: String,
  location: String,
  image: String,
}, { timestamps: true } )

export default mongoose.model( 'Shop', shopSchema )
