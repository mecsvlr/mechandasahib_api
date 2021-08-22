const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
  childName: String,
  childGender: String,
  childDOB: String,
  childEducation: String,
  childOccupation: String,
  childRelation: String
  })

const memberSchema =  mongoose.Schema({
    memberIdNo:{type:String, required:true},
    adharNo: {type:String, required:true},
    memberName:{type:String, required:true},
    parentName:{type:String, required:true},
    education:{type:String, required:true},
    occupation:{type:String, required:true},
    imgSource:{type:String},
    oldImgSource:{type:String},
    isNewImageAdded:{type:Boolean},
    secretCode:{type:String},
    dateOfBirthDate:{type:String, required:true},
    gender:{type:String, required:true},
    maritalStatus:{type:String, required:true},
    address:{type:String, required:true},
    phoneNo:{type:String, required:true},
    financialStatus:{type:String, required:true},
    ownHouse:{type:String, required:true},
    isNegative:{type:Boolean},
    negativeComments:{type:String},
    isPoorHealth:{type:Boolean},
    poorHealthComments:{type:String},
    lastUpdatedDate:{type:String},
    children: [childSchema],
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
});

module.exports = mongoose.model('Member', memberSchema);
