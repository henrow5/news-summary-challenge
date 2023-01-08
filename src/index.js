const NewsClient = require('./newsClient');
const NewsModel = require('./newsModel');
const NewsView = require('./newsView');

console.log('The news app is running');

const model = new NewsModel();
const client = new NewsClient();
const view = new NewsView(model, client);

view.search();
