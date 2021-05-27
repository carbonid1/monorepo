import type { IBook } from 'types/interfaces';
import authorsMock from './authors.mock';
import editionsMock from './editions.mock';

type TBooks = 'range';

const booksMock: Record<TBooks, (mock: boolean) => IBook> = {
  range: mock => ({
    id: 1,
    publishedIn: 'May 28th 2019',
    authors: mock ? [] : [authorsMock.EpsteinD],
    editions: mock ? [] : [editionsMock.rangeEng],
  }),
};

export default booksMock;
