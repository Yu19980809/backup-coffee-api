import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import shopRoutes from './api/routes/shop.js'
import categoryRoutes from './api/routes/category.js'
import memberRoutes from './api/routes/member.js'
import userRoutes from './api/routes/user.js'
import groupRoutes from './api/routes/group.js'
import userGroupRoutes from './api/routes/userGroup.js'

// config
dotenv.config()

// init app
const app = express()

// middleware
app.use( bodyParser.json( { limit: '30mb', extended: true } ) )
app.use( bodyParser.urlencoded( { limit: '30mb', extended: true } ) )
app.use( cors() )

// routes
app.use( '/api/v1/shop', shopRoutes )
app.use( '/api/v1/category', categoryRoutes )
app.use( '/api/v1/member', memberRoutes )
app.use( '/api/v1/user', userRoutes )
app.use( '/api/v1/group', groupRoutes )
app.use( '/api/v1/user_group', userGroupRoutes )

// mongodb
mongoose.set( 'strictQuery', true )
mongoose.connect( 'mongodb://127.0.0.1:27017/guangxin' )
  .then( () => {
    console.log( 'Connected to mongodb' )
    app.listen( 4000, () => console.log( 'Server running on port 4000' ) )
   } )
  .catch( error => console.log( error ) )
