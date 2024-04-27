const {userproducts} = require('../models/tasks')
const {ProductSchema}  =require('../models/tasks')
const {DetailSchema} = require('../models/tasks')
const {notificationSchema} = require('../models/tasks')
const {ownedproducts} = require('../models/tasks')
// const {validateTransaction}  =require('../models/tasks')

const getUserProducts = async(req,res)=>{
    const urlusername = req.query.username;
    //console.log("dashboard backend error")
    try {
        const allproducts = await userproducts.findOne({username:urlusername})
        const ownproduct = await ownedproducts.findOne({username:urlusername})


        if (allproducts && allproducts.products) {
            const productIds = allproducts.products.map(product => product.productId);
            //console.log("the userproducts", productIds)
            productIds.forEach((productid)=>{

            })
            if(ownproduct){
                const ownproductIds = ownproduct.products.map(product => product.productId);
                return res.status(200).json({ data: productIds, own:"Yes",owndata:ownproductIds});
            }
            return res.status(200).json({ data: productIds, own:"No"});

        } else {

            return res.status(404).json({ error: "No products found for the username" });
        }
    } catch (error) {
        console.log("dashboard backend error")
        console.log(error)
    }
}



const adduserProducts = async(req,res)=>{
    const {urlusername,url_product_id ,currentAmount} = req.body

    try {
        let isproductfound = await userproducts.findOne({username:urlusername})
        const updateinProductSchema = await ProductSchema.findOne({ _id: url_product_id });
        const userdetails = await DetailSchema.findOne({username:urlusername})
        //creating the notifications
        // updateinProductSchema.status = false;
        let username1 = updateinProductSchema.userID
        const usernotification = await notificationSchema.findOne({username1 : username1})

        const now = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        const dayOfWeek = days[now.getDay()];
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const currenttime = `${dayOfWeek} ${hours}:${minutes} ${ampm}`

        if(usernotification){
            //update
            usernotification.notifications.push({
                new_username: urlusername,
                new_price: currentAmount, // Provide the new price value
                productId: url_product_id, // Provide the product ID
                url:updateinProductSchema.url,
                index: 1, // Provide the index value
                status: false,// Set the status as per your requirement
                time: currenttime
            });
            await usernotification.save();
        }
        else{
            //create
            const newNotification = new notificationSchema({
                username1: username1,
                notifications: [{
                    new_username: urlusername,
                    new_price: currentAmount, // Provide the new price value
                    productId:url_product_id, // Provide the product ID
                    url:updateinProductSchema.url,
                    index: 1, // Provide the index value
                    status: false,// Set the status as per your requirement
                    time: currenttime
                }]
            });
            await newNotification.save();
        }

        if (updateinProductSchema) {   
            updateinProductSchema.userID = urlusername; 
            updateinProductSchema.normal_price = currentAmount;
            userdetails.coins = parseInt(userdetails.coins)-currentAmount

            try {
                await updateinProductSchema.save(); 
                await userdetails.save()
                //console.log("Product updated successfully");
            } catch (error) {
                console.log("Error saving product:", error); 
            }
        } else {
            console.log("Product not found");
        }


        if(!isproductfound){
            
            const isProductFoundresponse = await userproducts.create({ 
                username:urlusername , 
                products: [{ 
                    productId: url_product_id, 
                    price: currentAmount 
                }]
             }); //i want add the current amount into the array
            

            if(!isProductFoundresponse){
                console.log("unable to create the data")
                return res.status(200).json({msg:"data is added into your list", data:'notfound'})
            }
            else{
                //console.log("the data is added")
            }
        }
        else{
            updateinProductSchema.userID = urlusername;
            // console.log(updateinProductSchema)
            //console.log('updated into the database')
            isproductfound.products.push({ productId: url_product_id, price: currentAmount });
            await isproductfound.save();

            return res.status(200).json({msg:"data is updated into your list", data:'found'})
        }
        await updateinProductSchema.save()

    } catch (error) {
        console.log("Fail in add the data into userproducts")
        console.log(error)
    }
}



const deleteProducts= async(req,res)=>{
    const {urlusername,productId :url_product_id} = req.body
    //console.log(urlusername,url_product_id)
        try {
            const userPromise  = await userproducts.findOne({ username:urlusername });
            const productPromise  = await ProductSchema.findOne({_id:url_product_id })
            const userdetailsPromise  = await DetailSchema.findOne({username:urlusername})

            const [user, isuserIDfound, userdetails] = await Promise.all([userPromise, productPromise, userdetailsPromise]);

            if (isuserIDfound.userID !== user.username) {
                
                const productToNotify = user.products.find(product => product.productId === url_product_id);
                //console.log(productToNotify.price)
                userdetails.coins += parseInt(productToNotify.price) 
                // Move the matched product to notifyProducts
                if (productToNotify) {
                    user.notifyProducts.push(productToNotify);
                }
                //filter removes the same ID's and leave the non-match ID's
                user.products = user.products.filter(product => product.productId !== url_product_id);
                //console.log("theid = ",url_product_id)
                //console.log("heheheheheheheh  ",user.products )
                await Promise.all([user.save(), userdetails.save()]);
                
                return res.status(200).json({msg:'Notmatched',data:'deleted'})}
            else{
                return res.status(200).json({msg:'matched'})
            }
        } catch (error) {
            console.error("Error deleting products:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
};

const notificationProducts = async(req,res)=>{
    const {urlusername} = req.body
    //console.log("notifiction urlsname= > ",urlusername)
    try {
        const isnotificationFound = await notificationSchema.findOne({username1: urlusername})
        if(isnotificationFound){
            //count no.of products whose status:True
            let count = 0;
            // Loop through the notifications array and count the number of products with status: true
            isnotificationFound.notifications.forEach(notification => {
                if (notification.status) {
                    count++;
                }
            });
            //console.log('count= ',count)
            res.status(200).json({ msg: "yes",datacount:count , data:isnotificationFound.notifications });
        }
        else{
            res.status(200).json({msg:"No"})
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    adduserProducts,
    getUserProducts,
    deleteProducts,
    notificationProducts,

}


//getcoins.data.data
//productdetail.data.data.normal_price;

