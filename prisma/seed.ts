// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { projectTypes } from './data/projectType'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      role: 'ADMIN',
    },
  })

  await prisma.projectType.createMany({
    data: projectTypes,
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })