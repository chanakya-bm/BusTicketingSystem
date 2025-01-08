const User = require('../models/User')

const authorize = (allowedRoles)=> async(req,res,next) =>{
    if(!req.body.user){
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const user  = await User.findById(req.body.user.id)
    if(!(allowedRoles.includes(user.role))){
        return res.status(401).json({message:`"Cannot Access this route as ${user.role=="U"?"User":"Admin"}"`})
    }
    next()

}
module.exports = authorize