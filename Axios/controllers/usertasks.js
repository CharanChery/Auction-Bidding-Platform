const {ProductSchema} = require("../models/tasks")
 const {DetailSchema} = require("../models/tasks")


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
        const rightproducts = await ProductSchema.find()
        return res.status(200).json({ data: rightproducts });
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