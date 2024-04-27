const {ProductSchema} = require("../models/tasks")
const {DetailSchema} = require("../models/tasks")
const {ownedproducts} = require("../models/tasks")
const {notificationSchema} = require("../models/tasks")
const {userproducts}= require("../models/tasks")


const getproductdetail = async(req,res)=>{
    const { productid } = req.query
    try {
        const response = await ProductSchema.findOne({_id:productid})
        //console.log(response)
        return res.status(200).json({data:response})
    } catch (error) {
        console.log("product array is is not found")
    }
}



const addProducts = async(req,res)=>{
    const {name,description,initial_price,category,url,bid_end_date}= req.body
    try {
        const product = await ProductSchema.create({
            name,
            description,
            initial_price,
            normal_price:initial_price,
            category,
            url,
            status:false,
            userID:"something",
            bid_end_date
        });
        if(!product){
            // console.log({product})
            return res.status(400).json({ error: "Failed to create product" });
        }
        res.status(200).json({product});
    } catch (error) {
        console.log(error)
    }
}

const getDashboard = async(req,res)=>{
    try {
        // Fetch all products from the database
        const allProducts = await ProductSchema.find();

        // Perform additional processing on the products, if needed
        const demoRightProducts = await Promise.all(allProducts.map(async (product) => {
            // Example: Add an extra field to each product
        
            const productDate = product.bid_end_date; // Assuming 'bid_end_date' is the field containing the product date
            const currentDate = new Date();
        
            if (productDate < currentDate && product.userID === "something") {
                //The given date has passed.
                // Add random(1-7) days to the current date
                
                const futureDate = new Date(currentDate);
                futureDate.setDate(currentDate.getDate() + parseInt(Math.floor(Math.random() * 7) + 1));
                futureDate.setHours(12, 0, 0, 0);
                product.bid_end_date = futureDate;
                await product.save(); // Use await here to wait for the save operation to complete

                

            } else if (productDate <= currentDate && product.userID != "something") {
                //updateinProductSchema.status=true
                //product.status = true;
                //change the product.status = true and save it
                if(!product.status){

                    product.status = true;
                    console.log("the product status = ",product._id)
                    const usernamee = product.userID
                    const userproductss = await userproducts.findOne({username: usernamee})
                    //i want to delete the product._id and from the notification and save it 
                    //const removeproduct = await userproducts.findOne({ username: usernamee });
                    console.log("the removed status = ",String(product._id))
                    if(userproductss.products){
                        //user.products.filter(product => product.productId !== url_product_id);
                        
                        //userproductss.products = userproductss.products.filter(product => product.productId !== String(product._id));
                        //user.products.filter(product => product.productId !== url_product_id);

                        // console.log("The updated userproducts: ",userproductss.products)
                        // await userproductss.save();

                        await userproducts.updateOne(
                            { username: usernamee },
                            { $pull: { products: { productId: String(product._id) } } }
                          );
                    }


                    const user = await ownedproducts.findOne({ username: usernamee });
    
                    const usernotification = await notificationSchema.findOne({username1: usernamee})
    
                    if(usernotification){
                        //update
                        usernotification.notifications.push({
                            new_username: "own",
                            new_price: 0, // Provide the new price value
                            productId: product._id, // Provide the product ID
                            url:"null",
                            index: 0, // Provide the index value
                            status: true,// Set the status as per your requirement
                            time: null
                        });
                        await usernotification.save();
                    }
                    else{
                        //create
                        const newNotification = new notificationSchema({
                            username1: urlusername,
                            notifications: [{
                                new_username: "own",
                                new_price: amount, // Provide the new price value
                                productId: product._id, // Provide the product ID
                                url:"null",
                                index:0 , // Provide the index value
                                status: true,// Set the status as per your requirement
                                time: null
                            }]
                        });
                        await newNotification.save();
                    }
    
                    if (user) {
                        user.products.push(product._id)
                    } else {
                        //create
                        await ownedproducts.create({
                            username: usernamee,
                            products: [{
                                productId: product._id,
                            }]
                        });
                    }
                    await product.save();
                    console.log("the product status = ",product.status)
                    
                }


            }
            //await allProducts.save()
            return product.toObject(); // Convert Mongoose document to plain JavaScript object
        }));
        return res.status(200).json({ data: demoRightProducts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred while fetching products." });
    }
}



const getcoins = async(req,res)=>{
    const {urlusername}= req.body
    try {
        const coinsdata = await DetailSchema.findOne({username:urlusername})
        return res.status(200).json({data:coinsdata.coins})
    } catch (error) {
        console.log("error in getting coins")
        console.log(error)
    }
}


module.exports={
    addProducts , 
    getDashboard,
    getproductdetail,
    getcoins
}