import {test} from '@playwright/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

/**datos para hacer el login */
const data = {
    user : 'standard_user',
    pass : 'secret_sauce'
}
/******************************** */

test.beforeEach(async ({page})=>{

    const loginPage = new LoginPage(page);

    page.goto('https://www.saucedemo.com/');
    
    /**Login */
    await loginPage.logIn(data);
    await loginPage.isInventoryPage();
    /************************************* */

});

test(`
Given I am on the inventory page
When I filter the products from lowest to highest price
Then I add the cheapest and the most expensive product to the cart. 
`, async ({page})=>{

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProductsByLowToHigh();

    await inventoryPage.getProductCheap();

    await inventoryPage.getProductExpensive();

})