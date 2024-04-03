import BaseRepository from './BaseRepository';

type GetPage = {
  page: number,
  perPage: number,
  query?: any
  sort: any
  aggregate?: any
}

export default class RepositroyWithPagination extends BaseRepository {
  async getPage({
    page,
    perPage,
    query,
    sort,
    aggregate,
  }: GetPage) {
    if (aggregate) {
      const results = await this.model.aggregate(aggregate).sort(sort).limit(perPage).skip((page - 1) * perPage);
      return {
        data: this.getFilteredData(results),
        page,
        perPage,
      };
    } else {
      const results = await this.model.find(query).sort(sort).limit(perPage).skip((page - 1) * perPage);
      return {
        data: this.getFilteredData(results),
        page,
        perPage,
      };
    }
  }
}
