import resend from "../config/resend";
import dotenv from 'dotenv';

dotenv.config();

export const sendResetPasswordEmail = async (toEmail, firstName, token) => {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'KyroCode <kyrocode@auth.kshitijnangare.com>',
        to: [toEmail],
        template: {
            id: process.env.RESEND_PASSWORD_RESET_TEMPLATE,
            variables: {
                first_name: firstName,
                reset_password_url: resetPasswordUrl,
            },
        }
    });

    if(error){
        console.error('❌ Resend API Error:', error);
        throw new Error("Email Delivery failed");
    }

    return data
};