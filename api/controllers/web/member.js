import mongoose from 'mongoose'
import Member from '../../model/member.js'

const fetchAllMembers = async ( req, res ) => {
  try {
    const members = await Member.find().sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: members } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const addMember = async ( req, res ) => {
  try {
    const { name, tel, address, password, role, shopId } = req.body
    const newMember = await Member.create( { name, tel, address, password, role, shop_id: mongoose.Types.ObjectId( shopId ) } )
    res.status( 200 ).json( { success: true, data: newMember } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const modifiyMembersRole = async ( req, res ) => {
  try {
    const { idList, role } = req.body
    const len = idList.length
    let updatedMembers = []

    for ( let i = 0; i < len; i++ ) {
      const updatedMember = await Member.findByIdAndUpdate( mongoose.Types.ObjectId( idList[i] ), { role }, { new: true } )
      updatedMembers.push( updatedMember )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, data: updatedMembers } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteMembers = async ( req, res ) => {
  try {
    const { idList } = req.query
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Member.findByIdAndDelete( mongoose.Types.ObjectId( idList[i] ))

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: `${ len } member${ len > 1 ? 's' : '' } removed` } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchAllMembers,
  addMember,
  modifiyMembersRole,
  deleteMembers
}
