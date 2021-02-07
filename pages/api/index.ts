import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod, makeSchema, objectType, intArg, stringArg, list, nonNull } from 'nexus';
import path from 'path';
import prisma from '../../lib/prisma';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const Book = objectType({
  name: 'Book',
  nonNullDefaults: { output: true },
  definition(t) {
    t.string('author');
    t.int('id');
    t.string('slug');
    t.nullable.int('publishedIn');
    t.string('title');
  },
});

const Query = objectType({
  name: 'Query',
  nonNullDefaults: { input: true },
  definition(t) {
    t.field('book', {
      type: 'Book',
      args: { slug: stringArg() },
      resolve: (_, { slug }) => {
        return prisma.book.findFirst({ where: { slug } });
      },
    });
    t.field('books', {
      type: nonNull(list('Book')),
      resolve: () => prisma.book.findMany(),
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  nonNullDefaults: { input: true },
  definition(t) {
    t.nullable.field('deleteBook', {
      type: 'Book',
      args: { bookId: intArg() },
      resolve: (_, { bookId }) => prisma.book.delete({ where: { id: Number(bookId) } }),
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, GQLDate, Book],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
});

export const config = { api: { bodyParser: false } };

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
});
