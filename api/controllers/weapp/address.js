import Address from '../../model/address.js'

const fetchAddressListWeapp = async ( req, res ) => {
  try {
    const addressList = await Address.find().sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: addressList } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAddressListWeapp
}
