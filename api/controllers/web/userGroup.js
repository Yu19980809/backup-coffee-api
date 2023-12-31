import UserGroup from '../../model/userGroup.js'
import { countGroup } from './group.js'

const addUserGroup = async ( req, res ) => {
  try {
    const { idList, group } = req.body
    const len = idList.length
    let userGroups = []

    await countGroup( len, group )

    for ( let i = 0; i < len; i++ ) {
      const userGroup = await UserGroup.create( { user_id: idList[i], group_id: group } )
      userGroups.push( userGroup )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, data: userGroups } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteUserGroup = groups => new Promise( ( resolve, reject ) => {
  const handle = async () => {
    const len = groups.length
    for ( let i = 0; i < len; i++ ) {
      await UserGroup.deleteMany( { group_id: groups[i] } )

      if ( i === len - 1 ) resolve()
    }
  }

  handle()
} )

export {
  addUserGroup,
  deleteUserGroup
}
