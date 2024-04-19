const Detail = require("../models/tasks")
const bcrypt = require('bcrypt');
const gettask = async (req, res) => {
    try {
        const { name, password} = req.body;
        const detail = await Detail.findOne({ name: name });


        if (!detail) {
            return res.status(200).json({ msg: 'Username_notfound', reason: ' user Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, detail.password);

        if (isPasswordValid) {
            return res.status(200).json({ msg: 'LOGGED IN' });
        } 
        else {
            return res.status(200).json({ msg: 'Password_notfound', reason: 'Invalid credentials' });}

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const createtask = async(req,res)=>{
    const {name,password}= req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const detail = await Detail.create({ name, password: hashedPassword });
        if(!detail){
            res.status(405).json({detail})
        }
        res.status(200).json({detail});
    } catch (error) {
        res.status(404).send("Error occured")
    }
}

module.exports={
    gettask,
    createtask
}