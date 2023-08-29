import Coupon from '../../model/coupon.js'

const fetchCoupons = async ( req, res ) => {
  try {
    const coupons = await Coupon.find().sort( { createdAt: -1 } )
    res.status( 200 ).json( { success: true, data: coupons } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const onCoupon = async ( req, res ) => {
  try {
    const { id } = req.params
    const newCoupon = await Coupon.findByIdAndUpdate( id, { status: 'on' }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCoupon } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const offSingleCoupon = async ( req, res ) => {
  try {
    const { id } = req.params
    const newCoupon = await Coupon.findByIdAndUpdate( id, { status: 'off' }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCoupon } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const offCoupons = async ( req, res ) => {
  try {
    const { idList } = req.body
    const len = idList.length

    for ( let i = 0; i < len; i++ ) {
      await Coupon.findByIdAndUpdate( idList[i], { status: 'off' } )

      if ( i === len - 1 ) res.status( 200 ).json( { success: true, msg: 'off coupons successfully' } )
    }
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const addCoupon = async ( req, res ) => {
  try {
    const { name, value, start_date, end_date } = req.body
    const newCoupon = await Coupon.create( { name, value, start_date, end_date } )
    res.status( 200 ).json( { success: true, data: newCoupon } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const editCoupon = async ( req, res ) => {
  try {
    const { id, name, value, start_date, end_date } = req.body
    const newCoupon = await Coupon.findByIdAndUpdate( id, { name, value, start_date, end_date }, { new: true } )
    res.status( 200 ).json( { success: true, data: newCoupon } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

const deleteCoupon = async ( req, res ) => {
  try {
    const { id } = req.params
    await Coupon.findByIdAndDelete( id )
    res.status( 200 ).json( { success: true, msg: 'coupon deleted successfully' } )
  } catch (error) {
    res.status( 500 ).send( error )
  }
}

export {
  fetchCoupons,
  onCoupon,
  offSingleCoupon,
  offCoupons,
  addCoupon,
  editCoupon,
  deleteCoupon
}
