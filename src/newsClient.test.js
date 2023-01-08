require('jest-fetch-mock').enableMocks();
const NewsClient = require('./newsClient');

describe('NewsClient class', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls fetch and loads news data', (done) => {
    const client = new NewsClient();
    const data = {
      results: [
        {
          webTitle:
            'Management of five firms linked to Pegasus maker NSO is moved to London',
        },
      ],
    };

    fetch.mockResponseOnce(JSON.stringify(data));

    client.loadNews('london').then((data) => {
      expect(data.results[0].webTitle).toEqual(
        'Management of five firms linked to Pegasus maker NSO is moved to London'
      );
      done();
    });
  });
});
