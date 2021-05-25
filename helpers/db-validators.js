const Category = require('../models/category');
const Role=require('../models/role');
const User=require('../models/user');

const isRoleValid= async(role='')=>{
    const existRole= await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${rol} no esta en la base de datos`);
    }
} 

const existEmail = async(email='')=>{ 
    const exEmail= await User.findOne({email:email});
    if (exEmail){
        throw new Error('Correo ya existe');
    }
}

const existUser= async(id)=> {
    const exUser= await User.findById(id)
    if (!exUser){
        throw new Error('El usuario no existe');
    }
}

const existCategory=async(id)=>{
    const exCategory= await Category.findById(id);
    if (!exCategory){
        throw new Error('La Categoria no existe');
    }
}

module.exports={
    isRoleValid,
    existEmail,
    existUser,
    existCategory
}