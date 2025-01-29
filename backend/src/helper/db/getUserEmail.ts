import { prisma } from "../../prisma";

export default async function userGetEmail(email: string) {
  if (!email) return null;
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}
