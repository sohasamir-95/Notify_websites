const puppeteer=require('puppeteer');
let puma=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    try
    {
       //beforesale
       await page.waitForSelector(".strike-through",{visible:true});
       var pricearr=await (await page.$$eval('.strike-through',span=>span[0].children[0].textContent)).split('$')
       //console.log(priceArr)
       var Price=pricearr[1];
      //console.log("before-sale=",+parseFloat(Price.replace(/,/g,'')),"$");
    }
   catch(err){console.log("this product is out of sale");} 
   try
    {
       //salePrice
       await page.waitForSelector(".is-sale-price",{visible:true});
       var priceArr=await (await page.$$eval('.is-sale-price',span=>span[0].children[2].textContent)).split('$')
       //console.log(priceArr)
       var salePrice=priceArr[1];
      console.log("was",+parseFloat(Price.replace(/,/g,'')),"$","Now",+parseFloat(salePrice.replace(/,/g,'')),"$");
    }
   catch(err){console.log("this product is out of sale");}
    
   try
   {
    // document.querySelectorAll('.value')[0].textContent

      //originalprice
      await page.waitForSelector(".value",{visible:true});
      var pricearr=await (await page.$$eval('.value',span=>span[0].textContent)).split('$')
      var originalPrice=pricearr[1];
     console.log("original-price=",+parseFloat(originalPrice.replace(/,/g,'')),"$");
   }
  catch(err){console.log("error during getting price");} 

   try
    {
            //productName
        await page.waitForSelector(".product-name");
        const productName=await page.$eval('.product-name',h1=>h1.textContent);
        console.log("product-name:",productName);
    }
       catch(err){console.log("error during getting product name");}
       try
    {
            //productName
        await page.waitForSelector("img");
        const imgsrc=await page.$$eval('img',img=>img[6].getAttribute('src'));
        console.log("image-src:",imgsrc);
    }
       catch(err){console.log("error during loading image");}
       
});
puma('https://us.puma.com/en/us/pd/amplified-little-kids-graphic-tee/856516.html?dwvar_856516_color=02')