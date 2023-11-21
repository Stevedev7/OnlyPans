const puppeteer = require('puppeteer')
const fs = require('fs')
const URL = 'https://www.nutritionix.com/database/common-foods'


const main = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()

    const links = [];
    let startPage = 151;
    let endPage = 188;

    for(i = startPage; i <= endPage; i ++){
        await page.goto(`${URL}?page=${i}`, {waitUntil : 'networkidle0'})
        const ingredients = await page.$$('tr.item-row td p a')
        for await (let ingredient of extractData(ingredients)){
            links.push(ingredient);
        }
    }
    fs.writeFile(`Ingredients${startPage}.json`, JSON.stringify({ingredients: links}, null, 4),(err) => {
      if(err){
        console.log(err)
      }
      else{
        console.log("File saved successfully");
      }
    });
    browser.close()
}


async function* extractData(tags) {
    for(let i=0;i<tags.length;++i){
        let name = await tags[i].evaluate(tagNode => tagNode.innerText)
        let link = await tags[i].evaluate(tagNode => tagNode.getAttribute('href'))
        yield {
            name,
            link
        };
    }
}

main()