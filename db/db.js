const mongoose = require('mongoose')


async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParse:true
        })
        console.log('databse conected sucesfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnect;