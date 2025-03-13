import userModel from "../models/userModel.js";
import validator from 'validator';
import bycrpt from 'bcrypt';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bycrpt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exist 
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hasing user password
        const salt = await bycrpt.genSalt(10)
        const hashedPassword = await bycrpt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Function to get user details
const getDetails = async (req, res) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details from database
        const user = await userModel.findById(decoded.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const updateUser = async (req, res) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details from database
        let user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { name, email, company, phone } = req.body;

        // Validate email if updated
        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Update user fields if provided
        user.name = name || user.name;
        user.email = email || user.email;
        user.company = company || user.company;
        user.mobile = phone || user.mobile;

        // Save updated user details
        await user.save();

        res.json({ success: true, message: "Profile updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Function to update password
const updatePassword = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);


        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const { currentPassword, newPassword } = req.body;



        // Validate current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password must be at least 8 characters long" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Create a password reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Create a reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔐 Allipo Chemicals - Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="text-align: center; item-align: center;">
                        <img src="http://allipochemicals.com/assets/img/footer-logo.png" alt="Allipo Chemicals Logo" style="width: 150px; margin-bottom: 15px;"><br/>
                        <span class="logo-font" style="color:#000080">50 Years of manufacturing Experience</span>
                    </div>
                    <h2 style="color: #007bff; text-align: center;">🔐 Password Reset Request</h2>
                    <p style="font-size: 16px; color: #333;">Hello,</p>
                    <p style="font-size: 16px; color: #333;">
                        We received a request to reset your password for <strong>Allipo Chemicals</strong>. Click the button below to proceed. 
                        This link is valid for <strong>1 hour</strong>.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetLink}" style="background-color: #007bff; color: #ffffff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; display: inline-block;">
                            🔄 Reset Password
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #888; text-align: center;">
                        If the button doesn’t work, copy and paste the following link in your browser:<br>
                        <a href="${resetLink}" style="color: #007bff;">${resetLink}</a>
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #888; text-align: center;">
                        Need help? Contact our support team at <a href="mailto:support@allipochemicals.com" style="color: #007bff;">info@allipochemicals.com</a>
                    </p>
                    <p style="font-size: 12px; color: #888; text-align: center;">
                        &copy; ${new Date().getFullYear()} Allipo Chemicals. All rights reserved.
                    </p>
                </div>
            `,
        };


        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Password reset link sent to your email!" });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.json({ success: false, message: "Invalid token or user not found!" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update password in DB
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Token expired or invalid!" });
    }
};


export { loginUser, registerUser, adminLogin, getDetails, updateUser, updatePassword, forgotPassword, resetPassword }