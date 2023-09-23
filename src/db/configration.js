 const mongoose=require('mongoose')
 require('dotenv')

     const dbUrl=process.env.DATABASE

     const connnectionParams={
         useNewUrlParser:true,
         useUnifiedTopology:true,
     }

     mongoose.connect(dbUrl,connnectionParams)
         .then(()=>{console.info('connecte to the db')})
         .catch((e)=>{console.log('error',e)})