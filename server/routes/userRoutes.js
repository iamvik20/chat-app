const { register, login, sendOtp, verifyOtp, setAvatar, getAllUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/set-avatar/:id', setAvatar);
router.get('/allusers/:id', getAllUsers);



module.exports = router;