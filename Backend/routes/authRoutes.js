import express from "express";
import { signup, login, Alluser} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/allusers", Alluser);

export default router;
