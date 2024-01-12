const {
  addMessage,
  getAllMessage
} = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/sendMsg", addMessage);
router.post("/getMsg", getAllMessage);


module.exports = router;
