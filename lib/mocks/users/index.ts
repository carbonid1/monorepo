import type gg from 'lib/generated';
import user1Src from './user_1.jpeg';

type UserName = 'ivan';

const usersMock: Record<UserName, gg.User> = {
  ivan: {
    id: '1',
    email: 'ivan@test.com',
    name: 'Ivan',
    createdAt: '',
    updatedAt: '',
    image: user1Src.toString(),
  },
};

export default usersMock;
