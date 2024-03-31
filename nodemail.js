const nodemailer = require("nodemailer");

function generateSixDigitRandom() {
  // Generate a random number between 100,000 (inclusive) and 999,999 (exclusive)
  return Math.floor(100000 + Math.random() * 900000);
}
let otp = generateSixDigitRandom();
console.log(otp);

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Your SMTP host      "smtp.mail.outlook.com"
  port: 587, // Your SMTP port
  //encryption: STARTTLS,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "njcnjc70@gmail.com", // Your email address
    pass: "wonx royk assq owst", // Your email password
  },
});

// Setup email data with unicode symbols
async function main(mailid) {
  const info = await transporter.sendMail({
    from: '"Admin AuctionBidding" <njcnjc70@gmail.com>', // sender address
    to: mailid, // list of receivers
    subject: "OTP for resetting the password ✔", // Subject line
    text: "Hello", // plain text body
    html:
      "<p>Hello, Your OTP is:<strong>" + otp + "</strong> <br/>Thank you</p>", // html body
    // attachments: [
    //   {
    //     filename: "file name",
    //     path: path.join(__dirname, "filename"),
    //     contentType: "application/pdf", // or image/jpg
    //   },
    // ],
  });
  console.log("Message sent: %s", info.messageId);
  otp;
}

// Send mail with defined transport object
// main(mailid).catch(console.error);
module.exports = { main, otp };
