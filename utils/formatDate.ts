import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

const formatDate = (timestamp: string) => {
  return format(fromUnixTime(+timestamp / 1000), 'MMMM do y');
};

export default formatDate;
