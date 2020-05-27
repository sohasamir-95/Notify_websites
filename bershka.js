const puppeteer=require('puppeteer');
let bershka=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    try
       {
          //originalPrice
          await page.waitForSelector(".product-price");

          var priceArr=await (await page.$$eval('.product-price',span=>span[2].children[0].textContent)).split('EGP')
          var originalPrice=priceArr[1];
          //console.log(originalPrice)
          console.log('original-price',parseFloat(originalPrice.replace(/,/g,'')),'EGP');
       }
    catch(err){console.log("originalPrice not found");}

    try
       {
            //salePrice
            var pricearr=await (await page.$$eval('.product-price',span=>span[2].children[1].textContent)).split('EGP')
            var salePrice=pricearr[1];
            console.log('afte-sale',+parseFloat(salePrice.replace(/,/g,'')),'EGP');
       }
    catch(err){console.log("this product is out of sale");}
       try
            {
                //saleAvailabilty
                var saleAvailable=await page.$$eval('.product-price',span=>span[2].children[2].textContent);
                console.log("sale-Precentage:",saleAvailable)       
            }
        catch(err){console.log("this product is out of sale")}
       
        try {
                //productName
                await page.waitForSelector(".product-description-name ");
                const productName=await page.$eval('.product-description-name',h1=>h1.textContent);
                console.log('product-name:',productName);
            }
        catch(err){console.log("error during getting product name");}
        try
            {
                //imgsrc
                await page.waitForSelector("img");
                var imgSrc=await page.$$eval('img',img=>img[15].getAttribute('src'));
                console.log('image-src:',imgSrc);
            }
        catch{console.log("error during loading image");}

});
bershka('https://www.bershka.com/eg/women/collection/dresses/long-strappy-dress-c1010193213p102357584.html?colorId=600')