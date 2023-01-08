class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.searchBtnEl = document.querySelector('#search-btn');
    this.searchInputEl = document.querySelector('#search-input');
    this.subtitleEl = document.querySelector('h2');

    this.searchBtnEl.addEventListener('click', () => {
      const searchQuery = this.searchInputEl.value;

      this.searchInputEl.value = '';
      this.search(searchQuery);

      this.subtitleEl.textContent =
        searchQuery !== ''
          ? `Search results for "${searchQuery}"`
          : 'Latest headlines';
    });

    this.searchInputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.searchBtnEl.click();
    });
  }

  async search(searchQuery) {
    const data = await this.client.loadNews(searchQuery);

    this.model.setNews(data);
    this.displayNews();
  }

  displayNews() {
    this.#clearArticles();

    const data = this.model.getNews();

    data.response.results.forEach((newsData) => {
      this.#createArticleEl(newsData);
    });
  }

  #createArticleEl(newsData) {
    const mainContainerEl = document.querySelector('#main-container');

    const html = `
    <article class="news_article">
      <a class="news_link" href=${newsData.webUrl}>
        <img class ="news_image" src="${newsData.fields.thumbnail}" alt="News article image" />
      </a>
      <a class="news_link" href=${newsData.webUrl}>
        <h3 class="news_title">${newsData.webTitle}</h3>
      </a>
    </article>
    `;

    mainContainerEl.insertAdjacentHTML('beforeend', html);
  }

  #clearArticles() {
    const articles = document.querySelectorAll('article');
    articles.forEach((article) => article.remove());
  }
}

module.exports = NewsView;
