import { z } from "zod";

export const signupSchema = z
    .strictObject({
        email: z.email("Invalid email address."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)."
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export const signinSchema = z.strictObject({
    email: z.email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
