const { response, request } = require("express");

const adminRole=(req=request,res=response,next)=>{
    if (!req.user){
        return res.status(500).json({
            msg:'Error al verificar rol de este usuario'
        });
    }
    const {role,name}= req.user

    if(role!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no es Administrador no puede hacer esta accion`
        });
    }
    next();
}

const verifiedRole=(...roles)=>{
    return (req=request,res=response,next)=>{
        if (!req.user){
            return res.status(500).json({
                msg:'Error al verificar rol de este usuario'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles : ${roles}`
            });
        }
    }
}

module.exports={
    adminRole,
    verifiedRole
}