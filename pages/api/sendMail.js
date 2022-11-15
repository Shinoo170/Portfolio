const nodemailer = require('nodemailer')

export default function handler(req, res) {
    try{
        const {name, email, message} = req.body
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
            user: process.env.email, 
            pass: process.env.pass
            }
        })
        let mailOptions = {
            from: process.env.email,
            to: 'patrapong17@gmail.com',
            subject: 'Contract from portfolio',
            html: `<div>Email from <b>${name}</b></div><div>email = ${email}</div><div>${message}</div>`
        }
        // transporter.sendMail(mailOptions, function (err, info) {
        //     if(err)
        //         res.status(500).json({ message: 'failure'})
        //     else
        //         res.status(200).json({ message: 'success' }) 
        // })
        res.status(200).json({ message: 'success' }) 
    } catch (err) {
        res.status(500).json({ message: 'failure'})
    }
    
}
  