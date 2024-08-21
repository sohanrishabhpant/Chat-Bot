import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the GoogleGenerativeAI class
import User from "../models/user.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        // Access your API key as an environment variable
        const apiKey = process.env.GEMINI_API_TOKEN;
        if (!apiKey) {
            return res.status(500).json({ message: "API key is missing" });
        }
        // Initialize GoogleGenerativeAI with the API key
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { message } = req.body;
        console.log(message);
        // Find user by ID
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        // Prepare the conversation history
        const chats = user.chats.map(({ role, content }) => `${role}: ${content}`).join("\n");
        const inputText = `${chats}\nuser: ${message}\n`;
        // Call the Google Generative AI API
        const result = await model.generateContent(inputText);
        const responseText = result.response.text(); // Ensure this returns the generated text
        console.log(responseText);
        if (!responseText) {
            return res.status(500).json({ message: "Failed to generate response from API" });
        }
        // Update user's chat history
        user.chats.push({ content: message, role: "user" });
        user.chats.push({ content: responseText, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error(error); // Use console.error for error logging
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        // throw new Error(""
        res.status(200).json({ message: "Error", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        // throw new Error(""
        res.status(200).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map