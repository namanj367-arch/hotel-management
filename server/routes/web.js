const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const adminAuth=require("../middleware/adminAuth")
const Usercontroller = require("../controllers/UserController")
const Hotelcontroller = require("../controllers/HotelController")
const Bookingcontroller=require("../controllers/BookingController")
const PaymentController=require("../controllers/PaymentController")

//USER
router.post("/registration", Usercontroller.register)
router.post("/login", Usercontroller.login)
router.get("/getprofile/:id", auth,Usercontroller.getprofile)
router.get("/logout",auth, Usercontroller.logout)
router.put("/update/:id",auth,Usercontroller.updateProfile)
router.put("/changepassword", auth,Usercontroller.changePassword)

//HOTEL
router.post("/addhotel",auth,adminAuth, Hotelcontroller.addHotel)
router.get("/gethotels", Hotelcontroller.getAllHotel)
router.get("/gethotel/:id", Hotelcontroller.getSingleHotel)
router.put("/updatehotel/:id",auth,adminAuth, Hotelcontroller.updateHotel)
router.delete("/deletehotel/:id",auth,adminAuth,Hotelcontroller.deleteHotel)


//BOOKING
router.post("/createbooking", auth, Bookingcontroller.createbooking)
router.get("/getbookings",auth,adminAuth, Bookingcontroller.getMyBooking)
router.get("/singlebooking/:id",auth,Bookingcontroller.getSingleBooking)
router.get("/getallbooking",auth ,adminAuth,Bookingcontroller.getAllBooking)
router.put("/cancelbooking/:id",auth,Bookingcontroller.cancelbooking)


//PAYMENT
router.post("/createorder",auth,PaymentController.createOrder)


module.exports=router