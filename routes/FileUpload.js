const express = require("express")
const router = express.Router();

const {localFileUpload , videoUpload , imageUpload , imageSizeReducer} = require("../controller/fileUpload")

router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/imageSizeReducer" , imageSizeReducer);

module.exports = router