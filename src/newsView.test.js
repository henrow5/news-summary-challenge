/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NewsModel = require('./newsModel');
const NewsClient = require('./newsClient');
const NewsView = require('./newsView');
const exp = require('constants');

jest.mock('./newsModel');
jest.mock('./newsClient');

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('../index.html');
    NewsClient.mockClear();
    NewsModel.mockClear();
    mockModel = new NewsModel();
    mockClient = new NewsClient();
  });

  it('gets news data from model, creates an article element and displays it on the page', () => {
    const mockData = {
      response: {
        results: [
          {
            webTitle: 'test title',
            webUrl: 'test url',
            fields: { headline: 'test headline', thumbnail: 'thumbnail Url' },
          },
        ],
      },
    };

    mockModel.getNews.mockImplementation(() => mockData);

    const view = new NewsView(mockModel, mockClient);

    view.displayNews();

    expect(mockModel.getNews).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll('article').length).toBe(1);
  });

  it('gets news data from api with a given search query and passes it in model', () => {
    const mockData = {
      response: {
        results: [
          {
            webTitle: 'test title',
            webUrl: 'test url',
            fields: { headline: 'test headline', thumbnail: 'thumbnail Url' },
          },
        ],
      },
    };

    mockClient.loadNews.mockImplementation((searchQuery) => {
      expect(searchQuery).toEqual('test');

      return mockData;
    });

    mockModel.setNews.mockImplementation((data) => {
      expect(data).toEqual(mockData);
    });
    mockModel.getNews.mockImplementation(() => mockData);

    const view = new NewsView(mockModel, mockClient);
    const searchInputEl = document.querySelector('#search-input');
    searchInputEl.value = 'test';

    const searchBtnEl = document.querySelector('#search-btn');
    searchBtnEl.click();

    expect(mockClient.loadNews).toHaveBeenCalledTimes(1);
    // expect(mockModel.setNews).toHaveBeenCalledWith(mockData);
  });
});
