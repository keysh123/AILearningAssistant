import express from "express";
import { body } from "express-validator";
import { register,login,getProfile,updateProfile,changePassword } from "../controllers/authController";
import protect from "../middleware/auth";
const router = express.Router();

const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be atleast of 3 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide proper valid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be of atleast 6 character"),
];
const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide proper valid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be of atleast 6 character"),
];
router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)

router.get('/profile',protect,getProfile)
router.put('/profile',protect,updateProfile)
router.post('/change-password',protect,changePassword)

export default router
