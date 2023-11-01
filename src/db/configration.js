 const mongoose=require('mongoose')

     const dbUrl=process.env.DATABASE

     const connnectionParams={
         useNewUrlParser:true,
         useUnifiedTopology:true,
     }

    const connectDB = async () => {
            try {
              const conn = await mongoose.connect(dbUrl,connnectionParams);
              console.log(`MongoDB Connected: ${conn.connection.host}`);
            } catch (error) {
              console.log(error);
              process.exit(1);
            }
          }

          module.exports=connectDB