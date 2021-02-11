import { ApolloServer } from 'apollo-server-micro';
import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod, makeSchema, objectType, stringArg, list, nonNull } from 'nexus';
import path from 'path';
import prisma from 'lib/prisma';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

const Book = objectType({
  name: 'Book',
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('slug');
    t.nullable.int('publishedIn');
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
    t.string('slug');
    t.list.field('books', {
      type: 'Book',
      resolve: ({ id }) => prisma.author.findUnique({ where: { id } }).books(),
    });
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
