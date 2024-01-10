class PaginationEntry<T> {
  page_size: number;
  page: number;
  total_pages: number;
  count: number;
  links: ILinks;
  results: T[];

  constructor(page_size: number, page: number, total_pages: number, count: number, links: ILinks, results: T[]) {
    this.page_size = page_size;
    this.page = page;
    this.count = count;
    this.links = links;
    this.total_pages = total_pages;
    this.results = results;
  }
}

interface ILinks {
  next: null | string;
  previous: null | string;
}

export const EMPTY_PAGINATION_ENTRY = new PaginationEntry(0, 0, 0, 0, { next: null, previous: null }, []);

export default PaginationEntry;
