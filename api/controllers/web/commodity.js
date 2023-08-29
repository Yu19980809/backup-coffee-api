import Commodity from '../../model/commodity.js'
import Category from '../../model/category.js'

const fetchAllCommodities = async ( req, res ) => {
  try {
    const commodities = await Commodity.find().sort( { createdAt: -1 } )
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
        category: category.name
      }
      newCommodities.push( newCommodity )

      if ( i === len - 1 ) resolve( newCommodities )
    }
  }

  handle()
} )

const addCommodity = async ( req, res ) => {
  try {
    const { name, price, image, category_id } = req.body
    const newCommodity = await Commodity.create( { name, price, image, category_id } )
    res.status( 200 ).json( { success: true, data: newCommodity } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const setCommodityOn = async ( req, res ) => {
  try {
    const { id } = req.params
    const newCommodity = await Commodity.findByIdAndUpdate( id, { status: 'on' }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCommodity } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const setCommodityOff = async ( req, res ) => {
  try {
    const { id } = req.params
    const newCommodity = await Commodity.findByIdAndUpdate( id, { status: 'off' }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCommodity } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const offCommodities = async ( req, res ) => {
  try {
    const { idList } = req.body
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Commodity.findByIdAndUpdate( idList[i], { status: 'off' } )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: 'off commodities successfully' } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const modifyCommoditiesCategory = async ( req, res ) => {
  try {
    const { idList, category } = req.body
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Commodity.findByIdAndUpdate( idList[i], { category_id: category._id } )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: 'modify commodities category successfully' } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const editCommodity = async ( req, res ) => {
  try {
    const { id, name, price, image, category_id } = req.body
    const newCommodity = await Commodity.findByIdAndUpdate( id, { name, price, image, category_id }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCommodity } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteCommodity = async ( req, res ) => {
  try {
    const { id } = req.params
    await Commodity.findByIdAndDelete( id )
    res.status( 200 ).json( { success: true, msg: 'Commodity deleted successfully'} )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAllCommodities,
  addCommodity,
  setCommodityOn,
  setCommodityOff,
  offCommodities,
  modifyCommoditiesCategory,
  editCommodity,
  deleteCommodity
}
