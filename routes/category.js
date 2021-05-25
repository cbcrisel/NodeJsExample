const {Router}= require('express');
const { check } = require('express-validator');
const { createCategory, getAll, getCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { existCategory } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');
const { valiteJWT } = require('../middlewares/validate-jwt');

const { adminRole, verifiedRole } = require('../middlewares/validate-roles');

const router = Router();

router.post('/',[
    valiteJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateFields
],createCategory);

router.get('/',getAll);

router.get('/:id',[
    check('id','No es ID valido').isMongoId(),
    check('id').custom((id)=>existCategory(id)),
    validateFields
],getCategory)

router.put('/:id',[
    valiteJWT,
    check('id','No es ID valido').isMongoId(),
    check('id').custom((id)=>existCategory(id)),
    validateFields
],updateCategory);

router.delete('/:id',[
    valiteJWT,
    verifiedRole('ADMIN_ROLE'),
    check('id','No es ID valido').isMongoId(),
    validateFields
],deleteCategory);


module.exports=router;