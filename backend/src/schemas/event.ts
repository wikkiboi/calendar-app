import z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  userId: z.string(),
});
