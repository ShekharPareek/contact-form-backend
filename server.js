// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const { Resend } = require("resend");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const resend = new Resend(process.env.RESEND_API_KEY);

// app.post("/contact", async (req, res) => {
//   try {
//     const { name, email, service, message } = req.body;

//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: "manvipareek2003@gmail.com", // Your email
//       replyTo: email,
//       subject: `New Contact Form: ${service}`,
//       html: `
//         <h2>New Contact Form Submission</h2>

//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Service:</strong> ${service}</p>
//         <p><strong>Message:</strong></p>

//         <p>${message}</p>
//       `
//     });

//     res.status(200).json({
//       success: true,
//       message: "Email sent successfully",
//       data
//     });

//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to send email"
//     });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// production code

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());


const apiKey = process.env.RESEND_API_KEY;

console.log("API KEY EXISTS:", !!apiKey);

const resend = new Resend(apiKey);
// const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Missing RESEND_API_KEY in environment"
      });
    }

    const resend = new Resend(apiKey);

    const { name, email, service, message } = req.body;

const data = await resend.emails.send({
  from: "Line to Line <noreply@linetolineart.com>",  // your verified domain
  to: "linetolineartllp@gmail.com",
  cc: ["pradeep@example.com", "manager@example.com"], // whoever should be copied
  replyTo: email,                                      // visitor's email
  subject: `New Contact Form: ${service}`,
  html: `
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `
});

    res.json({ success: true, data });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = app;
