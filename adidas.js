const puppeteer=require('puppeteer');
let adidas=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    try
       {
          //originalPrice
          await page.waitForSelector(".gl-price",{visible:true});
          var priceArr=await (await page.$$eval('.gl-price',span=>span[0].lastChild.textContent)).split('$');
          var originalPrice=priceArr[1];
         console.log("After-sale=",+parseFloat(originalPrice.replace(/,/g,'')),'$');
       }
   catch(err){console.log("error during getting price");}

      try {
            //salePrice
            await page.waitForSelector(".gl-price",{visscdible:true});
            var pricearr=await (await page.$$eval('.gl-price',span=>span[0].children[0].textContent)).split('$');
            var salePrice=pricearr[1];
            console.log("After-sale=",+parseFloat(salePrice.replace(/,/g,'')),'$');
          }
            
       
      catch(err){console.log("this product is out of sale");}
    try
       {
            //productName
            await page.waitForSelector(".gl-heading ");
            const productName=await page.$eval('.gl-heading',h1=>h1.textContent);
            console.log("product-name:",productName);
       }
       catch(err){console.log("error during getting produvt name");}
    try{
          await page.waitForSelector(".view___2-z-q ");
          const imgsrc=await page.$$eval('.view___2-z-q',div=>div[0].firstChild.getAttribute('srcset'));
          console.log("img-src:",imgsrc);
     
        }
   catch(err){console.log("error during loading image");}
      



   

});
//adidas('https://www.adidas.com/us/nizza-trefoil-shoes/EF1878.html');
// adidas('https://www.adidas.com/us/adidas-sleek-shoes/EF4933.html?pr=product_rr&slot=1')
//adidas('https://shop.adidas.co.za/supernova-shorts-384399.html')//southafrica error 
//adidas('https://www.reebok.com/us/classic-leather-women-s-shoes/5324.html')
adidas('https://www.adidas.com/us/face-cover-large-3-pack/H08836.html')
//adidas('https://www.adidas.com/us/senseboost-go-shoes/EG0960.html')