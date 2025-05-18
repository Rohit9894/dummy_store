import mongoose from "mongoose";

let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDb Already Connected")
        return isConnected;
    }
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        isConnected = res.connection;
         return isConnected
    }
    catch (error) {
        console.log(error)
    }


}
export default connectDB;