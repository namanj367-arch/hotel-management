const Booking = require("../models/Booking")
const Hotel = require("../models/Hotel")

class Bookingcontroller {
    static createbooking = async (req, res) => {
        try {
            const { hotelId, checkIn, checkOut, guests, rooms } = req.body
            if (!hotelId || !checkIn || !checkOut || !guests || !rooms) {
                return res.status(400).json({
                    success: false,
                    message: "all fields are required"
                })
            }
            //console.log(req.user.id)

            const hotel = await Hotel.findById(hotelId)
            if (!hotel) {
                return res.status(400).json({
                    success: false,
                    message: "hotel not found"
                })
            }
            if (rooms > hotel.availableRooms) {
                return res.status(400).json({
                    success: false,
                    message: "sorry, not enough rooms avialble"
                })
            }

            const checkin = new Date(checkIn)
            const checkout = new Date(checkOut)

            if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "invalid date"
                })
            }

            if (checkout <= checkin) {
                return res.status(400).json({
                    success: false,
                    message: "check out date must be after check in"
                })
            }

            const numberOfDays = (checkout - checkin) / (1000 * 60 * 60 * 24);
            const totalPrice = hotel.price * rooms * numberOfDays;

            const booking = await Booking.create({
                user: req.user.id,
                hotel: hotelId,
                checkIn: checkin,
                checkOut: checkout,
                rooms,
                guests,
                totalPrice
            })
            hotel.availableRooms -= rooms
            await hotel.save()

            res.status(201).json({
                success: true,
                message: "Booking created successfully", booking
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    static getMyBooking=async(req,res)=>{
        try{
            const booking = await Booking.find({
                user:req.user.id
            })
            .populate("hotel")
            .populate("user")

            if(!booking||booking.length===0){
                return res.status(404).json({
                    success:false,
                    message:"booking does not exist"
                })
            }

            res.status(200).json({
                success:true,
                message:"your booking is", booking
            })
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }    //ek user ke kitni bookings hai

    static getSingleBooking=async(req,res)=>{
        try{
            const {id}=req.params
            const booking = await Booking.findOne({
                _id:id,
                user:req.user.id
            }).populate("hotel")
            if(!booking){
                return res.status(404).json({
                    success:false,
                    message:"booking does not exist"
                })
            }

            res.status(200).json({
                success:true,
                message:"booking found"
            })
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }   // to get one particular booking

    static getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("hotel")
            .populate("user", "name email phone")

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            })
        }

        res.status(200).json({
            success: true,
            message: "All bookings fetched successfully",
            bookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    }   //only admin can get all the bookings

    static cancelbooking = async(req,res)=>{
        try{
            const {id}=req.params

            const booking = await Booking.findOne({
                _id:id,
                user:req.user.id
            })
            if(!booking){
                return res.status(404).json({
                    success:false,
                    message:"booking does not exist"
                })
            }
            if(booking.bookingStatus==="cancelled"){
                return res.status(400).json({
                    success:false,
                    message:"booking is already cancelled"
                })
            }

            const hotel=await Hotel.findById(booking.hotel)
            booking.bookingStatus="cancelled"
            await booking.save()

            if(hotel){
                hotel.availableRooms += booking.rooms
                await hotel.save()
            }

             res.status(200).json({
                success: true,
                message: "Booking cancelled successfully",
                booking
            })

        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}


module.exports = Bookingcontroller