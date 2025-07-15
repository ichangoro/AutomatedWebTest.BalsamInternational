import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export class PageActions {
  constructor(private page: Page) { }

  // Navigates to a URL
  async navigateTo(url: string) {
    await allure.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  // Clicks an element
  async clickElement(element: { name: string; selector: string }) {
    await allure.step(`Click on ${element.name}`, async () => {
      await this.page.click(element.selector);
    });
  }

  // Fills an input field with a value
  async fillInput(element: { name: string; selector: string }, value: string, pressEnter: boolean = false) {
    await allure.step(`Enter value "${value}" into ${element.name}`, async () => {
      await this.page.fill(element.selector, value);
      if (pressEnter) {
        await this.page.press(element.selector, 'Enter');
      }
    });

  }

  // Waits for a number of seconds
  async wait(seconds: number) {
    await allure.step(`Wait for ${seconds} second(s)`, async () => {
      await this.page.waitForTimeout(seconds * 1000);
    });
  }

  // Waits for an element to be hidden
  async waitForElementToHidden(element: { name: string; selector: string }) {
    await allure.step(`Wait for ${element.name} to be hidden`, async () => {
      const el = await this.page.waitForSelector(element.selector, { state: 'hidden' });
      if (el) {
        console.log(`Element ${element.name} (${element.selector}) is now hidden`);
      }
    });
  }

  async scrollToElement(element: { name: string; selector: string }) {
    await allure.step(`Scroll to ${element.name}`, async () => {
      const el = await this.page.locator(element.selector).elementHandle();
      if (el) {
        await el.scrollIntoViewIfNeeded();
      }
      await this.page.waitForTimeout(500); // wait for the scroll to complete
    });
  }
}