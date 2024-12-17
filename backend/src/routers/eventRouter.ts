import { router, publicProcedure } from "../trpc";
import { prisma } from "../prisma";
import { eventSchema } from "../schemas/event";
import { z } from "zod";

export const eventRouter = router({
  createEvent: publicProcedure
    .input(eventSchema)
    .mutation(async ({ input }) => {
      const { title, description, startDate, endDate, userId } = input;
      return prisma.event.create({
        data: {
          title,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          user: {
            connect: { id: userId },
          },
        },
      });
    }),

  getEventsByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return prisma.event.findMany({
        where: { userId: input.userId },
      });
    }),
});
