const Member = require('../models/member');

var membersCount=0;


exports.getMembers = (req, res, next)=>{
    
    const pageSize=+req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const memberQuery=Member.find();
    let fetchedMembers;
    if(pageSize && currentPage){
        memberQuery
            .skip(pageSize*(currentPage-1))
            .limit(pageSize)
    }
    memberQuery
        .then(members=>{
            fetchedMembers=members;
            return Member.countDocuments();
        })
        .then(count=>{
            res.status(200).json({
                message:"Members fetched successfully", 
                members:fetchedMembers,
                maxMembers:count
            });
        })
        .catch((error)=>{
            // console.log("Unable to get members")
            res.status(500).json({message:'Failed to fetch Members!'})
        });
}

exports.searchMember = (req, res, next)=>{

    //console.log(req.query)

    const pageSize=+req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const searchText= req.query.searchtext;
    
// console.log(req.query);
// console.log(searchText)
        
    let memberQuery=Member.find();
    let fetchedMembers;
    
    
    if(searchText ){
        // console.log("inside")
        // console.log(searchText)
        if(searchText!=""){
        var regexValue = '\.*'+searchText.toLowerCase().trim()+'\.*';
        const CheckValue =new RegExp(regexValue,'i');
       
        memberQuery=Member.find({$or:[{'memberIdNo':CheckValue},{'adharNo':CheckValue},{'memberName':CheckValue},{'parentName':CheckValue},{'education':CheckValue},{'occupation':CheckValue},{'gender':CheckValue},{'maritalStatus':CheckValue},{'address':CheckValue},{'phoneNo':CheckValue},{'financialStatus':CheckValue},{'ownHouse':CheckValue},{'negativeComments':CheckValue},{'poorHealthComments':CheckValue},{'children.childName':CheckValue},{'children.childGender':CheckValue},{'children.childDOB':CheckValue},{'children.childEducation':CheckValue},{'children.childOccupation':CheckValue},{'children.childRelation':CheckValue}]});
        }     
    }

    memberQuery
    .then(members=>{
        membersCount=members.length;
       // console.log("members - Count")
       // console.log(membersCount)
        if(pageSize && currentPage){
            memberQuery
                .skip(pageSize*(currentPage-1))
                .limit(pageSize)
        }
        memberQuery
            .then(members=>{
                fetchedMembers=members;
                //console.log(members)
                //console.log(members.length)
                //console.log(fetchedMembers.length)
               
            })
            .then(count=>{
                // console.log("count")
                // console.log(count)
                if(searchText!="" || typeof(searchText)!="undefined" ){
                    count= fetchedMembers.length;
                    // console.log(count)
                }
                //console.log(count)
                res.status(200).json({
                    message:"Filtered Members fetched successfully", 
                    members:fetchedMembers,
                    maxMembers:membersCount
                });
            })
            .catch((error)=>{
                // console.log(error);//console.log("Unable to get filtered members")
                res.status(500).json({message:'Failed to fetch filtered Members!'})
            });
    })
    .catch((error)=>{
        console.log(error);console.log("Unable to get membersCount")
        res.status(500).json({message:'Failed to fetch Members Count!'})
    }); 
    
    // console.log("membersCount")
    // console.log(membersCount)

    
}

isNumeric=(num)=> {
    return !isNaN(num);
  }
  padLeft=(nr, n, str)=> {
    return Array(n - String(nr).length + 1).join(str || "0") + nr;
  }

exports.generateMemberId = (req, res, next)=>{
    
    let fetchedMembers;
    let lastMember;
    
    // Member.find().sort({"_id":-1}).limit(1).then(member=>{lastMember=member}).catch(console.log("Unable to get last member"))
    // console.log(lastMember)
    Member.find()
        .then(members=>{
            fetchedMembers=members;
            return Member.countDocuments();
        })
        .then(count=>{
            if(fetchedMembers[count-1]){
                lastMember=fetchedMembers[count-1]
            }else{
                lastMember={memberIdNo:"0"}
            }
            res.status(200).json({
                message:"Last Member details fetched successfully!!", 
                lastMemberBillNo:lastMember.memberIdNo,
                maxMembers:count
            });
        })
        .catch((error)=>{
            // console.log("Unable to get members")
            res.status(500).json({message:'Failed to fetch Member GenID!'})
        });
}

