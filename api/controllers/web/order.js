import Order from '../../model/order.js'
import OrderCommodity from '../../model/orderCommodity.js'

const fetchAllOrders = async ( req, res ) => {
  try {
    const orders = await Order.find().sort( { createdAy: -1 } )
    res.status( 200 ).json( { success: true, data: orders } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteOrder = async ( req, res ) => {
  try {
    const { id } = req.params
    await OrderCommodity.findOneAndDelete( { order_id: id } )
    await Order.findByIdAndDelete( id )
    res.status( 200 ).json( { success: true, msg: 'Order deleted successfully'} )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteOrders = async ( req, res ) => {
  try {
    const { idList } = req.query
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Order.findByIdAndDelete( idList[i] )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: `${ len } orders removed` } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAllOrders,
  deleteOrder,
  deleteOrders
}
