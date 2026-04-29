const express = require("express");
const router = express.Router();
const USER = require("../models/user");
const { ORDER } = require("../models/order");
const { CheckforAuthCookie } = require("../middlewares/auth");
const { validateToken } = require("../services/auth");
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
};

router.use(CheckforAuthCookie("token"));

// Sign in route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await USER.matchPasswordandGenerateToken(email, password);
    if (token.error === "User Not Found!") {
      return res.status(400).send({ error: "User Not Found" });
    }
    if (token.error === "Wrong Password!") {
      return res.status(400).send({ error: "Incorrect Password, Try Again!" });
    }
    return res.cookie("token", token).status(200).send({ token, success: "Login Successful!" });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

// Sign up route
router.post("/signup", async (req, res) => {
  console.log("SignUp Request Received");
  const { fullName, email, password, mobile, role } = req.body;
  try {
    const newUser = await USER.create({
      fullName,
      email,
      password,
      mobile,
      role
    });

    const subject = 'Welcome to Our Service!';
    const text = `Hi ${fullName},\n\nThank you for signing up. We are excited to have you on board!`;
    //const html = `<p>Hi ${fullName},</p><p>Thank you for signing up. We are excited to have you on Foodie!</p>`;
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 10px;">
      <h1 style="color: #ffffff; text-align: center;">Welcome to Foodie!</h1>
      <p>Hi ${fullName},</p>
      <p style="margin-top: 10px;">Thank you for signing up. We are excited to have you on Foodie!</p>
      <p style="color: #ffcc00; text-align: center; margin-top: 20px;">Let's get started on your food journey!</p>
      <footer style="margin-top: 30px; text-align: center;">
        <p style="font-size: 12px; color: #777777;">&copy; ${new Date().getFullYear()} Foodie. All rights reserved.</p>
      </footer>
    </div>`;
  
    await sendEmail(email, subject, text, html);

    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      console.log("Duplicate User Found !");
      return res.status(400).send({ error: "Email Already Exists!" });
    }
    return res.status(500).send({ error: err.message });
  }
});

// Sign out route
router.get("/signout", (req, res) => {
  console.log("SignOut Request Received");
  res.clearCookie("token").redirect("/");
});

// Delete user route
router.post("/user/delete", async (req, res) => {
  console.log("Delete User Request Received");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = validateToken(token);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await USER.findOneAndDelete({ _id: user._id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add order route
router.post("/user/add-order", async (req, res) => {
  console.log("Add Order Request Received");

  const { name, price, delivery_address, quantity, image, payment_method, email } = req.body;

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = validateToken(token)._id;

    const user = await USER.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = await ORDER.create({
      name,
      price,
      delivery_address,
      quantity,
      image,
      payment_method,
      user: userId  
    });

    user.RecentOrders.push(order._id);
    await user.save();

    // Send confirmation email
    const subject = 'Order Confirmation';
    const text = `Hi ${user.fullName},\n\nYour order has been placed successfully. Your order details are as follows:\n\nName: ${name}\nPrice: ₹${price}\nDelivery Address: ${delivery_address}\nQuantity: ${quantity}\nPayment Method: ${payment_method}\n\nThank you for shopping with us!`;
   // const html = `<p>Hi ${user.fullName},</p><p>Your order has been placed successfully. Your order details are as follows:</p><ul><li>Name: ${name}</li><li>Price: ₹${price}</li><li>Delivery Address: ${delivery_address}</li><li>Quantity: ${quantity}</li><li>Payment Method: ${payment_method}</li></ul><p>Thank you for shopping with us!</p>`;
   const html = `
   <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 10px;">
     <h1 style="color: #ffffff; text-align: center;">Thank You for Your Order!</h1>
     <p>Hi ${user.fullName},</p>
     <p>Your order has been placed successfully. Your order details are as follows:</p>
     <ul style="list-style-type: none; padding: 0;">
       <li style="margin: 5px 0;"><strong>Name:</strong> ${name}</li>
       <li style="margin: 5px 0;"><strong>Price:</strong> ₹${price}</li>
       <li style="margin: 5px 0;"><strong>Delivery Address:</strong> ${delivery_address}</li>
       <li style="margin: 5px 0;"><strong>Quantity:</strong> ${quantity}</li>
       <li style="margin: 5px 0;"><strong>Payment Method:</strong> ${payment_method}</li>
     </ul>
     <p style="color: #ffcc00; text-align: center; margin-top: 20px;">Thank you for shopping with us!</p>
     <footer style="margin-top: 30px; text-align: center;">
       <p style="font-size: 12px; color: #777777;">&copy; ${new Date().getFullYear()} Foodie. All rights reserved.</p>
     </footer>
   </div>`;
 
    await sendEmail(email, subject, text, html);

    return res.status(201).json({ message: "Order added successfully", order });
  } catch (err) {
    console.error("Error adding order:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user route
router.post('/user/update', async (req, res) => {
  console.log("User Update Req Received");
  try {
    const { _id, fullName, email, mobile } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'User ID (_id) is required' });
    }

    const updatedUser = await USER.findByIdAndUpdate(
      _id,
      { fullName, email, mobile },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get user route
router.get("/user", async (req, res) => {
  console.log("Get User Request Received");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await USER.findOne({ _id: validateToken(token)._id }).populate('RecentOrders');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      RecentOrders: user.RecentOrders,
    });
  } catch (err) {
    console.error("Error validating token:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users route
router.get("/users", async (req, res) => {
  console.log("Get All Users Request Received");

  try {
    const users = await USER.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete user by email route
router.delete("/user", async (req, res) => {
  console.log("Delete User Request Received");

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find and delete the user by email
    const deletedUser = await USER.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all orders route
router.get("/orders", async (req, res) => {
  console.log("Get All Orders Request Received");

  try {
    const orders = await ORDER.find({}).populate("user");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
