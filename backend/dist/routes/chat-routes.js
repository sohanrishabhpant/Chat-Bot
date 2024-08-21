import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompleteValidator } from '../utils/validator.js';
import { generateChatCompletion, sendChatsToUser, deleteChats } from '../controllers/chat-controller.js';
const chatRouter = Router();
chatRouter.post("/new", chatCompleteValidator, verifyToken, generateChatCompletion);
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
//# sourceMappingURL=chat-routes.js.map