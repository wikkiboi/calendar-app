import prisma from "../../prisma";

interface UpdateInfo {
  email?: string;
  name?: string;
  password?: string;
  image?: string;
  bio?: string;
}

export default async function updateUserDetails(
  username: string,
  info: UpdateInfo
) {
  if (!username) return null;
  const user = await prisma.user.update({ where: { username }, data: info });
}
