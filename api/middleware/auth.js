import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async ( req, res, next ) => {
  try {
    const token = req.headers.authorization.split( ' ' )[1];
    const isCustomAuth = token.length < 500;
    const decodeData = jwt.verify( token, process.env.TOKEN_SECRET );
    
    if ( token && isCustomAuth && decodeData ) {
      req.userId = decodeData.id;
      console.log( 'userId', decodeData.id )
      next();
    }

  } catch (error) {
    console.log( error );
  }
};

export default auth;