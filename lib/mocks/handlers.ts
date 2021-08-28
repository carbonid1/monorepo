import { rest } from 'msw';
import usersMock from './users';

export const handlers = [
  rest.get(`${window.origin}/api/auth/session`, (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          name: usersMock.ivan.name,
          image: usersMock.ivan.image,
          email: usersMock.ivan.email,
        },
      }),
    );
  }),
];
