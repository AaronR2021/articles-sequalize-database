var jwt=require('jsonwebtoken');

module.exports={
    verifyToken: async(req,res,next)=>{
        var token=req.headers.authorization;
        try{
            if(token){
                var payload=await jwt.verify(token,process.env.LOGIN_JWT_SECRET)
                req.user=payload;
                next()
            }
            else{
                res.status(300).json({error:'token required in header under Authorization'})
                }
        }
        catch(error){
           res.status(300).json({error:'invalid token'})
        }
    }
}