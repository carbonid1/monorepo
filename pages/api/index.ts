import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod, makeSchema, objectType, idArg, list, nonNull, stringArg } from 'nexus';
import path from 'path';
import prisma from '../../lib/prisma';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const Author = objectType({
  name: 'Author',
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('fullName');
    t.list.field('books', {
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
    t.int('id');
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
    t.int('id');
    t.nullable.string('lang');
    t.string('publishedIn');
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
    t.int('id');
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

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('author', {
      type: 'Author',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.author.findFirst({ where: { id: +id } }),
    });
    t.field('book', {
      type: 'Book',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.book.findFirst({ where: { id: +id } }),
    });
    t.field('books', {
      type: nonNull(list('Book')),
      resolve: () => prisma.book.findMany(),
    });
    t.field('edition', {
      type: 'Edition',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.edition.findFirst({ where: { id: +id } }),
    });
    t.field('review', {
      type: 'Review',
      args: { id: idArg() },
      resolve: (_, { id }) => prisma.review.findFirst({ where: { id: +id } }),
    });
    t.field('reviews', {
      type: nonNull(list('Review')),
      args: { bookId: idArg(), editionId: idArg(), lang: stringArg() },
      resolve: async (_, { bookId, editionId, lang }) => {
        return prisma.book
          .findFirst({
            where: { id: +bookId },
            select: {
              editions: {
                select: { reviews: { where: { lang: lang ?? undefined } } },
                where: { id: editionId === null ? undefined : +editionId },
              },
            },
          })
          .then(
            book =>
              book?.editions.reduce(
                (reviews: typeof edition.reviews, edition) => [...reviews, ...edition.reviews],
                []
              ) || []
          );
      },
    });
  },
});

// const Mutation = objectType({
//   name: 'Mutation',
//   nonNullDefaults: { input: true },
//   definition(t) {},
// });

export const schema = makeSchema({
  types: [Query, GQLDate, Author, Book, Edition, Review],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
});

export const config = { api: { bodyParser: false } };

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
});
