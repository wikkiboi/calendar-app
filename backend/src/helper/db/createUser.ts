import { prisma } from "../../prisma";

export default async function createUser(
  name: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: { email, name, password },
  });
  return user;
}
