import express from "express";
import { body } from "express-validator";

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



export default router
