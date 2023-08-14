import Shop from '../../model/shop.js'

const addShop = async ( req, res ) => {
  try {
    const { name, location, image } = req.body
    const newShop = await Shop.create( { name, location, image } )
    res.status( 200 ).json( { success: true, data: newShop } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  addShop
}
