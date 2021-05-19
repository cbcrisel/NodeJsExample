const { request } = require('express')
const jwt= require('jsonwebtoken')
const User= require('../models/user')

const valiteJWT=async(req=request,response= response,next)=>{
    const token = req.header('Authorization');

    if(!token){
        return response.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY);
        
        const user= await User.findById(uid);

        if(!user.status){
            return res.status(401).json({
                msg:'Token no Valido - Usuario Eliminado'
            })
        }

        req.user=user
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({
            msg:'Token No valido'
        })
    }
  
}

module.exports={
    valiteJWT
}