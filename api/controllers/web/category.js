import Category from '../../model/category.js'

const addCategory = async ( req, res ) => {
  try {
    const { name } = req.body
    const newCategory = await Category.create( { name } )
    res.status( 200 ).json( { success: true, data: newCategory } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  addCategory
}
