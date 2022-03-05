import mongoose from "mongoose";

export const convertStringIdToObjectId = (id) => {
    try {
        return mongoose.Types.ObjectId(id);
    } catch (err) {
        return { exception: err };
    }
};