import { Role } from "@prisma/client";
import { createUser } from "@/services/userService";

async function main() {
  try {
    const admin = await createUser({
      name: "Garcia",
      email: "garcia.admin@soundbase.com",
      password: "admin123",
      role: Role.ADMIN,
    });

    console.log("Admin user created", admin.email);
  } catch (error) {
    console.log("Admin user already exists or could not be created", error);
  }
}
main();
