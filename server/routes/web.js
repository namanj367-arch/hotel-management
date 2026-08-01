const express=require("express")
const Usercontroller = require("../controllers/UserController")
const router=express.Router()
const auth=require("../middleware/auth")

//USER
router.post("/registration", Usercontroller.register)
router.post("/login", Usercontroller.login)
router.get("/getprofile/:id", auth,Usercontroller.getprofile)
router.get("/logout",auth, Usercontroller.logout)
router.put("/update/:id",auth,Usercontroller.updateProfile)
router.put("/changepassword", auth,Usercontroller.changePassword)


module.exports=router