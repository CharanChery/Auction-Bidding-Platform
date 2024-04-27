const mongoose = require('mongoose')


const DetailSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    coins:Number,
})

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    initial_price : Number,
    normal_price: Number,
    category: String,
    url:String,
    status:Boolean,
    userID:String,
    bid_end_date: Date
});

const userproducts = new mongoose.Schema({
    username: String,
    products: [{
        productId: String,
        price: Number
    }],
    notifyProducts: [{
        productId: String,
        price: Number
    }],
});

const ownedproducts = new mongoose.Schema({
    username: String,
    products: [{
        productId: String
    }]
});



const validateTransaction = new mongoose.Schema({
    username:String,
    Transaction_Id : String,
    pending: Boolean,
})

const notificationSchema = new mongoose.Schema({
    username1:String,
    notifications:[{
        new_username:String,
        new_price:Number,
        productId: String,
        url:String,
        index:Number,
        status:Boolean,
        time:String,
     }]
})
const paymentcardSchema = new mongoose.Schema({
    username: String,
    trans_id:String,
    amount : Number,
    coins_generated : Number,
    time:String,
})

module.exports = {
    DetailSchema:mongoose.model('data',DetailSchema),
    ProductSchema:mongoose.model('products',ProductSchema),
    userproducts:mongoose.model('userproduct', userproducts),
    validateTransaction:mongoose.model("validateTransaction",validateTransaction),
    notificationSchema:mongoose.model("notificationSchema",notificationSchema),
    paymentcardSchema:mongoose.model("paymentCard",paymentcardSchema),
    ownedproducts:mongoose.model("ownedProducts",ownedproducts)

}