import Address from '../../model/address.js'

const fetchAddressListWeapp = async ( req, res ) => {
  try {
    const addressList = await Address.find( { user_id: req.userId } ).sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: addressList } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const addAddressWeapp = async ( req, res ) => {
  try {
    const { name, tel, address, door, isDefault } = req.body
    const newAddress = await Address.create( { name, tel, location: address + door, is_default: isDefault ? 'yes' : 'no', user_id: req.userId } )
    res.status( 200 ).json( { success: true, data: newAddress } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAddressListWeapp,
  addAddressWeapp
}
