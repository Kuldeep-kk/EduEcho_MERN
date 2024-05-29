import {NextResponse} from "next/server";
import nodemailer from 'nodemailer'
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import * as handlebars from "handlebars";
import {welcomeTemplate} from "../../mailServices/welcome";


const email=process.env.EMAIL;
const pass=process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: email,
        pass: pass,
    },
});

export  const POST=async (request)=>{
    const {to,subject,text}=await request.json();

    console.log(to,subject,text);

    try {

        const htmBody =await compileMailTemplate(text);


        const info = await transporter.sendMail({
            from: `"EduEcho" <${email}>`,
            to,
            subject,
            html: htmBody,
        });

        console.log("Message sent: %s", info.messageId);
        return NextResponse.json(to);
    }

    catch (e) {
        console.log(e);
        return NextResponse.json(e);

    }
}

export async function compileMailTemplate(otp){
    const template =handlebars.compile(welcomeTemplate);
    const htmlBody =template({
        otp:otp,
    });
    return htmlBody;
}
