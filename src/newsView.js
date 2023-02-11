class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.searchBtnEl = document.querySelector('#search-btn');
    this.searchInputEl = document.querySelector('#search-input');
    this.infoBarEl = document.querySelector('#info-bar');

    this.searchBtnEl.addEventListener('click', () => {
      const searchQuery = this.searchInputEl.value;
      this.searchInputEl.value = '';
      this.search(searchQuery);

      this.infoBarEl.textContent =
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
    // const mainContainerEl = document.querySelector('#main-container');
    const cardContainerEl = document.querySelector('#card-container');
    // const html = `
    // <article class="news_article">
    //   <a class="news_link" href=${newsData.webUrl}>
    //     <img class ="news_image" src="${newsData.fields.thumbnail}" alt="News article image" />
    //   </a>
    //   <a class="news_link" href=${newsData.webUrl}>
    //     <h3 class="news_title">${newsData.webTitle}</h3>
    //   </a>
    // </article>
    // `;

    const html = `
    
    <div id="article-card" class="col">
    <a href="${newsData.webUrl}" class="text-decoration-none">
    <div class="card h-100 shadow-lg border">
    

      <img src="${newsData.fields.thumbnail}" class="card-img-top" alt="News article image">
      <div class="card-body bg-light rounded">
         <h5 class="card-title text-start text-dark lead">${newsData.webTitle}</h5>
       
      </div>
      

    </div>
    </a>
  </div>

    `;
    cardContainerEl.insertAdjacentHTML('beforeend', html);
  }

  #clearArticles() {
    const articles = document.querySelectorAll('#article-card');
    articles.forEach((article) => article.remove());
  }
}

module.exports = NewsView;
