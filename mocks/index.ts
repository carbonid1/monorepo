import authorsMock from './authors.mock';
import booksMock from './books.mock';
import editionsMock from './editions.mock';
import reviewsMock from './reviews.mock';

const mocks = {
  // authors: authorsMock(),
  // books: booksMock(),
  // editions: editionsMock(),
  // reviews: reviewsMock(),
};

const y = { z: x?.z };
const x = { z: y?.z };
console.log('x, y =======>>>>>>>', x, y);

export default mocks;
