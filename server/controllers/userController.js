const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
// const { google } = require('googleapis');
// const OAuth2Client = google.auth.OAuth2;

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const usernameCheck = await User.findOne({ username: username }, { '__v': 0 });
        if (usernameCheck) {
            return res.json({ msg: "Username already exists.", status: false })
        }
        const loginUser = await User.findOne({ email: email });
        if (loginUser) {
            return res.json({ msg: 'Email already exists.', status: false });
        }
        if (otpStorage[email].isVerified === true) {
            const user = await User.create({
                username,
                email,
                password,
                isVerified: true,
            });
            delete user.password;
            return res.json({ status: true, user });
        }
        delete otpStorage[email];
    } catch (ex) {
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loginUser = await User.findOne({ email: email }, { '__v': 0 });

        if (!loginUser) {
            return res.json({ msg: 'Wrong email address', status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, loginUser.password);

        if (!isPasswordValid) {
            return res.json({ msg: 'Wrong password.', status: false })
        }

        delete loginUser.password;

        return res.json({ status: true, loginUser });

    } catch (ex) {
        next(ex)
    }
}


function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function sendOTPToEmail(email, OTP) {
    // Use nodemailer to send OTP to user's email
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vp21042000@gmail.com',
            pass: 'emnqqmxlgrzqfiwu',
        },
    });

    // Email message configuration
    const mailOptions = {
        from: 'Happy',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for registration is: ${OTP}\n\nPlease note that this OTP is valid for 15 minutes only. Do not share this OTP with anyone.`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const otpStorage = {}; // In-memory storage for OTPs and timestamps

module.exports.sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const OTP = generateOTP();

        // Store the OTP and its generation timestamp in memory associated with the user's email
        otpStorage[email] = {
            otp: OTP,
            timestamp: Date.now(),
            isVerified: false, // Store the current timestamp
        };

        sendOTPToEmail(email, OTP);

        return res.json({
            status: true,
            msg: 'OTP sent to email.'
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        // Retrieve stored OTP and its generation timestamp from in-memory storage based on the user's email
        const storedData = otpStorage[email];



        if (storedData && storedData.otp === otp && isOTPValid(storedData.timestamp)) {
            // OTP is valid and has not expired, delete the stored OTP from in-memory storage

            otpStorage[email].isVerified = true;

            // delete otpStorage[email];


            // OTP is valid, allow the user to complete the registration
            return res.json({ status: true, msg: 'OTP verified successfully.' });

        } else {
            // Invalid OTP or expired OTP
            return res.json({ status: false, msg: 'Invalid or expired OTP. Please try again.' });
        }
    } catch (ex) {
        next(ex);
    }
};

// Function to check if OTP is valid (not expired)
function isOTPValid(timestamp) {
    const currentTime = Date.now();
    const expirationTime = timestamp + 15 * 60 * 1000; // 15 minutes in milliseconds

    return currentTime <= expirationTime;
}


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;

        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });

    } catch (ex) {
        next(ex);
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
}