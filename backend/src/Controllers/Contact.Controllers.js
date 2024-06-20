import nodemailer from 'nodemailer';

import { asyncHandler } from '../Utils/asyncHandler.js';
import { apiError } from '../Utils/apiError.js';
import { apiResponse } from '../Utils/apiResponse.js';


const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
    port: 465,
    auth: {
        user: "theprofessorsergio8@gmail.com", // Your email address
        pass: "jdkimiwfwvhaumhm" // Your email password or app-specific password
    }
});

// Export sendMail as an async function wrapped with asyncHandler
export const sendMail = asyncHandler(async (req, res) => {
    const { email, subject, message } = req.body;
    // Optional: define HTML content if needed
    const html = `<p>${message}</p>`;

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
            html: html
        });

        if (!info) throw new apiError(400, "Email not sent");
        
        res.status(200).json(new apiResponse(200, info, "Email sent successfully"));
    } catch (error) {
        throw new apiError(500, `Error sending email: ${error.message}`);
    }
});
