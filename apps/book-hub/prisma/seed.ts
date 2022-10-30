import { PrismaClient } from '@prisma/client'
import { authors, books } from './data'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.user.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.verificationToken.deleteMany()
    await prisma.author.deleteMany()
    await prisma.book.deleteMany()
    await prisma.author.createMany({ data: authors })
    await prisma.book.createMany({ data: books })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
