import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Member from '../../model/member.js'

dotenv.config()

const loginWeb = async ( req, res ) => {
  try {
    const { tel, password } = req.body
    const existingUser = await Member.findOne( { tel } )
    if ( !existingUser ) res.status( 400 ).json( { message: "User doesn't exist." } )

    const isPasswordCorrect = bcrypt.compare( password, existingUser.password )
    if ( !isPasswordCorrect ) res.status( 400 ).json( { message: 'Wrong password.' } )

    const token = jwt.sign( { email: existingUser.tel, id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: '2h' } )
    res.status( 200 ).json( { user: existingUser, token } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  loginWeb
}
