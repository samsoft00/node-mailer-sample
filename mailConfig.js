const nodemailer = require('nodemailer');

module.exports = {
  getMailTransport(){
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS // generated ethereal password
      }
    });
  },

  async sendSubMail(email){
    let transporter = this.getMailTransport();
    return await transporter.sendMail({
      from: '"Tribe Homes" <hello@tribe.homes>', // sender address
      to: email, // list of receivers
      subject: 'Tribe Homes', // Subject line
      text: 'Thanks for your subscription!', // plain text body
      html: '<b>Thanks for your subscription</b>' // html body
    });
  },

  async sendTribeHome(subMail){
    let transporter = this.getMailTransport();
    return await transporter.sendMail({
      from: '"Tribe Homes" <hello@tribe.homes>', // sender address
      to: `${process.env.EMAIL_USER}`, // list of receivers
      subject: 'New subscription: Tribe Landing page', // Subject line
      text: `Email: ${subMail} just Sign Up on Tribe Homes`, // plain text body
      html: `<b>Email: ${subMail} just Sign Up on Tribe Homes</b>` // html body
    });
  }

}
