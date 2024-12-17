import bcrypt from "bcrypt";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../prisma";
import { registerSchema, loginSchema } from "../schemas/user";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/jwt";
import { blacklistToken } from "../helper/blacklist";

export const userRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { email, name, password } = input;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);

      return { message: "User registered successfully!", token };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password.");
    }

    const token = generateToken(user.id);

    return { message: "Login successful!", token };
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    const token = ctx?.req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token is required.");
    }

    const decoded = jwt.decode(token) as { exp: number };
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token.");
    }

    // Remaining expiration time
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    await blacklistToken(token, expiresIn);

    return { message: "Logout successful!" };
  }),

  getUser: publicProcedure.query(async ({ ctx }) => {
    const userContext = await ctx.user;
    if (!userContext) {
      throw new Error("Unauthorized");
    }

    console.log(userContext);
    const user = await prisma.user.findUnique({
      where: { id: userContext.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),
});
