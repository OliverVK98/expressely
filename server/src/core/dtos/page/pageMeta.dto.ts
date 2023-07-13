import { PageOptionsDto } from './pageOptions.dto';

export interface PageMetaDtoParameters {
  pageOptions: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly page: number;

  readonly limit: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ pageOptions, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptions.page;
    this.limit = pageOptions.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
