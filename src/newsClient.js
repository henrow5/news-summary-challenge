const apiKey = require('../apiKey');

class NewsClient {
  async loadNews(searchQuery = '') {
    const apiUrl = `https://content.guardianapis.com/search?q=${searchQuery}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = response.json();

    return data;
  }
}

module.exports = NewsClient;
