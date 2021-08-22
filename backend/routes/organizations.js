const express = require('express');
const checkAuth= require("../middleware/check-auth");
const organizationController=require("../controllers/organization");

const router=express.Router();

router.get('',checkAuth,organizationController.getOrganizations);
router.get('/:id',checkAuth,organizationController.getOrganization);
router.post('',checkAuth,organizationController.createOrganization)                                                                                                                                                              
router.put("/:id",checkAuth,organizationController.updateOrganization);
router.delete('/:id',checkAuth,organizationController.deleteOrganization);

module.exports=router;

