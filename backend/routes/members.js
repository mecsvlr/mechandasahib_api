const express = require('express');
const checkAuth= require("../middleware/check-auth");
const memberController = require("../controllers/member");

const router=express.Router();

router.get('',checkAuth, memberController.getMembers);
router.get('/search',checkAuth,memberController.searchMember);
router.get('/genid',checkAuth,memberController.generateMemberId);
router.get('/:id',checkAuth,memberController.getMember);
router.post('',checkAuth,memberController.createMember)
router.put("/:id",checkAuth,memberController.updateMember);
router.delete('/:id',checkAuth,memberController.deleteMember);

module.exports=router;