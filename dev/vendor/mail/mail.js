import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'cosminaelena606@yahoo.com',
      pass: 'lietome17'
    }
  });
  
  const mailOptions = {
    from: 'cosminaelena606@yahoo.com',
    to: 'stanclaudiu321@gmail.com' ,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',

  };
   
const sendMail = () => transporter.sendMail(mailOptions, function(error, info){
    console.log("Nu")
    if (error) {
      console.log("Da")
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

export default sendMail
