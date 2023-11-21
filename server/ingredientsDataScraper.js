const puppeteer = require('puppeteer')
const fs = require('fs')

const links1 = require("./ingredients.json")
const links2 = require("./Ingredients11.json")
const links3 = require("./Ingredients32.json")
const links4 = require("./Ingredients61.json")
const links5 = require("./Ingredients111.json")
const links6 = require("./Ingredients151.json")
const links7 = require("./errorLinks.json")

const ingredientlinks = [
    // ...links1.ingredients,
    // ...links2.ingredients,
    // ...links3.ingredients,
    // ...links4.ingredients,
    // ...links5.ingredients,
    // ...links6.ingredients,
    ...links7.ingredients
]
const errorLinks = [

]
const uniqueLinks = Array.from(
    ingredientlinks.reduce((map, ingredient) => map.set(ingredient.link, ingredient), new Map()).values()
);
const BASE_URL = `https://www.nutritionix.com`


const main = async () => {
    const ingredients = []
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
    for (const { name, link } of uniqueLinks) {
        try {
            await page.goto(`${BASE_URL}${link}`, { waitUntil: 'networkidle0' });
            const name = await page.$eval('h1.food-item-name', (node) => node.innerText);
            const servingSize = await page.$eval('.nf-unitQuantityBox', (node) => node.getAttribute("value"))
            const servingSizeName = await page.$eval('.nf-serving-unit-name', (node) => node.innerText.split(" ")[0])
            const inGrams = await page.$eval('.nf-serving-unit-name > span:nth-child(1)', (node) => node.innerText.split('g\n')[0])
            const calories = await page.$eval('div.nf-calories > span.nf-pr', (node) => node.innerText)
            const totalFat = await page.$eval('div.nf-line:nth-child(8) > span:nth-child(2)', (node) => node.innerText.split('g\n')[0])
            const saturatedFat = await page.$eval('div.nf-line:nth-child(9) > span:nth-child(2)', (node) => node.innerText.split('g\n')[0])
            const transFat = await page.$eval('div.nf-line:nth-child(10) > span:nth-child(2)', (node) => node.innerText.split('g\n')[0])
            const cholesterol = await page.$eval('div.nf-line:nth-child(13) > span:nth-child(2)', (node) => node.innerText.split('mg\n')[0])
            const sodium = await page.$eval('div.nf-line:nth-child(14) > span:nth-child(2)', node => node.innerText.split('mg\n')[0])
            const totalCarbs = await page.$eval('div.nf-line:nth-child(15) > span:nth-child(2)', (node) => node.innerText.split('g\n')[0])
            const sugar = await page.$eval('div.nf-line:nth-child(17) > span:nth-child(2)', (node) => node.innerText.split('g\n')[0])
            // const protein = await page.$eval('div.nf-line:nth-child(18) > span:nth-child(2)', node => node.innerText.split('g\n')[0])
            const protein = await page.$eval('div.nf-line:nth-child(17) > span:nth-child(2)', node => node.innerText.split("g\n")[0])
            const calcium = await page.$eval('div.nf-vitamins:nth-child(1) > div:nth-child(2) > span:nth-child(2)', node => node.innerText.split('mg\n')[0])
            const iron = await page.$eval('div.nf-line:nth-child(3) > span:nth-child(2)', node => node.innerText.split('mg\n')[0])
            const potassium = await page.$eval('div.nf-line:nth-child(4) > span:nth-child(2)', node => node.innerText.split('mg\n')[0])

            ingredients.push({
                name,
                servingSize,
                servingSizeName,
                inGrams,
                calories,
                totalFat,
                saturatedFat,
                transFat,
                cholesterol,
                sodium,
                totalCarbs,
                sugar,
                protein,
                calcium,
                iron,
                potassium
            })
            console.log({
                name,
                servingSize,
                servingSizeName,
                inGrams,
                calories,
                totalFat,
                saturatedFat,
                transFat,
                cholesterol,
                sodium,
                totalCarbs,
                sugar,
                protein,
                calcium,
                iron,
                potassium
            })


        } catch (error) {
            console.error(`Error navigating to ${link}:`, error);
            errorLinks.push({ name, link })
        }
    }
    fs.writeFile(`ingredientData.json`, JSON.stringify({ingredients}, null, 4),(err) => {
        if(err){
             console.log(err)
        }
        else{
            console.log("File saved successfully");
        }
    });

    fs.writeFile(`errorLinks.json`, JSON.stringify({ ingredients: errorLinks }, null, 4),(err) => {
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