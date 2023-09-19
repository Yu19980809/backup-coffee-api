import User from '../../model/user.js'

const updateUserInfo = async ( req, res ) => {
  try {
    const { avatar, name, tel } = req.body
    const newUser = await User.findByIdAndUpdate( req.userId, { avatar, name, tel }, { new: true } )
    res.status( 200 ).json( { success: true, data: newUser } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  updateUserInfo
}
