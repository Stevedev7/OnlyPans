const puppeteer = require('puppeteer')
const fs = require('fs')

const links1 = require("./ingredients.json")
const links2 = require("./Ingredients11.json")
const links3 = require("./Ingredients32.json")
const links4 = require("./Ingredients61.json")
const links5 = require("./Ingredients111.json")
const links6 = require("./errorLinks8.json")

const BASE_URL = `https://www.nutritionix.com`



const main = async () => {

    let ingredients = []
    let errorLinks = []
    let uniqueLinks = Array.from(
        links6.ingredients.reduce((map, ingredient) => map.set(ingredient.link, ingredient), new Map()).values()
    );
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
    for (const { name, link } of uniqueLinks) {
        let ingredient = {}
        try {
            await page.goto(`${BASE_URL}${link}`, { waitUntil: 'networkidle0' });
            ingredient['name'] = await page.$eval('h1.food-item-name', (node) => node.innerText);
            ingredient['servingSize'] = await page.$eval('.nf-unitQuantityBox', (node) => Number(node.getAttribute("value")))
            ingredient['servingSizeName'] = await page.$eval('.nf-serving-unit-name', (node) => node.innerText.split(" ")[0])
            ingredient['inGrams'] = await page.$eval('.nf-serving-unit-name > span:nth-child(1)', (node) => Number(node.innerText.split('g\n')[0]))
            ingredient['calories'] = await page.$eval('div.nf-calories > span.nf-pr', (node) => Number(node.innerText))
            try{
                ingredient['totalFat'] = await page.$eval(`div.nf-line span[itemProp="fatContent"]`, (node) => Number(node.innerText.split('g\n')[0]))
            } catch(e){
                ingredient['totalFat'] = 0
            }
            try {
                ingredient['saturatedFat'] = await page.$eval(`div.nf-line span[itemProp="saturatedFatContent"]`, (node) => Number(node.innerText.split('g\n')[0])) 
            } catch {
                ingredient['saturatedFat'] = 0
            }
            try {
            ingredient['transFat'] = await page.$eval(`div.nf-line span[itemProp="transFatContent"]`, (node) => Number(node.innerText.split('g\n')[0])) ;
            } catch (e){
                ingredient["transFat"] = 0
            }
            try {
                ingredient['cholesterol'] = await page.$eval(`div.nf-line span[itemProp="cholesterolContent"]`, (node) => Number(node.innerText.split('mg\n')[0])) 
            } catch(e) {
                ingredient['cholesterol'] = 0
            }
            try {
                ingredient['sodium'] = await page.$eval(`div.nf-line span[itemProp="sodiumContent"]`, node => Number(node.innerText.split('mg\n')[0]))   
            } catch (e) {
                ingredient['sodium'] = 0
            }
            try {
                ingredient['totalCarbs'] = await page.$eval(`div.nf-line span[itemProp="carbohydrateContent"]`, (node) => Number(node.innerText.split('g\n')[0]))
            } catch (e) {
                ingredient['totalCarbs'] = 0
            }
            try {
                ingredient['sugar'] = await page.$eval(`div.nf-line span[itemProp="sugarContent"]`, (node) => Number(node.innerText.split('g\n')[0]))
            } catch(e){
                ingredient['sugar'] = 0
            }
            try {
                ingredient['protein'] = await page.$eval(`div.nf-line span[itemProp="proteinContent"]`, node => Number(node.innerText.split("g\n")[0]))
            } catch (e) {
                ingredient['protein'] = 0
            }
            
            try {
                ingredient['calcium'] = await page.$eval(`div.nf-line span[itemProp="calciumContent"]`, node => Number(node.innerText.split('mg\n')[0]))
            }catch(e){
                ingredient['calcium'] = 0;
            }
            try {
                ingredient['iron'] = await page.$eval(`div.nf-line span[itemProp="ironContent"]`, node => Number(node.innerText.split('mg\n')[0]))
            } catch (e) {
                ingredient["iron"] = 0
            }

            try {
                ingredient['potassium'] = await page.$eval(`div.nf-line span[itemprop="potassiumContent"]`, node => Number(node.innerText.split('mg\n')[0]))
            } catch (e) {
                ingredient['potassium'] = 0
            }


            ingredients.push(ingredient)
            console.log(ingredient)
        } catch (error) {
            console.error(`Error navigating to ${link}:`, error);
            errorLinks.push({ name, link })
        }
    }
    fs.writeFile(`ingredientData9.json`, JSON.stringify({ingredients}, null, 4),(err) => {
        if(err){
             console.log(err)
        }
        else{
            console.log("File saved successfully");
        }
    });

    fs.writeFile(`errorLinks9.json`, JSON.stringify({ ingredients: errorLinks }, null, 4),(err) => {
        if(err){
             console.log(err)
        }
        else{
            console.log("File saved successfully");
        }
    });
    browser.close()
}


main()