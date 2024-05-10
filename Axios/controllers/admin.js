const {DetailSchema ,ProductSchema} = require("../models/tasks")



const getallusersinfo = async(req,res)=>{
    try {
        const allusers = await DetailSchema.find()
        return res.status(200).json({msg:allusers})
    } catch (error) {
        return res.status(200).json({msg:"error in finding all the usernames admin" ,code:404})
    }
}

const getallitemsinfo = async(req,res)=>{
    try {
        const currentDate = new Date();

        // Filter items where bid_date is greater than the current date and time
        const allitems = await ProductSchema.find({ bid_end_date: { $gt: currentDate } });
        //console.log(allitems)
        // filte allitems, item.bid_date > curretndate and time
        return res.status(200).json({msg:allitems})
    } catch (error) {
        return res.status(200).json({msg:"error in finding all the items admin" ,code:404})
    }
}

const deleteproducts = async(req,res)=>{
    const {url_product_id} = req.body
    try {
        // Find the product by its ID and delete it
        const deletedProduct = await ProductSchema.findOneAndDelete({ _id: url_product_id });
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ msg: "Product deleted successfully", deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


const deleteuser = async(req,res)=>{
    const {url_user_id} = req.body
    try {
        // Find the product by its ID and delete it
        const deletedProduct = await DetailSchema.findOneAndDelete({ _id: url_user_id });
        if (!deletedProduct) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "User deleted successfully", deletedProduct });
    } catch (error) {
        console.error("Error deleting User:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}




module.exports={
    getallusersinfo,
    getallitemsinfo,
    deleteproducts,
    deleteuser
}
