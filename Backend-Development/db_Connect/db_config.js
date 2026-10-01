import mongoose from 'mongoose';

export const DatabaseConnection = async () => {

    try {
        console.log("DB_URI :", process.env.DB_URI);
        
        await mongoose.connect(process.env.DB_URI);
        console.log("DataBase is connected");
        
    } catch (error) {
        console.log("There is an error", error);
        console.error(error);
        return
    }

}
