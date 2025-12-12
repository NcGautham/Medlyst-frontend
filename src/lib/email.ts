import emailjs from '@emailjs/browser';

// =========================================================================
// INSTRUCTIONS FOR THE USER:
// 1. Go to https://www.emailjs.com/ and create a free account.
// 2. Add a new "Email Service" (e.g., Gmail). Copy the [Service ID].
// 3. Create an "Email Template". Copy the [Template ID].
//    - Use variables like {{name}}, {{doctor}}, {{date}}, {{time}} in your template.
// 4. Go to Account -> Public Options. Copy your [Public Key].
// 5. Replace the values below with your real keys.
// =========================================================================

const EMAILJS_SERVICE_ID = 'service_m2g3akq';
const EMAILJS_TEMPLATE_ID = 'template_5f0kbv4';
const EMAILJS_PUBLIC_KEY = 'xk3dfby6tXuhPQ0_D';

interface EmailData {
    patientName: string;
    patientEmail: string;
    doctorName: string;
    date: string;
    time: string;
    reason: string;
}

export const sendAppointmentEmail = async (data: EmailData) => {
    // Check if keys are still default (just in case)
    if (
        EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
        EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
    ) {
        console.warn(
            'EmailJS keys are missing! Email not sent. Check src/lib/email.ts'
        );
        return;
    }

    try {
        const templateParams = {
            to_email: data.patientEmail,
            to_name: data.patientName,
            doctor_name: data.doctorName,
            appointment_date: data.date,
            appointment_time: data.time,
            reason: data.reason,
            // You can add more variables here matching your template
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('Email sent successfully!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Failed to send email:', error);
        // We don't throw here to avoid breaking the UI flow if email fails
    }
};
