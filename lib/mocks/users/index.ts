import type { User } from 'lib/generated/graphql';
import user1Src from './user_1.jpeg';

type UserName = 'ivan';

const usersMock: Record<UserName, User> = {
  ivan: {
    id: 1,
    email: 'ivan@test.com',
    createdAt: '',
    updatedAt: '',
    image: user1Src.toString(),
  },
};

export default usersMock;
