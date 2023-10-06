import { Router } from "express"
import upload from "../utils/multer";
import { postLogin, postLogout, postSignup, postFileSelect, postModifyFile } from "../controllers/userContoller";
import { verifyToken } from "../middleware/auth";

const userRouter = Router()

userRouter.post('/login', postLogin)
userRouter.post('/signup', postSignup)
userRouter.post('/logout', postLogout)
userRouter.post('/file-select', verifyToken, upload.single('file'), postFileSelect)
userRouter.post('/modify-pdf', verifyToken, upload.single('file'), postModifyFile)


export default userRouter 