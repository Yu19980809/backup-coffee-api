import Commodity from '../../model/commodity.js'
import Category from '../../model/category.js'

const fetchAllCommoditiesWeapp = async ( req, res ) => {
  try {
    const commodities = await Commodity.find()
    const newCommodities = await fetchCategory( commodities )
    res.status( 200 ).json( { success: true, data: newCommodities } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchCategory = commodities => new Promise( ( resolve, reject ) => {
  const handle = async () => {
    const len = commodities.length
    const newCommodities = []

    for ( let i = 0; i < len; i++ ) {
      const commodity = commodities[i]
      const category = await Category.findById( commodity.category_id )
      const newCommodity = {
        _id: commodity._id,
        name: commodity.name,
        sales: commodity.sales,
        price: commodity.price,
        status: commodity.status,
        image: commodity.image,
        category
      }
      newCommodities.push( newCommodity )

      if ( i === len - 1 ) resolve( newCommodities )
    }
  }

  handle()
} )

export {
  fetchAllCommoditiesWeapp
}
