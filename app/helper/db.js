import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: 'rmsNextJs',
        });
        console.log("------------------------------------------");
        console.log('%%%%%%%%%%%[[[ DB CONNECTED ]]]%%%%%%%%%%%');
        console.log("------------------------------------------");

    } catch (e) {
        console.log("----------------------------------------------------");
        console.log(' %%%%%%%%%%[[[ Failed to connect to DB ]]]%%%%%%%%%%');
        console.log("----------------------------------------------------");


    }
}
