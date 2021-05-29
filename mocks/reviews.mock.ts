import type { IEdition, IReview } from 'types/interfaces';
import getTime from 'date-fns/getTime';

type TReviews = 'rangeEng1' | 'rangeRu1' | 'rangeRu2';
type TReviewsMock = Record<TReviews, IReview>;

const reviewsMock: TReviewsMock = {
  rangeEng1: {
    id: 1,
    body: `This book looks at how an emphasis on specialization can actually hamper our ability to really excel at something. It aligns with what I try to do when I am coaching, in my stories, and what we’re doing with Mamba Sports Academy—create all-around athletes who can think critically and make assessments in real time to enhance their play rather than rely only on a narrow set of skills.`,
    lang: 'en',
    edition: {} as IEdition,
    createdAt: getTime(new Date('2021-02-11')).toString(),
  },
  rangeRu1: {
    id: 2,
    lang: 'ru',
    createdAt: getTime(new Date('2021-02-24')).toString(),
    edition: {} as IEdition,
    body:
      'Отличная книжка (и не только про/для консультантов, хотя BCG & McK по разу упоминаются). Мне больше всего понравилось про "поздний старт" в новой деятельности, почему он может быть успешным и вообще про смену карьеры, и глава с развенчанием мифа про grit и persistence (не Angela Duckworth единой, в общем). Находящиеся в процессе смены вида деятельности (aka career changers) могут цитировать куски на собеседованиях, если вдруг кто усомнится в пользе их прошлого опыта ("no experience is wasted"). И родителям тоже полезно (Рихтер начал брать нормальные уроки музыки в 22 и вполне себе преуспел, можно не мучить ребенка сольфеджио и скрипкой в 8).',
  },
  rangeRu2: {
    id: 3,
    lang: 'en',
    createdAt: getTime(new Date('2021-03-20')).toString(),
    edition: {} as IEdition,
    body:
      "Do I think it's a five-star book? It's very hard for me to say, as I wrote the thing. By the time I'm done working on a book, I have such a strong insider view of the project that it's difficult to be objective. I will say this: I worked extremely hard on it, and as a writer, researcher, and reader, I found it to be much more interesting than my first book. Most readers enjoyed that first book--at least according to Goodreads ratings--so I hope most readers will (as I have) enjoy this one even more.",
  },
};

export default reviewsMock;