exports.getMember = (req, res, next)=>{
    Member.findById(req.params.id)
        .then(member=>{
            if(member){
                res.status(200).json(member)
            }else{
                res.status(404).json({message:"Member not found"});
            }
        })
        .catch((error)=>{
            // console.log("Found error in getting a Member by ID")
            res.status(500).json({message:'Failed to fetch Member by ID!'})
        })
}

exports.createMember = (req, res, next) =>{
    console.log(req.body.imgSource);
    /*const imgSource = req.body.imgSource;
    console.log(imgSource['$ngfDataUrl'])
const data = imgSource;
const split = data.split(','); // or whatever is appropriate here. this will work for the example given
const base64string = split[1];
const buffer = Buffer.from(base64string, 'base64');
const imgSource_Data = buffer;*/
// member.imgSource.data = buffer;
/*
    memberDataArray = [];
    for(let i=0;i<req.body.listOfItems.length;i++){
        memberDataArray.push({item_id:"", itemName:"", itemCostPrice: 0, itemSellingPrice: 0, item_qty:0, quantity:0, cpCost:0, spCost:0, profit:0 });
     
        memberDataArray[i].item_id=req.body.listOfItems[i].item_id
        memberDataArray[i].itemName=req.body.listOfItems[i].itemName
        memberDataArray[i].itemCostPrice=req.body.listOfItems[i].itemCostPrice
        memberDataArray[i].itemSellingPrice=req.body.listOfItems[i].itemSellingPrice
        memberDataArray[i].item_qty=req.body.listOfItems[i].item_qty
        memberDataArray[i].quantity=req.body.listOfItems[i].quantity
        memberDataArray[i].quantity_copy=req.body.listOfItems[i].quantity_copy
        memberDataArray[i].cpCost=req.body.listOfItems[i].cpCost
        memberDataArray[i].spCost=req.body.listOfItems[i].spCost
        memberDataArray[i].profit=req.body.listOfItems[i].profit
        memberDataArray[i].itemHSN=req.body.listOfItems[i].itemHSN
        
    }*/



    /*
        clientName: req.body.clientName,
        clientPhoneNo: req.body.clientPhoneNo,
        amountPaid: req.body.amountPaid,
        totalCost: req.body.totalCost,
        lastUpdatedDate: req.body.lastUpdatedDate,
        purchasedDate: req.body.purchasedDate,
        listOfItems: memberDataArray
        

    */
   let fetchedMembers;
    let lastMember;
    let genBillNoVal="";
    // console.log(Member.find())
    Member.find()
    .then(members=>{
        fetchedMembers=members;
        return Member.countDocuments();
    })
    .then(count=>{
        if(fetchedMembers[count-1]){
            lastMember=fetchedMembers[count-1]
        }else{
            lastMember={memberIdNo:"0"}
        }
     /*   res.status(200).json({
            message:"Last Member details fetched successfully!!", 
            lastMemberBillNo:lastMember.memberIdNo,
            maxMembers:count
        });*/
        let lastMemberBillNo=lastMember.memberIdNo;
            let maxMemberCount=count;
            let lastBillNo_num = 0;
        let billNoAr = lastMemberBillNo.split(" ");
        for (let i = 0; i < billNoAr.length; i++) {
            if (isNumeric(billNoAr[i].trim())) {
              //console.log(billNoAr[i]);
              lastBillNo_num = Number(billNoAr[i].trim());
              //console.log(lastBillNo_num);
              //if(lastBillNo_num!=0){
              if (lastBillNo_num >= maxMemberCount) {
                genBillNoVal =
                  "MNCS VLR " + padLeft(lastBillNo_num + 1, 5, "0");
                // console.log("last bill no");
              } else {
                genBillNoVal =
                  "MNCS VLR " + padLeft(maxMemberCount + 1, 5, "0");
                // console.log("max member");
              }
            //   console.log(genBillNoVal);
              //}
            }
          }
        //   console.log("genBillNoVal");//console.log(genBillNoVal);
          const member=new Member({
            memberIdNo:genBillNoVal,
           adharNo: req.body.adharNo,
      memberName: req.body.memberName ,
      parentName: req.body.parentName ,
      education: req.body.education ,
      occupation: req.body.occupation ,
      imgSource: req.body.imgSource ,
      oldImgSource:req.body.oldImgSource,
    isNewImageAdded:req.body.isNewImageAdded,
    secretCode:req.body.secretCode,
      dateOfBirthDate: req.body.dateOfBirthDate ,
      gender: req.body.gender ,
      maritalStatus: req.body.maritalStatus ,
      address: req.body.address ,
      phoneNo: req.body.phoneNo ,
      financialStatus: req.body.financialStatus ,
      ownHouse:req.body.ownHouse ,
      isNegative: req.body.isNegative,
      negativeComments: req.body.negativeComments ,
      isPoorHealth: req.body.isPoorHealth,
      poorHealthComments: req.body.poorHealthComments ,
      lastUpdatedDate: (new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))).toString().substring(0,24) ,
     children: req.body.children,
            creator:req.userData.userId
        });
        

        // console.log(member);
        member.save()
            .then(createdMember=>{
                res.status(201).json({
                    message:"Member added successfully!",
                    memberId: createdMember._id
                });
            })
            .catch((error)=>{
                console.log(error)
                console.log("Member NOT saved")
                
                res.status(500).json({message:'Failed to add Members!'})
            });
        
    })
    .catch((error)=>{
        // console.log("Unable to get members")
        res.status(500).json({message:'Failed to fetch Member GenID!'})
    });

    
}

