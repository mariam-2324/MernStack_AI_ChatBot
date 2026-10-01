import express from 'express';
const userRouter = express.Router();
import { userPrompt } from '../ControllersUserBot/userController.js';


userRouter.post("/userRout", userPrompt)
// userRouter.route('/').post(userPromptController.userPrompt)

export default userRouter;