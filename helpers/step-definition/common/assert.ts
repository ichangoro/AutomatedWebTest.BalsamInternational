import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

export class PageAssertions {
    constructor(private page: Page) { }

    setPage(page: Page) {
        this.page = page;
    }

    async elementsHaveSameValue(element: { name: string; selector: string }, expected: string, label: boolean = false) {
        await allure.step(`Validate element value for selector: ${element.name}`, async () => {
            function cleanLabel(text: string): string {
                return text.replace(/[^\w\s]/gi, '').trim();
            }

            const text1 = await this.page.textContent(element.selector);
            const cleanedText1 = cleanLabel(text1 ?? '');
            let cleanedText2 = cleanLabel(expected);
            if (label) {
                cleanedText2 = cleanedText2.includes('Tree') ? `${cleanedText2}s` : `${cleanedText2} Trees`;
            }
            console.log(`[ASSERT] Comparing "${cleanedText1}" (actual) with "${cleanedText2}" (expected) for ${element.name}`);
            if (cleanedText1 !== cleanedText2) {
                console.error(`[ASSERT][FAIL] ${element.name}: "${cleanedText1}" !== "${cleanedText2}"`);
                throw new Error(`Failed: Current value: "${cleanedText1}" does not match the expected value: "${cleanedText2}"`);
            } else {
                console.log(`[ASSERT][PASS] ${element.name}: "${cleanedText1}" === "${cleanedText2}"`);
            }
        });
    }

    async validateItemWasRemoved(name: string) {
        function cleanLabel(text: string): string {
            return text.replace(/[^\w\s]/gi, '').trim();
        }
        const cleanedText1 = cleanLabel(name ?? '');
        const selector = `//div[contains(@class,'cartProductDetailItem_product-name-wrapper')]/a/span[contains(normalize-space(text()),"${cleanedText1} has been removed")]`;
        try {
            await expect(this.page.locator(selector)).toBeVisible();
            console.log(`[ASSERT][PASS] "${name}" has been removed from the cart.`);
        } catch {
            console.error(`[ASSERT][FAIL] "${name}" has NOT been removed from the cart.`);
            throw new Error(`Failed: "${name} has not been removed from the cart."`);
        }
    }
}