const {validateTransaction} = require('../models/tasks')



const sendvalidateTransaction = async(req,res)=>{
    const {username,Transaction_Id } = req.body
    // console.log("this is backend");
    // console.log(username,Transaction_Id)
    try {
        const response = await validateTransaction.create({username:username,Transaction_Id: Transaction_Id ,pending:true})
        //console.log(response)
        return res.status(200).json({data:response,msg:"done"})
    } catch (error) {
        console.log(" found")
        return res.status(200).json({data:response,msg:"no"})
    }
}


module.exports ={
    sendvalidateTransaction,
}