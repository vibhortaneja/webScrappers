import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('https://localhost:4200');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
