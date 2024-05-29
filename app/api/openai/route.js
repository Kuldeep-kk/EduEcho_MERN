import OpenAI from 'openai';
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (request) => {
    console.log("Entering in api");

    const prompt  = await request.json();

    console.log(prompt);

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Rephrase this: ${prompt}` }],
            model: 'gpt-3.5-turbo',
        });

        const paraphrase = response.choices[0].message.content;
        console.log(paraphrase);
        return NextResponse.json({
            message: "paraphrase success !!!",
            success: true,
            text: paraphrase
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message: e.message,
            success: false,
        }, {
            status: 500
        });
    }
};
