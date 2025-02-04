import prisma from "../../../prisma";

interface InputFields {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export default async function createEvent(info: InputFields, userId: string) {
  const event = await prisma.event.create({
    data: {
      ...info,
      userId,
    },
  });

  return event;
}
