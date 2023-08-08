const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    videoUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

//post middleware
fileSchema.post("save" , async function(doc) {
    try {
        console.log("Doc->" , doc);

        //transpoter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        //send mail

        let info = await transporter.sendMail({
            from: `SumitOrg`,
            to: doc.email,
            subject: "New File uploaded cloudinary",
            html:`<h2>Hello sir ,</h2> <p> File uploaded </p> view here: <a href = "${doc.imageUrl}">${doc.imageUrl}</a> `
        })

        console.log("Info:" , info);


    } catch (error) {
        console.error(error);
    }
})

module.exports = mongoose.model("File" , fileSchema);