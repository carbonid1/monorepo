import faker from 'faker';
import type gg from 'lib/generated';

type UserName = 'full' | 'noImage';

faker.seed(1);

const usersMock: Record<UserName, gg.User> = {
  full: {
    id: faker.datatype.uuid(),
    email: faker.internet.email('Ivan'),
    name: faker.name.findName('Ivan'),
    createdAt: faker.date.past(2).getTime().toString(),
    updatedAt: faker.date.recent(13).getTime().toString(),
    image: faker.image.avatar(),
  },
  noImage: {
    id: faker.datatype.uuid(),
    email: faker.internet.email('John'),
    name: faker.name.findName('John'),
    createdAt: faker.date.past(5).getTime().toString(),
    updatedAt: faker.date.recent(33).getTime().toString(),
    image: null,
  },
};

export default usersMock;
