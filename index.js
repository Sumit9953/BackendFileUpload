const express = require("express")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

app.use(express.json());

//middleware add
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//DB connection
const database = require("./config/database")
database();

//Cloudinary connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

//api routes
const Upload =  require("./routes/FileUpload")
app.use('/api/v1/upload' , Upload)


app.listen(PORT , (req,res) => {
    console.log(`Server started at port ${PORT}`);
})