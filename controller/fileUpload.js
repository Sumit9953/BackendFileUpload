const File = require("../models/File")
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req,res) => {
    try {

        //fetch file
        const file = req.files.file;
        console.log("File data", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ;
        console.log("Path-> " , path);

        file.mv(path , (err) => {
            console.log(err);
        })

        res.json({
            success:true,
            message:"Local file upload successfully"
        })

    } catch (error) {
        console.log("Not able to upload file on server");
        console.log(error);
    }
}

//Image upload handler

function isFileTypeSupported(type , supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file , folder , quality){
    const options = {folder}
    console.log("Temp file path" , file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

exports.imageUpload = async (req,res) => {
    try {

        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File formate not supported"
            })
        }

        //Upload on cloudinary
        const response = await uploadFileToCloudinary(file , "sumitFile");
        console.log(response);

        //Save entry in Database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"image not uploaded"
        })
    }
}

exports.videoUpload = async (req,res) => {
    try {

        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4" , "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File formate not supported"
            })
        }

         //Upload on cloudinary
         console.log("Video Upload");

         const response = await uploadFileToCloudinary(file , "sumitFile");
         console.log(response);

         const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:"Image successfully uploaded"
        })
  
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Video not uploaded"
        })
    }
}

// image size reducer

exports.imageSizeReducer = async(req,res) => {
    try {

        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File formate not supported"
            })
        }

        //Upload on cloudinary
        const response = await uploadFileToCloudinary(file , "sumitFile" , 90);
        console.log(response);

        //Save entry in Database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        })
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"somethin went wrong while reducing image size"
        })
    }
}
