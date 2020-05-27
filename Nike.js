const puppeteer=require('puppeteer');
let nike=(async(url)=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    try{
       
        await page.waitForSelector(".css-b9fpep",{visible:true});
        var pricearr=await page.$eval('.css-b9fpep',div=>div.textContent);
        var price=pricearr.slice(3);
        console.log('price=',parseFloat(price.replace(/,/g,'')),"EGP");
       
       }
    catch(err){console.log("error during getting price");}
    try{
        await page.waitForSelector(".headline-5-small",{visible:true});
        const catagoryName=await page.$eval('.headline-5-small',h2=>h2.textContent);
        console.log('catagory-name:',catagoryName);
        } 
    catch{console.log("error during getting catagory name");}

    try{
        await page.waitForSelector(".headline-2",{visible:true});
        const productName=await page.$eval('.headline-2',h1=>h1.textContent);
        console.log('product-name:',productName);
        }
    catch{console.log("error during getting product name");}
    try{
        await page.waitForSelector(".css-147n82m ");
        const imgSrc=await page.$eval('.css-147n82m ',img=>img.getAttribute('src'));
        console.log('image-src:',imgSrc);
       }
    catch{console.log("error during loading image");}
    });
    nike('https://www.nike.com/eg/t/air-force-1-07-shoe-KyTDGepj/315122-111');