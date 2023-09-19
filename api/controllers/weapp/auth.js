import dotenv from 'dotenv'
import request from 'request'
import jwt from 'jsonwebtoken'
import User from '../../model/user.js'

dotenv.config()

const loginWeapp = async ( req, res ) => {
  const { code } = req.body
  const openId = await fetchWxOpenId( code )
  
  try {
    const user = await User.find( { open_id: openId } )
    if ( !user.length ) {
      createUser( openId, res )
    } else {
      const token = generateToken( user[0] )
      res.status( 200 ).json( { success: true, isNew: false, user: user[0], token } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchWxOpenId = code => {
  return new Promise( ( resolve, reject ) => {
    const appId = process.env.APP_ID
    const appSecret = process.env.APP_SECRET
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${ appId }&secret=${ appSecret }&js_code=${ code }&grant_type=authorization_code`

    request( url, ( error, response, body ) => resolve( JSON.parse( body )['openid'] ) )
  } )
}

const createUser = async ( openId, res ) => {
  try {
    const user = await User.create( { openId } )
    const token = generateToken( user )
    res.status( 200 ).json( { success: true, isNew: true, user, token } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const generateToken = user => {
  const token = jwt.sign( { openId: user.open_id, id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '4h' } )
  return token
}

export { loginWeapp }