const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URI)
        console.log("Database Connected")
    }
    catch (e){
        console.log("Error Connecting to Database: ",e)
    }
}
connection()

module.exports = connection;