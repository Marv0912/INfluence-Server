var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send', async (req, res) => {
    const { to, from, subject, text, html } = req.body;

    const msg = {
        to, // Recipient email
        from, // Sender email
        subject, // Email subject
        text, // Email text
        html, // Email HTML content
    };

    try {
        await sgMail.send(msg);
        res.send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
});



module.exports = router;
