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
 const { clientEmail, message, name, phone } = req.body;
 console.log(req.body);

  const mailOptions = {
    from: 'royalfm@gmail.com',
    to: clientEmail,
    subject: 'Message from royal fm client',
    html: `
      <h1>Royal Fm</h1><br />
      <h3>Sender details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${clientEmail}</li>
        <li>Phone: ${phone}</li>
      </ul><br />
      <p>${message}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({error: "failed to send please try again later"})
      console.error('Error:', error);
    } else {
      //console.log('client message sent:', info.response);
      res.status(200).json({message: "we will respond to the email you provided as soon as possible"})
    }
  });
});

export default router;