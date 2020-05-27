const puppeteer=require('puppeteer');
let zara=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    
        try{
                //saleAvailabilty
                await page.waitForSelector(".product-discount-percentage",{visible:true});
                var saleAvailable=await page.$eval('.product-discount-percentage',span=>span.textContent)
                console.log("sale-precentage",saleAvailable)       
            }
            catch(err){console.log("this product is out of sale")}
        try{
                //originalPrice
                await page.waitForSelector(".line-through",{visible:true});
                var pricearr=await (await page.$eval('.line-through',span=>span.textContent)).split('EGP');
                var originalPrice=pricearr[0];
                console.log("original-price=",+parseFloat(originalPrice.replace(/,/g,'')),"EGP");
            }
            catch(err){console.log("this product is out of sale");}
        try{    
                //salePrice
                await page.waitForSelector(".sale",{visible:true});
                var priceArr=await (await page.$eval('.sale ',span=>span.textContent)).split('EGP');
                var salePrice=priceArr[0];
                console.log("After sale=",+parseFloat(salePrice.replace(/,/g,'')),"EGP");
            }      
           catch(err){console.log("this product is out of sale");}

        try
            {     //mainprice
                await page.waitForSelector(".main-price",{visible:true});
                var priceARR=await (await page.$eval('.main-price',span=>span.textContent)).split('EGP');
                var mainPrice=priceARR[0];
                console.log("main-price=",+parseFloat(mainPrice.replace(/,/g,'')),'EGP');
            }
            catch(err){console.log("error during getting price");}
        try
            {
                //productName
                await page.waitForSelector(".product-name",{visible:true});
                const productName=await page.$eval('.product-name',h1=>h1.textContent);
                console.log("product-name:",productName);
            }
            catch{console.log("error during getting product name");}
        try
            {
                await page.waitForSelector(".image-big ");
                var imgSrc=await page.$$eval('.image-big',img=>img[3].getAttribute('src'));
                console.log("img-src",imgSrc);
            }
             catch{console.log("error during loading image");}

});
zara('https://www.zara.com/eg/en/water-repellent-jacket-p03046048.html?v1=39092028&v2=1445646')