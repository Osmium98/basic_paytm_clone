const mongoose = require('mongoose'); 
require('dotenv').config();

console.log("bhh ",process.env.DB_CONNECTION_STRING)
const dbConnectionString = process.env.DB_CONNECTION_STRING;
console.log(dbConnectionString)
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

const userSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname: String,
    password:String
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true

    }
})

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema )

module.exports={
    User,
    Account
}