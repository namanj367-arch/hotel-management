const jwt=require("jsonwebtoken")


const auth = async(req,res,next)=>{
    try{
        //console.log("Cookies", req.cookie)
        //console.log("Headers cookie", req.headers.cookie)

        const token= req.cookies.token
        //console.log("tokens:", token)
        if(!token){
            return res.status(401).json({
                succcess: false,
                message:"unauthorised"
            })
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user=decoded
        next()

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:"Internal server error"
        })
        
    }
}

module.exports=auth;