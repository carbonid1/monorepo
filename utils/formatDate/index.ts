import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

const formatDate = (timestamp: string | undefined) => {
  if (!timestamp) return 'N/A';
  return format(fromUnixTime(+timestamp / 1000), 'MMMM do y');
};

export default formatDate;
