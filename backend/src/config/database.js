import mongoose from 'mongoose';

export class MongoDBClient {
    static async connect() {
        try {
            const uri = process.env.MONGO_URL;

            const conn = await mongoose.connect(
                uri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );
            console.log(`✅ MongoDB Atlas conectado: ${conn.connection.host}`);
        } catch (error) {
            console.error('❌ Error conectando a MongoDB Atlas:', error.message);
            process.exit(1);
        }
    }
}
