const extractIdFromSlug = (slug: string): number | null => {
  const id = Number(slug.split('.')[0]);
  return id || null;
};

export default extractIdFromSlug;
