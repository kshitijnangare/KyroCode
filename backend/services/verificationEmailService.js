import resend from "../config/resend";
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = async (toEmail, firstName, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'KyroCode <kyrocode@auth.kshitijnangare.com>',
        to: [toEmail],
        template: {
            id: process.env.RESEND_EMAIL_VERIFICATION_TEMPLATE,
            variables: {
                first_name: firstName,
                verification_url: verificationUrl,
            },
        },
    });

    if (error) {
        console.error('❌ Resend API Error:', error);
        throw new Error('Email delivery failed.');
    }

    return data;
};