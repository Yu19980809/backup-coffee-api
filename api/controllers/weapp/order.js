import Order from '../../model/order.js'

const generateOrderWeapp = async ( req, res ) => {
  try {
    const { count, price, address, type, status, shop_id} = req.body
    const newOrder = await Order.create( { count, price, address, type, status, shop_id, user_id: req.userId } )
    res.status( 200 ).json( { success: true, data: newOrder } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  generateOrderWeapp,
}
