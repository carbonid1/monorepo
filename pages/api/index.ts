import path from 'path';
import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { asNexusMethod, idArg, list, makeSchema, nonNull, objectType, stringArg } from 'nexus';
import { GraphQLDate } from 'graphql-iso-date';
import { getSession } from 'next-auth/client';
import prisma from '../../prisma';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.string('bio');
    t.string('imageUrl');
    t.nonNull.string('id');
    t.nonNull.string('fullName');
    t.nonNull.list.nonNull.field('books', {
      type: 'Book',
      resolve: ({ id }) => prisma.author.findUnique({ where: { id } }).books(),
    });
  },
});

const Book = objectType({
  name: 'Book',
  nonNullDefaults: { output: true },
  definition(t) {
    t.list.field('authors', {
      type: 'Author',
      resolve: ({ id }) => prisma.book.findUnique({ where: { id } }).authors(),
    });
    t.list.field('editions', {
      type: 'Edition',
      resolve: ({ id }) => prisma.book.findUnique({ where: { id } }).editions(),
    });
    t.string('id');
    t.string('publishedIn');
  },
});

const Edition = objectType({
  name: 'Edition',
  nonNullDefaults: { output: true },
  definition(t) {
    t.field('book', {
      type: 'Book',
      resolve: ({ id }) => prisma.edition.findUnique({ where: { id } }).book(),
    });
    t.nullable.string('description');
    t.string('id');
    t.nullable.string('lang');
    t.nullable.string('publishedIn');
    t.list.field('reviews', {
      type: 'Review',
      resolve: ({ id }) => prisma.edition.findUnique({ where: { id } }).reviews(),
    });
    t.string('title');
    t.nullable.string('cover');
  },
});

const Review = objectType({
  name: 'Review',
  nonNullDefaults: { output: true },
  definition(t) {
    t.string('id');
    t.string('createdAt');
    t.string('updatedAt');
    t.string('body');
    t.field('edition', {
      type: 'Edition',
      args: { id: idArg() },
      resolve: ({ id }) => prisma.review.findFirst({ where: { id } }).edition(),
    });
    t.nullable.string('lang');
  },
});

const User = objectType({
  name: 'User',
  nonNullDefaults: { output: true },
  definition(t) {
    t.string('id');
    t.string('createdAt');
    t.string('updatedAt');
    t.nullable.string('name');
    t.nullable.string('emailVerified');
    t.nullable.string('image');
    t.nullable.string('email');
  },
});

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('author', {
      type: 'Author',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.author.findFirst({ where: { id } }),
    });
    t.field('book', {
      type: 'Book',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.book.findFirst({ where: { id } }),
    });
    t.field('books', {
      type: nonNull(list(nonNull('Book'))),
      resolve: () => prisma.book.findMany(),
    });
    t.field('edition', {
      type: 'Edition',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.edition.findFirst({ where: { id } }),
    });
    t.field('review', {
      type: 'Review',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.review.findFirst({ where: { id } }),
    });
    t.field('user', {
      type: 'User',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.user.findUnique({ where: { id } }),
    });
    t.nullable.field('profile', {
      type: 'User',
      resolve: async (_, __, ctx) => {
        const session = await getSession(ctx);
        if (!session) return null;
        const sessionRecord = await prisma.session.findUnique({
          where: { accessToken: session.accessToken as string },
        });
        return prisma.user.findUnique({ where: { id: sessionRecord?.userId } });
      },
    });
    t.field('reviews', {
      type: nonNull(list(nonNull('Review'))),
      args: { bookId: idArg(), editionId: idArg(), lang: stringArg() },
      resolve: async (_, { bookId, editionId, lang }) => {
        return prisma.book
          .findFirst({
            where: { id: bookId },
            select: {
              editions: {
                select: { reviews: { where: { lang: lang ?? undefined } } },
                where: { id: editionId === null ? undefined : editionId },
              },
            },
          })
          .then(
            book =>
              book?.editions.reduce(
                (reviews: typeof edition.reviews, edition) => [...reviews, ...edition.reviews],
                [],
              ) || [],
          );
      },
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  nonNullDefaults: { input: true },
  definition(t) {
    t.nonNull.field('updateProfile', {
      type: 'User',
      args: {},
      resolve: async (_, __, ctx) => {
        const session = await getSession(ctx);
        if (!session) return new AuthenticationError('Unauthorized action');
        const sessionRecord = await prisma.session.findUnique({
          where: { accessToken: session.accessToken as string },
        });
        return prisma.user.update({ where: { id: sessionRecord?.userId }, data: {} });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, GQLDate, Author, Book, Edition, Review, User],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
});

export const config = { api: { bodyParser: false } };

export default new ApolloServer({
  schema,
  context: ctx => ctx,
}).createHandler({
  path: '/api',
});
