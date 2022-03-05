import express from 'express'
import {fetchUsersList, saveUser} from "../controllers/userController";
import {validateRequestBody} from "../validations/validator";
import {createUserSchema} from "../validations/schemas/user";
const router = express.Router();


router.post('/',   validateRequestBody(createUserSchema),saveUser)
router.get('/',fetchUsersList)

export default router;
