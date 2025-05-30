import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import path from 'path'
import { fileURLToPath } from "url";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// global variables
const currency = 'inr'

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Gateway initialization
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Generate Order Confirmation Email Template
const generateOrderConfirmationTemplate = (name) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="padding: 20px; text-align: center;">
                    <h1 style="color: #28A745; font-size: 24px;">Order Confirmed ✅</h1>
                    <p style="color: #555555; font-size: 18px;">Hello ${name},</p>
                    <p style="color: #333333; font-size: 16px; font-weight: bold;">🎉 Thank you for placing your order with us!</p>
                    <p style="color: #555555; font-size: 16px;">We have received your order and are processing it.</p>
                    <p style="color: #28A745; font-size: 18px;"><strong>Current Status:</strong> Order Placed ✨</p>
                    <p style="color: #555555; font-size: 14px; margin-top: 20px;">You will receive updates as we process and ship your order. ❤️</p>
                    <div style="margin-top: 20px;">
                        <a href="${process.env.FRONTEND_URL}/orders" style="background-color: #28A745; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">View Your Orders 📦</a>
                    </div>
                </div>
                <div style="background-color: #007bff; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="color: #ffffff; font-size: 14px; margin: 0;">© 2025 ALLIPO Chemicals. All rights reserved. 🌟</p>
                </div>
            </div>
        </div>
    `;
};


// Function to generate the PDF invoice
async function generateInvoice(orderDetails, logoPath) {
    try {
        // Validate logoPath
        if (!fs.existsSync(logoPath)) {
            throw new Error(`Logo file not found at path: ${logoPath}`);
        }

        // Create PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        // Embed logo image
        const logoImageBytes = fs.readFileSync(logoPath);
        const logoImage = await pdfDoc.embedPng(logoImageBytes);
        const logoWidth = 150;
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
        const logoX = (page.getWidth() - logoWidth) / 2;
        const logoY = page.getHeight() - logoHeight - 20;

        page.drawImage(logoImage, {
            x: logoX,
            y: logoY,
            width: logoWidth,
            height: logoHeight,
        });

        // Add company details
        const primaryColor = rgb(0, 0.2, 0.4);
        const textColor = rgb(0, 0, 0);
        let yOffset = logoY - 30;

        page.drawText("50 Years of Manufacturing Experience", {
            x: (page.getWidth() - 250) / 2,
            y: yOffset,
            size: 14,
            color: primaryColor,
        });

        const companyDetails = [
            "49, GIDC Estate, Makarpura, Vadodara-390 010.(India)",
            "Contact Details: +91 8128354038 / +91 8238998187",
            "Mail us At: allipochemicals@gmail.com / info@allipochemicals.com",
        ];

        yOffset -= 40;
        companyDetails.forEach((line) => {
            page.drawText(line, {
                x: 50,
                y: yOffset,
                size: 10,
                color: textColor,
            });
            yOffset -= 15;
        });

        // Add invoice details
        const fontSize = 12;
        const titleFontSize = 20;

        yOffset -= 40;
        page.drawText("Order Invoice", {
            x: 50,
            y: yOffset,
            size: titleFontSize,
            color: primaryColor,
        });

        yOffset -= 30;
        page.drawText("Billing Address:", {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: primaryColor,
        });
        yOffset -= 20;

        const addressLines = [
            orderDetails.address.firstName,
            orderDetails.address.street,
            `${orderDetails.address.city}, ${orderDetails.address.state}, ${orderDetails.address.zipCode}`,
            `Phone: ${orderDetails.address.phoneNumber}`,
            `Email: ${orderDetails.address.email}`,
        ];

        addressLines.forEach((line) => {
            page.drawText(line, {
                x: 50,
                y: yOffset,
                size: fontSize,
                color: textColor,
            });
            yOffset -= 20;
        });

        yOffset -= 40;
        page.drawText("Order Details:", {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: primaryColor,
        });
        yOffset -= 20;

        page.drawText(`Order ID: ${orderDetails._id}`, {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: textColor,
        });
        yOffset -= 20;

        page.drawText(`Date: ${formatDate(orderDetails.date)}`, {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: textColor,
        });
        yOffset -= 20;

        page.drawText(`Status: ${orderDetails.status}`, {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: textColor,
        });
        yOffset -= 20;

        page.drawText(`Payment Method: ${orderDetails.paymentMethod}`, {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: textColor,
        });
        yOffset -= 20;

        page.drawText("Items:", {
            x: 50,
            y: yOffset,
            size: fontSize,
            color: primaryColor,
        });
        yOffset -= 20;

        const headers = ["Product", "Grade", "Packaging", "Size", "Qty", "Price/kg", "Total"];
        const columnWidths = [150, 50, 70, 50, 30, 60, 60];
        let xOffset = 50;

        headers.forEach((header, index) => {
            page.drawText(header, {
                x: xOffset,
                y: yOffset,
                size: fontSize,
                color: primaryColor,
            });
            xOffset += columnWidths[index];
        });

        yOffset -= 20;
        xOffset = 50;

        orderDetails.items.forEach((item) => {
            const rowData = [
                item.productName,
                item.grade,
                item.packaging,
                item.size,
                item.quantity.toString(),
                `${item.pricePerKg.toFixed(2)}`,
                `${item.total.toFixed(2)}`,
            ];

            rowData.forEach((data, index) => {
                page.drawText(data, {
                    x: xOffset,
                    y: yOffset,
                    size: fontSize,
                    color: textColor,
                });
                xOffset += columnWidths[index];
            });

            yOffset -= 20;
            xOffset = 50;
        });

        yOffset -= 20;
        page.drawText(`Total Amount: Rs ${orderDetails.amount}`, {
            x: 50,
            y: yOffset,
            size: fontSize + 2,
            color: primaryColor,
        });

        // Save and return PDF bytes
        return await pdfDoc.save();
    } catch (error) {
        console.error("Error generating invoice:", error);
        throw error;
    }
}

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Validate required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create order data
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        // Save order to database
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Generate invoice
        const logoPath = path.resolve(__dirname, "assets", "logo.png");
        const pdfBytes = await generateInvoice(newOrder, logoPath);

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: orderData.address.email,
            subject: 'Order Confirmation',
            html: generateOrderConfirmationTemplate(newOrder.address.firstName),
            attachments: [
                {
                    filename: `invoice_${newOrder._id}.pdf`,
                    content: pdfBytes,
                    contentType: "application/pdf",
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        // Send success response
        return res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        // Validate required fields
        if (!userId || !razorpay_order_id) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Fetch order details from Razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        // Check if payment is successful
        if (orderInfo.status === 'paid') {
            // Update the order in the database
            const order = await orderModel.findByIdAndUpdate(
                orderInfo.receipt,
                { payment: true },
                { new: true } // Return the updated order
            );

            // Clear user's cart
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            // Generate invoice
            const logoPath = path.resolve(__dirname, "assets", "logo.png");
            const pdfBytes = await generateInvoice(order, logoPath);

            // Send confirmation email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: order.address.email,
                subject: 'Order Confirmation',
                html: generateOrderConfirmationTemplate(order.address.firstName),
                attachments: [
                    {
                        filename: `invoice_${order._id}.pdf`,
                        content: pdfBytes,
                        contentType: "application/pdf",
                    },
                ],
            };

            await transporter.sendMail(mailOptions);

            // Send success response
            return res.json({ success: true, message: "Payment Successful" });
        } else {
            // Payment not successful
            return res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



const generateEmailTemplateStatus = (status, orderId, orderAmount, name) => {
    const statusMessages = {
        'Processing': '📦 Your order is now being processed. We will update you once it is shipped.',
        'Shipped': '🚚 Your order has been shipped. You will receive it soon!',
        'Delivered': '🎉 Your order has been successfully delivered. Thank you for shopping with us!',
        'Cancelled': '❌ Unfortunately, your order has been cancelled. Please contact support if you have any questions.',
    };

    const message = statusMessages[status] || 'Your order status has been updated.';

    const statusColors = {
        'Processing': '#FFC107',
        'Shipped': '#007BFF',
        'Delivered': '#28A745',
        'Cancelled': '#DC3545',
    };

    const statusColor = statusColors[status] || '#333333';

    const supportUrl = `${process.env.FRONTEND_URL}/contact`;

    return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="padding: 20px; text-align: center;">
                    <h1 style="color: ${statusColor}; font-size: 24px;">Order Status Update 📦</h1>
                    <p style="color: #555555; font-size: 18px;">Hello ${name},</p>
                    <p style="color: #333333; font-size: 16px; font-weight: bold;">${message}</p>
                    <p style="color: #555555; font-size: 16px;"><strong>Order ID:</strong> ${orderId}</p>
                    <p style="color: #555555; font-size: 16px;"><strong>Order Amount:</strong> ₹${orderAmount.toFixed(2)}</p>
                    <p style="color: ${statusColor}; font-size: 18px;"><strong>Current Status:</strong> ${status} ✨</p>
                    <p style="color: #555555; font-size: 14px; margin-top: 20px;">Thank you for choosing us. If you have any questions, feel free to contact our support team. ❤️</p>
                    <div style="margin-top: 20px;">
                        <a href="${supportUrl}" style="background-color: ${statusColor}; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Contact Support 🛎️</a>
                    </div>
                </div>
                <div style="background-color: #007bff; text-align: center; padding: 10px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="color: #ffffff; font-size: 14px; margin: 0;">© 2025 ALLIPO Chemicals. All rights reserved. 🌟</p>
                </div>
            </div>
        </div>
    `;
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.address.email,
            subject: 'Order Status Update',
            html: generateEmailTemplateStatus(status, orderId, order.amount, order.address.firstName),
        };

        res.json({ success: true, message: 'Status Updated and Email Sent' });

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getOrderStats = async (req, res) => {
    try {
      // Calculate total orders, pending orders, completed orders, etc.
      const totalOrders = await orderModel.countDocuments();
      const pendingOrders = await orderModel.countDocuments({ status: 'Order Placed' });
      const processingOrders = await orderModel.countDocuments({ status: 'Processing' });
      const shippedOrders = await orderModel.countDocuments({ status: 'Shipped' });
      const deliveredOrders = await orderModel.countDocuments({ status: 'Delivered' });
      const cancelledOrders = await orderModel.countDocuments({ status: 'Cancelled' });
  
      // Calculate total revenue
      const totalRevenue = await orderModel.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
  
      // Generate monthly order trends
      const monthlyTrends = await orderModel.aggregate([
        {
          $group: {
            _id: { month: { $month: { $toDate: "$date" } }, year: { $year: { $toDate: "$date" } } },
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
  
      // Format monthly trends for frontend
      const formattedTrends = monthlyTrends.map((trend) => ({
        month: `${trend._id.year}-${String(trend._id.month).padStart(2, '0')}`,
        orders: trend.count,
        revenue: trend.totalAmount
      }));
  
      // Payment method distribution
      const paymentMethodDistribution = await orderModel.aggregate([
        {
          $group: {
            _id: "$paymentMethod", // Group by payment method
            count: { $sum: 1 } // Count orders per payment method
          }
        }
      ]);
  
      // Top products by quantity sold (in kgs)
    const topProductsByQuantity = await orderModel.aggregate([
        { $unwind: "$items" }, // Unwind the items array
        {
          $addFields: {
            numericSize: {
              $toInt: {
                $ifNull: [
                  { $arrayElemAt: [{ $split: ["$items.size", "kg"] }, 0] }, // Extract numeric part before "kg"
                  0 // Default to 0 if no numeric part is found
                ]
              }
            }
          }
        },
        {
          $group: {
            _id: "$items.productName", // Group by product name
            totalQuantity: {
              $sum: {
                $multiply: ["$items.quantity", "$numericSize"] // Multiply quantity by numeric size
              }
            }
          }
        },
        { $sort: { totalQuantity: -1 } }, // Sort by totalQuantity in descending order
        { $limit: 5 } // Limit to top 5 products
      ]);  
  
      // Send response
      res.json({
        success: true,
        stats: {
          totalOrders,
          pendingOrders,
          processingOrders,
          shippedOrders,
          deliveredOrders,
          cancelledOrders,
          totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        },
        trends: formattedTrends,
        paymentMethodDistribution,
        topProductsByQuantity,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

export { verifyRazorpay, placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, getOrderStats }