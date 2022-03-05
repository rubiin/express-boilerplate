import UserModel from "../models/userModel";

// create user profile
export const createUser = async (data) => {

    const admin = new UserModel(data);
    return admin.save();
};
