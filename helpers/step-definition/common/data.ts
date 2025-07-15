import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class DataHelper {
  constructor(private page: Page) { }

  // Taking note of current value of the element
  async getText(element: { name: string; selector: string }): Promise<string | null> {
    let text: string | null = null;
    await allure.step(`Get text from ${element.name}`, async () => {
      text = await this.page.textContent(element.selector);
      console.log(`Text from ${element.name}: ${text}`);
    });
    return text;
  }

}