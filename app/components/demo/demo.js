'use client';
import { useState } from 'react';
import {openaiFn} from "@/app/services/openaiService";

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            const res=await openaiFn(JSON.stringify(prompt));

            if (res.success) {
                console.log(res.text);
                setResponse(res.text);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            setResponse('Failed to fetch response.');
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
            className="p-2 border border-gray-300 rounded text-gray-700"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Prompt"}
                </button>
            </form>
            {response && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}