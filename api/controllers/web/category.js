import Category from '../../model/category.js'

const addCategory = async ( req, res ) => {
  try {
    const { name } = req.body
    const existedCategory = await Category.find( { name } )
    if ( existedCategory.length !== 0 ) {
      res.status( 200 ).json( { success: false, msg: 'This category already exists' } )
      return false
    }

    const newCategory = await Category.create( { name } )
    res.status( 200 ).json( { success: true, data: newCategory } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchAllCategories = async ( req, res ) => {
  try {
    const categories = await Category.find().sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: categories } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteSingleCategory = async ( req, res ) => {
  try {
    const { id } = req.params
    await Category.findByIdAndDelete( id )
    res.status( 200 ).json( { success: true, msg: 'deleted successfully' } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteCategories = async ( req, res ) => {
  try {
    const { idList } = req.query
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Category.findByIdAndDelete( idList[i] )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: `${ len } category removed` } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  addCategory,
  fetchAllCategories,
  deleteSingleCategory,
  deleteCategories
}
