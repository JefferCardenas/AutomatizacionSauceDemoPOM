import {Page, expect} from '@playwright/test';

export class InventoryPage{

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async addItemToCart(products){

        for(let product of products){
            await this.page.locator(`xpath=//a/div[text() = '${product}']//ancestor-or-self::div[@class = 'inventory_item']//button`).click();
        }
        
    }

    async sortProductsByLowToHigh(){

        await this.page.locator("xpath = //select[@data-test = 'product_sort_container']").selectOption("lohi")
    }

     /**
     * Para obtener el producto mas barato,
     * le decimos que de la lista de productos, 
     * le de clik al boton de agregar al carrito del primer producto
     */
    async getProductCheap(){

        let cheadProduct = await this.page.locator("xpath = //div[@class = 'inventory_item_description']//div[@class = 'inventory_item_price']").first().textContent();

        console.log("CHEAP PRODUCT --> " + cheadProduct);

        await this.page.locator("xpath=//div[@class = 'inventory_item_description']//button").first().click();
    }

    /**
     * Para obtener el producto mas caro,
     * le decimos que de la lista de productos, 
     * le de clik al boton de agregar al carrito del ultimo producto
     */
    async getProductExpensive(){

        let expensiveProduct = await this.page.locator(`xpath = //div[@class = 'inventory_item_description']//div[@class = 'inventory_item_price']`).last().textContent();

        console.log("EXPENSIVE PRODUCT --> " + expensiveProduct);

        await this.page.locator(`xpath=(//div[@class = 'inventory_item_description'])//button`).last().click();
    }
}