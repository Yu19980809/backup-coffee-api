import mongoose from 'mongoose'

const userAddressSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  address_id: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

export default mongoose.model( 'UserAddress', userAddressSchema )