import { ReadymedPage } from './app.po';

describe('readymed App', function() {
  let page: ReadymedPage;

  beforeEach(() => {
    page = new ReadymedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
