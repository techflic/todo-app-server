
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'iamtest96@gmail.com',
        pass: '1amTesting',
    },
});

module.exports = {
    send: (userDetails, notificationType) => { 
        const mailOptions = {
            from: 'todoapp@company.in',
            to: userDetails.savedUser.email,
            subject: 'Registration Successful',
            html: `<p>Hello <b>${userDetails.savedUser.name}</b>.\n\n This email is to notify you that you have successfully registered to <b>Todo-Dashboard</b>.`
        };
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log(`Message sent: ${info.response}`);
        })
    }
}


