const { RESTDataSource } = require('apollo-datasource-rest');

class PromobitAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost/';
  }

  async getOffers() {
    return this.get(`offer`);
  }

  async getUser(id) {
    return this.get(`user/${id}`);
  }

  async getStore(domain) {
    return this.get(`store/${domain}`);
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
};

module.exports = PromobitAPI;