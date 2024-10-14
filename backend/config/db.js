import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI/*, 
            This block of code used to be needed in the past but not anymore
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            }*/);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1 means exit with failure but 0 means success
    }
};

export default connectDB;