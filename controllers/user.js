const {response} = require('express');
const User= require('../models/user');
const bcrypt= require('bcryptjs');


const getUsers=async(req, res=response)=> {
    const {limite=5, desde=0}=req.query;
   /*  const users= await User.find({status:true})
    .skip(Number(desde))
    .limit(Number(limite));
    
    const total= await User.countDocuments({status:true}); */
    
    const [total,users]=await Promise.all([
        User.countDocuments({status:true}),
        User.find({status:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        users
    })
};

const putUser=async(req, res)=> {
    const {id} = req.params;
    const {password,google,... rest}= req.body;

    //validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password=bcrypt.hashSync(password,salt);
    }

    const userDB= await User.findByIdAndUpdate(id,rest)
    res.json({
        msg:'put api-controller',
        id 
    })
};

const postUser=async(req, res)=> {
    

    const {name,email,role,password}= req.body;
    const user = new User({name,email,role,password});
    //Verificar si email  existe
    /* const existEmail = await User.findOne({email:email});
    if (existEmail){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        });
    } */
    //Encriptar en BD
     const salt = bcrypt.genSaltSync();
     user.password=bcrypt.hashSync(password,salt);
    //Guardar en BD
    await user.save();
    
    res.json({
        msg:'post api',
        user
    })
};

const deleteUser=async(req, res)=> {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id,{status:false});
    res.json({
        msg:'delete api',
        id
    })
};


module.exports= {
    getUsers,
    putUser,
    postUser,
    deleteUser
}