const extractIdFromSlug = (slug: string): string => {
  return slug.split('.')[0];
};

export default extractIdFromSlug;
