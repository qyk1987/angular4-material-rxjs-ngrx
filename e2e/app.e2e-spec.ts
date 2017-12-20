import { FeiYangstudentmgrPage } from './app.po';

describe('fei-yangstudentmgr App', () => {
  let page: FeiYangstudentmgrPage;

  beforeEach(() => {
    page = new FeiYangstudentmgrPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
