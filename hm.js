const puppeteer=require('puppeteer');
let Hm=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    try
       {
          //originalPrice
          await page.waitForSelector(".price-amount",{visible:true});
          var originalprice=await page.$eval('.price-amount',span=>span.textContent)
         console.log("original-price=",+parseFloat(originalprice.replace(/,/g,'')),'EGP');
       }
   catch(err){console.log("originalPrice not found");}
   try
   {
      //salePrice
      await page.waitForSelector(".price",{visible:true});
      var saleprice=await page.$$eval('.price',span=>span[3].children[1].textContent)
     console.log("was",+parseFloat(originalprice.replace(/,/g,'')),"EGP","Now",+parseFloat(saleprice.replace(/,/g,'')),"EGP");
   }
catch(err){console.log("this product is out of sale");}
    try {
            
            const imgsrc=await page.$$eval('.b-lazy',img=>img[0].getAttribute('src'));
            console.log(imgsrc);
        }
    catch(err){console.log("error during loading image");

    }
    try {
        
        const productName=await page.$eval('h1 span',h1=>h1.textContent);
        console.log(productName);
    }
catch(err){console.log("error during getting product name");

}
   
   
})
Hm('https://eg.hm.com/en/buy-suede-court-shoes-black-1.html');//sale
// Hm('https://eg.hm.com/en/buy-balloon-sleeved-dress-khaki-green-leopard-print.html');