const { request, response } = require("express");
const Category= require('../models/category');


const getAll=async(req=request,res=response)=>{
    const categories= await Category.find({status:true});

    const total= await Category.countDocuments({status:true});
    res.json({
        total,
        categories
    })
  
}

const getCategory=async(req=request,res=response)=>{
    const {id}= req.params;
    const category = await Category.findById(id);

    res.json(category);
}

const updateCategory=async(req=request,res=response)=>{
    const {id}= req.params;
   
    const categoryDB = await Category.findOne({name});
    if(categoryDB){
        return res.status(400).json({
            msg:`La categoria ${categoryDB.name} ya existe`
        });
    }
    const category=await Category.findById(id)
    category.name=req.body.name.toUpperCase();
    await category.save();
    res.status(200).json({
        category,
        msg:'Updated Successfully'
    });
}


const createCategory= async(req=request,res=response)=>{

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});

    if(categoryDB){
        return res.status(400).json({
            msg:`La categoria ${categoryDB.name} ya existe`
        });
    }

    const data={
        name,
        user:req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json(category);
}

const deleteCategory=async(req=request,res=response)=>{
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id,{status:false});
    res.json({
        msg:'Eliminado Correctamente'
    })
}


module.exports={
    createCategory,
    getAll,
    getCategory,
    updateCategory,
    deleteCategory
}