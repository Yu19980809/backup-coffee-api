import Group from '../../model/group.js'

const addGroup = async ( req, res ) => {
  try {
    const { groupName } = req.body
    const newGroup = await Group.create( { name: groupName } )
    res.status( 200 ).json( { success: true, data: newGroup } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchAllGroups = async ( req, res ) => {
  try {
    const groups = await Group.find().sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: groups } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const countGroup = ( count, group_id ) => new Promise( ( resolve, reject ) => {
  const handle = async () => {
    const group = await Group.findById( group_id )
    group.user_count += count
    const newGroup = await Group.findByIdAndUpdate( group_id, group, { new: true } )
    resolve( newGroup )
  }

  handle()
} )

const modifyGroup = async ( req, res ) => {
  try {
    const { groupId, newName } = req.body
    const updatedGroup = await Group.findByIdAndUpdate( groupId, { name: newName }, { new: true } )
    res.status( 200 ).json( { success: true, data: updatedGroup } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  addGroup,
  fetchAllGroups,
  countGroup,
  modifyGroup,
}
