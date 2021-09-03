import { PrismaClient } from '@prisma/client';
import { statuses } from './seeders/statuses';
import { users } from './seeders/users';
/* import { tasks } from './seeders/tasks'; */
import { hashPassword } from '../utils/hashPassword';

const prisma = new PrismaClient();

async function main() {
  for (const status of statuses) {
    await prisma.status.create({
      data: status,
    });
  }

  for (const user of users) {
    const password = await hashPassword('secret');
    await prisma.user.create({
      data: { ...user, password },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
