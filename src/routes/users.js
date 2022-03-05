import express from 'express'
import {createNewUser} from "../controllers/userController";
import {validateRequestBody} from "../validations/validator";
import {createUserSchema} from "../validations/schemas/user";
const router = express.Router();


router.post('/',   validateRequestBody(createUserSchema),createNewUser)

export default router;
