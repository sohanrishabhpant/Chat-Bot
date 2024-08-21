import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = await validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    // body("name").notEmpty().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain 6 characters")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidator,
    // body("email").trim().isEmail().withMessage("Email is Required"),
    // body("password").trim().isLength({min:6}).withMessage("Password should contain 6 characters")
];
export const chatCompleteValidator = [
    body("message").notEmpty().withMessage("MessageisReqiured"),
    // body("email").trim().isEmail().withMessage("Email is Required"),
    // body("password").trim().isLength({min:6}).withMessage("Password should contain 6 characters")
];
//# sourceMappingURL=validator.js.map