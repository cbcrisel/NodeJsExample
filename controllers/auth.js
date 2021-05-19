const {response}= require('express');
const User = require('../models/user');
const bcryptjs= require('bcryptjs');
const {generateJWT} =require('../helpers/generate-jwt');

const login=async(req,res=response)=>{
    const {email,password}= req.body;
    try {
        //verifying email
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - correo'
            });
        }
        //if user is active
        if(!user.status){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - estado:falso'
            });
        }
        //Verify passwod
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario/ Contraseña no son correctos - password'
            });
        }
        //Generate the JWT
        const token = await generateJWT(user.id);

        res.json({
           user,
           token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
    
    
   
}

module.exports={
    login
}