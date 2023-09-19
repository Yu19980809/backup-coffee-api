import OrderCommodity from '../../model/orderCommodity.js'
import Order from '../../model/order.js'
import Commodity from '../../model/commodity.js'
import Shop from '../../model/shop.js'

const generateOrderCommoditiesWeapp = async ( req, res ) => {
  try {
    const { commodities, orderId } = req.body
    const len = commodities.length
    for ( let i = 0; i < len; i++ ) {
      const { _id, count, price, temperature, sugar,addon } = commodities[i]
      await OrderCommodity.create( { count, price, temperature, sugar,addon, commodity_id: _id, order_id: orderId } )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: 'ok' } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchOrderCommoditiesWeapp = async ( req, res ) => {
  try {
    const orders = await Order.find( { user_id: req.userId } ).sort( { createdAt: -1 } )
    const len = orders.length
    const newOrders = []

    for ( let i = 0; i < len; i++ ) {
      const order = orders[i]
      const shop = await Shop.findById( order.shop_id )
      const orderCommodities = await OrderCommodity.find( { order_id: order._id } )
      const commodities = await fetchCommodities( orderCommodities )

      const obj = {
        _id: order._id,
        count: order.count,
        price: order.price,
        address: order.address,
        type: order.type,
        status: order.status,
        shop,
        drinks: commodities,
        createdAt: order.createdAt
      }
      newOrders.push( obj )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, data: newOrders } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchCommodities = orderCommodities => new Promise( ( resolve, reject ) => {
  const len = orderCommodities.length
  let commodities = []

  const handleFetch = async () => {
    for ( let i = 0; i < len; i++ ) {
      const orderCommodity = orderCommodities[i]
      const commodity = await Commodity.findById( orderCommodity.commodity_id )

      const obj = {
        _id: commodity._id,
        name: commodity.name,
        image: commodity.image,
        count: orderCommodity.count,
        price: orderCommodity.price,
        temperature: orderCommodity.temperature,
        sugar: orderCommodity.sugar,
        addon: orderCommodity.addon
      }
      commodities.push( obj )

      if ( i === len - 1 ) resolve( commodities )
    }
  }

  handleFetch()
} )

export {
  generateOrderCommoditiesWeapp,
  fetchOrderCommoditiesWeapp
}