exports.updateMember = (req, res, next)=>{
    /*memberDataArray = [];
    for(let i=0;i<req.body.listOfItems.length;i++){
        
        memberDataArray.push({item_id:"", itemName:"", itemCostPrice: 0, itemSellingPrice: 0, item_qty:0, quantity:0, cpCost:0, spCost:0, profit:0 });
     
        memberDataArray[i].item_id=req.body.listOfItems[i].item_id
        memberDataArray[i].itemName=req.body.listOfItems[i].itemName
        memberDataArray[i].itemCostPrice=req.body.listOfItems[i].itemCostPrice
        memberDataArray[i].itemSellingPrice=req.body.listOfItems[i].itemSellingPrice
        memberDataArray[i].item_qty=req.body.listOfItems[i].item_qty
        memberDataArray[i].quantity=req.body.listOfItems[i].quantity
        memberDataArray[i].quantity_copy=req.body.listOfItems[i].quantity_copy
        memberDataArray[i].cpCost=req.body.listOfItems[i].cpCost
        memberDataArray[i].spCost=req.body.listOfItems[i].spCost
        memberDataArray[i].profit=req.body.listOfItems[i].profit
        memberDataArray[i].itemHSN=req.body.listOfItems[i].itemHSN
    }*/

    const member = new Member({
        _id:req.body._id,
        memberIdNo:req.body.memberIdNo,
       adharNo: req.body.adharNo,
	  memberName: req.body.memberName ,
	  parentName: req.body.parentName ,
	  education: req.body.education ,
	  occupation: req.body.occupation ,
      imgSource: req.body.imgSource ,
      oldImgSource:req.body.oldImgSource,
    isNewImageAdded:req.body.isNewImageAdded,
    secretCode:req.body.secretCode,
	  dateOfBirthDate: req.body.dateOfBirthDate ,
	  gender: req.body.gender ,
	  maritalStatus: req.body.maritalStatus ,
	  address: req.body.address ,
	  phoneNo: req.body.phoneNo ,
	  financialStatus: req.body.financialStatus ,
	  ownHouse:req.body.ownHouse ,
	  isNegative: req.body.isNegative,
	  negativeComments: req.body.negativeComments ,
	  isPoorHealth: req.body.isPoorHealth,
	  poorHealthComments: req.body.poorHealthComments ,
	  lastUpdatedDate: (new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))).toString().substring(0,24) ,
	 children: req.body.children,
    creator:req.userData.userId
    })
    
    Member.updateOne({_id:req.params.id, creator: req.userData.userId}, member)
        .then(result=>{
            // console.log(result)
            
            if(result.n>0){
                res.status(200).json({message:"Member updated successfully!"});
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        })
        .catch((error)=>{
            // console.log("Member not updated")
            res.status(500).json({message:'Failed to update Members!'})
        })
}

exports.deleteMember = (req, res, next)=>{
    // console.log(req.params.id)
    //creator: req.userData.userId
    Member.deleteOne({_id:req.params.id,creator: req.userData.userId})
        .then(result=>{
            // console.log(result);
            
            if(result.n>0){
                res.status(200).json({message:"Member Deleted!"});
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        })
        .catch((error)=>{
            // console.log("Member NOT deleted")
            res.status(500).json({message:'Failed to delete Members!'})
        })
}