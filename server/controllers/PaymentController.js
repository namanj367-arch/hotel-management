const Razorpay = require("../config/razorpay")
const Booking = require("../models/Booking")

class PaymentController {
    static createOrder = async (req, res) => {
        try {
            const { bookingId } = req.body
            if (!bookingId) {
                return res.status(400).json({
                    success: false,
                    message: "booking Id is required"
                })
            }
            const booking = await Booking.findOne({
                _id: bookingId, user: req.user.id

            })
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Booking not found"
                })
            }
            if (booking.paymentStatus === "paid") {
                return res.status(400).json({
                    success: false,
                    message: "Payment is already completed"
                })
            }

            const options = {
                amount: Math.round(booking.totalPrice * 100),
                currency: "INR",
                receipt: `booking_${booking._id}`
            }

            const order = await Razorpay.orders.create(options)
            booking.razorpayOrderId = order.id
            await booking.save()

            res.status(201).json({
                success: true,
                message: "Razorpay order created successfully", order
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = PaymentController