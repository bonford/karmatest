import { KarmatestPage } from './app.po';

describe('karmatest App', function() {
  let page: KarmatestPage;

  beforeEach(() => {
    page = new KarmatestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
