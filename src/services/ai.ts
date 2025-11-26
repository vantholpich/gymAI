import { GoogleGenerativeAI } from '@google/generative-ai';
import * as FileSystem from 'expo-file-system';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;


if (!API_KEY) {
    console.warn('Gemini API Key is missing! Check .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY || '');



import { Platform } from 'react-native';

export const analyzeExercise = async (videoUri: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        let videoData: string;

        if (Platform.OS === 'web') {
            // Web implementation: Fetch blob and convert to base64
            const response = await fetch(videoUri);
            const blob = await response.blob();
            videoData = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    // Remove data URL prefix (e.g., "data:video/mp4;base64,")
                    const base64 = result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } else {
            // Native implementation: Use FileSystem
            const fileInfo = await FileSystem.getInfoAsync(videoUri);
            if (!fileInfo.exists) throw new Error("File does not exist");
            videoData = await FileSystem.readAsStringAsync(videoUri, { encoding: 'base64' });
        }

        const prompt = "Analyze this gym exercise video. Identify the exercise, critique the form, and provide 3 specific tips for improvement. Format the output with Markdown.";

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: videoData,
                    mimeType: "video/mp4" // Assume mp4 for now
                }
            }
        ]);

        return result.response.text();

    } catch (error: any) {
        console.error("Error analyzing exercise:", error);
        if (error.message?.includes("413")) {
            return "Error: Video is too large. Please try a shorter clip (under 20MB for direct upload).";
        }
        return "Error analyzing video. Please ensure you have a valid API Key and the video is supported. Details: " + error.message;
    }
};
