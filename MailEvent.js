const EventEmitter      = require('events');
let mailer = require('./mailConfig');

//Fetch HTML
// var htmlstream = fs.createReadStream('mail/welcome_mail.html');

class MailEvent extends EventEmitter{
    constructor(){
        super();
        this.on('SEND_WELCOME_MAIL', this.sendMail);
    }
    async sendMail(data){
      await mailer.sendSubMail(data);
      // await mailer.sendTribeHome(data);
    };
}

module.exports = MailEvent;
