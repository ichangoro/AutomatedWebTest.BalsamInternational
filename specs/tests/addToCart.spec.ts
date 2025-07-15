import { test } from '@playwright/test';
import { PageActions, PageAssertions, DataHelper } from '../../helpers/step-definition/common/libs';
import 'dotenv/config';
import mappings from '../pages/mappings';

test('Add to cart', async ({ page }) => {
    const actions = new PageActions(page);
    const assert = new PageAssertions(page);
    const data = new DataHelper(page);
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    let baseURL = process.env.BASE_URL || '' ;

    // Navigate and search for a product
    await actions.navigateTo(baseURL);
    await actions.fillInput(mappings.header.searchInput, mappings.header.searchInput.value, true);
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await actions.clickIfPresent(mappings.common.closeDialog);

    // Click the 3rd product link and validate details
    const name = await data.getText({name: mappings.result.productLink.name, selector: mappings.result.productLink.selector.replace('{n}', '3')});
    const price = await data.getText({name: mappings.result.price.name, selector: mappings.result.price.selector.replace('{n}', '3')});
    await actions.clickElement({name: mappings.result.productLink.name, selector: mappings.result.productLink.selector.replace('{n}', '3')});
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await actions.clickIfPresent(mappings.common.closeDialog);
    await assert.elementsHaveSameValue(mappings.details.productLabel, name ?? '', true);
    await actions.scrollToElement({name: mappings.details.productPrice.name, selector: mappings.details.productPrice.selector});
    await assert.elementsHaveSameValue(mappings.details.productPrice, price ?? '');

    // Selects random item in the product page
    await actions.clickElement({name: mappings.details.productHeight.name, selector: mappings.details.productHeight.selector.replace('{n}', randomNumber.toString())});
    await actions.clickElement({name: mappings.details.productLights.name, selector: mappings.details.productLights.selector.replace('{n}', randomNumber.toString())});
    const newPrice = await data.getText({name: mappings.details.productPrice.name, selector: mappings.details.productPrice.selector});

    // Add the product to the cart and validate
    await actions.clickElement(mappings.details.addToCartButton);
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await actions.clickIfPresent(mappings.common.closeDialog);
    await assert.elementsHaveSameValue(mappings.cart.priceDialog, newPrice ?? '');
    await actions.clickElement(mappings.cart.viewCartButton);
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await actions.wait(5); // added because sometimes the cart page takes time to load
    await actions.clickIfPresent(mappings.common.closeDialog);
    await actions.clickIfPresent(mappings.common.couponOff);
    await actions.clickIfPresent(mappings.common.noThanks);
    await actions.refreshPage();
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await assert.elementsHaveSameValue(mappings.cart.priceInPage, newPrice ?? '');
    await assert.elementsHaveSameValue(mappings.header.cartCount, '1');

    // Remove product from the cart and validate
    await actions.clickElement(mappings.cart.deleteButton);
    await actions.waitForElementToHidden(mappings.common.loadingImg);
    await assert.validateItemWasRemoved(name ?? '');
});