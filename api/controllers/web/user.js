import User from '../../model/user.js'
import UserGroup from '../../model/userGroup.js'
import Group from '../../model/group.js'

const addUser = async ( req, res ) => {
  try {
    const { open_id, name, tel, avatar, money, vip } = req.body
    const newUser = await User.create( { open_id, name, tel, avatar, money, vip } )
    res.status( 200 ).json( { success: true, data: newUser } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchAllUsers = async ( req, res ) => {
  try {
    let users = await User.find().sort( { createdAt: -1 } )
    users = await fetchUserGroup( users )
    users = await fetchGroups( users )

    res.status( 200 ).json( { success: true, data: users } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const fetchUserGroup = users => new Promise( ( resolve, reject ) => {
  const len = users.length
  let newUsers = []

  const fetchData = async () => {
    for ( let i = 0; i < len ; i++ ) {
      const user = users[i]
      const userGroups = await UserGroup.find( { user_id: user._id } )
      const newUser = {
        _id: user._id,
        name: user.name,
        tel: user.tel,
        money: user.money,
        vip: user.vip,
        vip_end_date: user.vip_end_date,
        avatar: user.avatar,
        userGroups
      }
      newUsers.push( newUser )

      if ( i === len - 1 ) resolve( newUsers )
    }
  }

  fetchData()
} )

const fetchGroups = users => new Promise( ( resolve, reject ) => {
  const len = users.length
  let newUsers = []

  const fetchData = async () => {
    for ( let i = 0; i < len ; i++ ) {
      const user = users[i]
      const userGroups = user.userGroups
      const groupsLen = userGroups.length
      let groups = []

      for ( let j = 0; j < groupsLen; j++ ) {
        const userGroup = userGroups[j]
        const group = await Group.findById( userGroup.group_id )
        if ( group ) groups.push( group.name )
      }

      const newUser = {
        _id: user._id,
        name: user.name,
        tel: user.tel,
        money: user.money,
        vip: user.vip,
        vip_end_date: user.vip_end_date,
        avatar: user.avatar,
        groups
      }

      newUsers.push( newUser )

      if ( i === len - 1 ) resolve( newUsers )
    }
  }

  fetchData()
} )

const giveVip = async ( req, res ) => {
  try {
    const { idList, startDate, endDate } = req.body
    const len = idList.length
    let updatedUsers = []

    for ( let i = 0; i < len; i++ ) {
      const user = await User.findByIdAndUpdate( idList[i], { vip: 'yes', vip_start_date: startDate, vip_end_date: endDate }, { new: true } )
      updatedUsers.push( user )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, data: updatedUsers } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  addUser,
  fetchAllUsers,
  giveVip,
}
