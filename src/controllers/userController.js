import {createUser} from "../repositories/userRepository";
import {respondError, respondSuccess} from "../utils/responseHelper";
import Lang from "../constants/constants";
import {StatusCodes} from 'http-status-codes'

export const createNewUser = async (req, res, next) => {
    try {
        const data = req.body;

        return await createUser(data)
            .then((result) => {
                return respondSuccess(
                    res,
                    StatusCodes.OK,
                    "Account",
                    Lang.SUCCESS,
                    result
                );
            })
            .catch((err) => {
                console.log(err);
                return respondError(
                    res,
                    StatusCodes.UNPROCESSABLE_ENTITY,
                    Lang.FAILURE,
                    Lang.SOMETHING_WENT_WRONG
                );
            });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
};