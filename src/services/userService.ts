import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export async function createUser(data: CreateUserInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });
  return createdUser;
}
