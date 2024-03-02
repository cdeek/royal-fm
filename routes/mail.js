import express from 'express';
import nodemailer from 'nodemailer';
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

router.post('/client', (req, res) => {
 const { client_email, message, name, phone } = req.body;

  const mailOptions = {
    from: 'royalfm@gmail.com',
    to: client_email,
    subject: 'Message from royal fm client',
    html: `
      <h1>Royal Fm</h1><br />
      <h3>Sender details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${client_email}</li>
        <li>Phone: ${phone}</li>
      </ul><br />
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).send("failed to send please try again later")
      console.error('Error:', error);
    } else {
      //console.log('client message sent:', info.response);
      res.status(200).send("we will respond to the email you provided as soon as possible");
    }
  });
});

export default router;