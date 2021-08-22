const Organization = require('../models/organization');

exports.getOrganizations = (req, res, next)=>{
    const pageSize=+req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const organizationQuery=Organization.find();
    let fetchedOrganizations;
    if(pageSize && currentPage){
        organizationQuery
            .skip(pageSize*(currentPage-1))
            .limit(pageSize)
    }
    organizationQuery
        .then(organizationData=>{
            fetchedOrganizations=organizationData;
            return Organization.countDocuments();
        })
        .then(count=>{
            res.status(200).json({
                message:"Organizations fetched successfully", 
                organizations:fetchedOrganizations,
                maxOrganizations:count
            });
        })
        .catch((error)=>{
            // console.log("Unable to get Organizations")
            res.status(500).json({message:'Failed to fetch Organizations Detail!'})
        });
}

exports.getOrganization = (req, res, next)=>{
    Organization.findById(req.params.id)
        .then(organization=>{
            if(organization){
                res.status(200).json(organization)
            }else{
                res.status(404).json({message:"Organization not found"});
            }
        })
        .catch((error)=>{
            // console.log("Found error in getting a organization by ID")
            res.status(500).json({message:'Failed to fetch Organization Details by ID!'})
        })
}

exports.createOrganization = (req, res, next) =>{
    const organization=new Organization({
        organizationTitle: req.body.organizationTitle,
        organizationName: req.body.organizationName,
        organizationPhoneNo: req.body.organizationPhoneNo,
        organizationAddress: req.body.organizationAddress,
        organizationEmail: req.body.organizationEmail,
        imgSource: req.body.imgSource,
        oldImgSource:req.body.oldImgSource,
        isNewImageAdded:req.body.isNewImageAdded,
        secretCode:req.body.secretCode,
        lastUpdatedDate:(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))).toString().substring(0,24) ,
        creator:req.userData.userId
    });
    // console.log(organization);
    organization.save()
        .then(createdOrganization=>{
            res.status(201).json({
                message:"Organization added successfully!",
                organizationId: createdOrganization._id
            });
        })
        .catch((error)=>{
            console.log(error)          
            // console.log("Organization NOT saved")
            res.status(500).json({message:'Failed to add Organization Details!'})
        });
}

exports.updateOrganization = (req, res, next)=>{
    const organization = new Organization({
        _id:req.body._id,
        organizationTitle: req.body.organizationTitle,
        organizationName: req.body.organizationName,
        organizationPhoneNo: req.body.organizationPhoneNo,
        organizationAddress: req.body.organizationAddress,
        organizationEmail: req.body.organizationEmail,
        imgSource: req.body.imgSource,
        oldImgSource:req.body.oldImgSource,
        isNewImageAdded:req.body.isNewImageAdded,
        secretCode:req.body.secretCode,
        lastUpdatedDate:(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))).toString().substring(0,24) ,
        creator:req.userData.userId
    })
    Organization.updateOne({_id:req.params.id, creator: req.userData.userId}, organization)
        .then(result=>{
            // console.log(result)
            
            if(result.n>0){
                res.status(200).json({message:"Organization updated successfully!"});
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        })
        .catch((error)=>{
            // console.log("Organization not updated")
            res.status(500).json({message:'Failed to update Organization Details!'})
        })
}

exports.deleteOrganization = (req, res, next)=>{
    // console.log(req.params.id)
    Organization.deleteOne({_id:req.params.id, creator: req.userData.userId})
        .then(result=>{
            // console.log(result);
            
            if(result.n>0){
                res.status(200).json({message:"Organization Deleted!"});
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        })
        .catch((error)=>{
            console.log("Organization NOT deleted")
            res.status(500).json({message:'Failed to delete Organization Details!'})
        })
}