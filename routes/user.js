const {Router}= require('express');
const { check } = require('express-validator');
const { getUsers, putUser, postUser, deleteUser } = require('../controllers/user');
const { isRoleValid, existEmail, existUser } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');


const router= Router();

router.get('/', getUsers );

router.put('/:id',[
    check('id','No es ID valido').isMongoId(),
    check('id').custom((id)=>existUser(id)),
    check('role').custom((role)=>isRoleValid(role)),
    validateFields
],putUser  );

router.post('/',
[check('name','El nombre es obligatorio').not().isEmpty()] ,
[check('password','El password debe de ser mas de 6 letras').isLength({min:6})] ,
[check('email','El correo no es valido').isEmail()] ,
[check('email').custom((email)=>existEmail(email))] ,
//[check('role','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE'])] ,
check('role').custom((role)=>isRoleValid(role)),
validateFields,
postUser );

router.delete('/:id',[
    check('id','No es ID valido').isMongoId(),
    check('id').custom((id)=>existUser(id)),
    validateFields
] ,deleteUser);







module.exports=router;