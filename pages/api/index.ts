import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod, makeSchema, objectType, idArg, list, nonNull, nullable } from 'nexus';
import path from 'path';
import prisma from '../../lib/prisma';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const Book = objectType({
  name: 'Book',
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.nullable.int('publishedIn');
    t.nullable.string('description');
    t.string('title');
    t.list.field('authors', {
      type: 'Author',
      resolve: ({ id }) => prisma.book.findUnique({ where: { id } }).authors(),
    });
  },
});

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

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('book', {
      type: 'Book',
      args: { id: idArg() },
      resolve: (_, { id }) => {
        return prisma.book.findFirst({ where: { id: +id } });
      },
    });
    t.field('books', {
      type: nonNull(list('Book')),
      resolve: () => prisma.book.findMany(),
    });
    t.field('author', {
      type: 'Author',
      args: { id: idArg() },
      resolve: (_, { id }) => {
        return prisma.author.findFirst({ where: { id: +id } });
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
  types: [Query, GQLDate, Book, Author],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
});

export const config = { api: { bodyParser: false } };

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
});
