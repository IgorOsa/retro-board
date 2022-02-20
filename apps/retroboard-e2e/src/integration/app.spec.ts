import {
  getHeaderTitle,
  getFooterCopyright,
  getFooterMadeInfo,
} from '../support/app.po';

describe('retroboard', () => {
  beforeEach(() => cy.visit('/'));

  it('should display app name in header', () => {
    getHeaderTitle().contains('RetroBoard');
  });

  it('should display copyright info', () => {
    const footerCopyrightLeft = getFooterCopyright();

    footerCopyrightLeft.contains('©');
    footerCopyrightLeft.contains('Ihor Osadchyi');
  });

  it('should display made location info', () => {
    const footerCopyrightRight = getFooterMadeInfo();

    footerCopyrightRight.contains('Made with ');
    footerCopyrightRight.contains(' in Kyiv');
    footerCopyrightRight.contains('.footer__heart', '♥');
  });
});
