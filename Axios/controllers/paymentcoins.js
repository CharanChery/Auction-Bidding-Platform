const {paymentcardSchema} = require('../models/tasks')
const {notificationSchema} = require("../models/tasks")
const {DetailSchema} = require("../models/tasks")

// const paymentcardSchema = new mongoose.Schema({
//     username: String,
//     trans_id:String,
//     amount : Number,
//     coins_generated : Number,
//     payment_intent:String,
// })


const createpayment =async(req,res)=>{
    const{urlusername,t_id,amount} = req.body
    try {
        const coins = amount/5;
        const now = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        const dayOfWeek = days[now.getDay()];
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const currenttime = `${dayOfWeek} ${hours}:${minutes} ${ampm}`



        const newPayment = new paymentcardSchema({
            username: urlusername,
            trans_id: t_id,
            amount: amount,
            coins_generated: coins, // Assuming there's a function to calculate coins based on the amount
            time:currenttime
        });

        // Save the new payment card to the database
        const savedPayment = await newPayment.save();

        const usernotification = await notificationSchema.findOne({username1 : urlusername})


        if(usernotification){
            //update
            usernotification.notifications.push({
                new_username: "payment",
                new_price: amount, // Provide the new price value
                productId: "null", // Provide the product ID
                url:"null",
                index: coins, // Provide the index value
                status: true,// Set the status as per your requirement
                time: currenttime
            });
            await usernotification.save();
        }
        else{
            //create
            const newNotification = new notificationSchema({
                username1: urlusername,
                notifications: [{
                    new_username: "payment",
                    new_price: amount, // Provide the new price value
                    productId: "null", // Provide the product ID
                    url:"null",
                    index:coins , // Provide the index value
                    status: true,// Set the status as per your requirement
                    time: currenttime
                }]
            });
            await newNotification.save();
        }

        try {
            const user = await DetailSchema.findOne({ username: urlusername });

            if(user){
                user.coins += coins;

                // Save the updated user document
                await user.save();
            }
        } catch (error) {
            
        }

        //console.log("successfully done")
        res.status(200).json({ message: 'Payment created successfully', payment: savedPayment });



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal payment server error' });
    }
}

module.exports={
    createpayment,
}
