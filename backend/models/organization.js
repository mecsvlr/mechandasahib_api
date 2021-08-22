const mongoose = require('mongoose');

const organizationSchema =  mongoose.Schema({
    organizationTitle: {type:String, required: true},
    organizationName: {type:String, required: true},
    organizationPhoneNo: {type:String,  unique:true, required:true},
    organizationAddress: {type:String},
    organizationEmail: {type:String},
    imgSource: {type:String},
    oldImgSource: {type:String},
    isNewImageAdded: {type:Boolean},
    secretCode: {type:String},
    lastUpdatedDate: {type:String},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
});

module.exports = mongoose.model('Organization', organizationSchema);