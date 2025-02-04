import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: "Username or Email is required" })
    .refine((val) => /\S+@\S+\.\S+/.test(val) || /^[a-zA-Z0-9_]+$/.test(val), {
      message: "Must be a valid email or username",
    }),
  password: z.string().min(6),
});
