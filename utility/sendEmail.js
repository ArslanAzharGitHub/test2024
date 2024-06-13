import nodemailer from 'nodemailer';
import createError from './createError';
const sendEmail = async (res, { id, email }) => {

    try {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email, ///enter email from email will be send
                pass: process.env.pass, ///enter your email's password
            },
        });

        var mailOption = {
            from: "Land Investment",
            to: email,
            subject: "Reset Password",
            html: `${process.env.email_Template}`,
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent:${info.response}`);
            }
        });

        return {
            ALERT: `The Mail Has Sent to EMAIL: ${email}`
        }
    } catch (error) {
        throw createError(`Email sending error: ${error}`, 500);
    }
}

export default sendEmail;