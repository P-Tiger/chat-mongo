import mongoose from 'mongoose'

const User = mongoose.model("users", mongoose.Schema({
    name: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        trim: true,
        required: true,
    },
    password: {
        type: "String",
        required: true,
        // select: false,
    },
    token_info: {
        type: "String",
        required: false,
        // select: false,
    }
}, { timestamps: true }))
User.getList = async (where, paging) => {
    let data = await User.find();
    return data
}
export default User