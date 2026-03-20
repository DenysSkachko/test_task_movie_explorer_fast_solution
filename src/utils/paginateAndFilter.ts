interface Item {
  title?: string;
  name?: string;
}

export const paginateAndFilter = <T extends Item>(
  items: T[],
  page: number,
  pageSize: number,
  query: string
) => {
  const normalizedQuery = query.toLowerCase();

  const filtered = normalizedQuery
    ? items.filter(
        (item) =>
          item.title?.toLowerCase().includes(normalizedQuery) ||
          item.name?.toLowerCase().includes(normalizedQuery)
      )
    : items;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
  };
};