import Category from '../../model/category.js'

const fetchAllCategoriesWeapp = async ( req, res ) => {
  try {
    const categories = await Category.find()
    res.status( 200 ).json( { success: true, data: categories } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAllCategoriesWeapp
}
