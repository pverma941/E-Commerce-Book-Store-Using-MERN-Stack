const nodemailer = require('nodemailer');

const sendEmail = async (options)=>{
    const transport = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:456,
        service:"email",
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to : options.email,
        subject:options.subject,
        text:ontions.message
    }
    await transport.sendMail(mailOptions)
}
module.exports=sendEmail