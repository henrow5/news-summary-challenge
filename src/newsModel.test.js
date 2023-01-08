const NewsModel = require('./newsModel');

describe('NewsModel', () => {
  it('returns an empty list of news articles', () => {
    const model = new NewsModel();

    expect(model.getNews()).toEqual([]);
  });

  it('sets the news to the list', () => {
    const model = new NewsModel();

    model.setNews([
      {
        webTitle: 'test title',
        webUrl: 'https://www.testurl.com',
        fields: {
          headline: 'test headline',
          thumbnail: 'https://www.testurl.com/thumbnail.jpg',
        },
      },
    ]);

    expect(model.getNews()).toEqual([
      {
        webTitle: 'test title',
        webUrl: 'https://www.testurl.com',
        fields: {
          headline: 'test headline',
          thumbnail: 'https://www.testurl.com/thumbnail.jpg',
        },
      },
    ]);
  });
});
