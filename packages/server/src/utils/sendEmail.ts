import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string): Promise<string | false> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ufm6bhtdq56yac66@ethereal.email", // generated ethereal user
      pass: "1GFYkkUDDZS25He86f", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"keeply" <keeply@example.com>', // sender address
    to,
    subject: "Change password", // Subject line
    html,
  });

  return nodemailer.getTestMessageUrl(info);
}
