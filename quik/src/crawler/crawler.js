const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Function to save HTML content to a file
async function savePageHTML(url, htmlContent, names) {
  const fileName = names[url] || "index"; // Use URL name or "index" if not found
  const directoryPath = path.join(__dirname, "..", "pages"); // Adjusted directory path
  const filePath = path.join(directoryPath, fileName + ".html");

  try {
    // Check if the directory exists, create it if it doesn't
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    await fs.promises.writeFile(filePath, htmlContent);
    console.log(`Saved ${fileName}.html`);
  } catch (error) {
    console.error(`Error saving ${fileName}.html:`, error);
  }
}

// Empty array for URLs to visit
const urlsToVisit = [
  {
    url: "https://www.quik.co.il/categories/79706/products",
    name: "vegetables",
  },
  {
    url: "https://www.quik.co.il/categories/79705/products",
    name: "fruits",
  },
  {
    url: "https://www.quik.co.il/categories/79707/products",
    name: "dried fruits and vegetables",
  },
  {
    url: "https://www.quik.co.il/categories/79720/products",
    name: "eggs",
  },
  {
    url: "https://www.quik.co.il/categories/95010/products",
    name: "milk and diary drinks",
  },
  {
    url: "https://www.quik.co.il/categories/95012/products",
    name: "cheeses and butter",
  },
  {
    url: "https://www.quik.co.il/categories/95011/products",
    name: "yogurt",
  },
  {
    url: "https://www.quik.co.il/categories/95809/products",
    name: "creams",
  },
  {
    url: "https://www.quik.co.il/categories/95013/products",
    name: "doughy products and pastas",
  },
  {
    url: "https://www.quik.co.il/categories/79689/products",
    name: "bread",
  },
  {
    url: "https://www.quik.co.il/categories/79688/products",
    name: "cakes and cookies",
  },
  {
    url: "https://www.quik.co.il/categories/79690/products",
    name: "crackers",
  },
  {
    url: "https://www.quik.co.il/categories/96550/products",
    name: "bakery",
  },
  {
    url: "https://www.quik.co.il/categories/79822/products",
    name: "chicken",
  },
  {
    url: "https://www.quik.co.il/categories/93709/products",
    name: "frozen chicken",
  },
  {
    url: "https://www.quik.co.il/categories/79823/products",
    name: "fresh meat",
  },
  {
    url: "https://www.quik.co.il/categories/93710/products",
    name: "frozen meat",
  },
  {
    url: "https://www.quik.co.il/categories/79824/products",
    name: "fish",
  },
  {
    url: "https://www.quik.co.il/categories/79621/products",
    name: "seasoning",
  },
  {
    url: "https://www.quik.co.il/categories/79623/products",
    name: "canned food and sauces",
  },
  {
    url: "https://www.quik.co.il/categories/79624/products",
    name: "cooking",
  },
  {
    url: "https://www.quik.co.il/categories/79622/products",
    name: "baking products",
  },
  {
    url: "https://www.quik.co.il/categories/79620/products",
    name: "honey and jams",
  },
  {
    url: "https://www.quik.co.il/categories/79732/products",
    name: "morning cereal",
  },
  {
    url: "https://www.quik.co.il/categories/79733/products",
    name: "cereal",
  },
  {
    url: "https://www.quik.co.il/categories/95814/products",
    name: "energy bars",
  },
  {
    url: "https://www.quik.co.il/categories/79605/products",
    name: "packed salads",
  },
  {
    url: "https://www.quik.co.il/categories/79604/products",
    name: "ham and sauseges",
  },
  {
    url: "https://www.quik.co.il/categories/79606/products",
    name: "cheeses",
  },
  {
    url: "https://www.quik.co.il/categories/81224/products",
    name: "weighed ham and sauseges",
  },
  {
    url: "https://www.quik.co.il/categories/95816/products",
    name: "frozen dough",
  },
  {
    url: "https://www.quik.co.il/categories/95824/products",
    name: "frozen fruits and vegetables",
  },
  {
    url: "https://www.quik.co.il/categories/95828/products",
    name: "ready food",
  },
  {
    url: "https://www.quik.co.il/categories/79592/products",
    name: "ice cream",
  },
  {
    url: "https://www.quik.co.il/categories/79670/products",
    name: "sodas",
  },
  {
    url: "https://www.quik.co.il/categories/79668/products",
    name: "hot drinks",
  },
  {
    url: "https://www.quik.co.il/categories/79669/products",
    name: "wine and alochol",
  },
  {
    url: "https://www.quik.co.il/categories/94570/products",
    name: "milk alternatives",
  },
  {
    url: "https://www.quik.co.il/categories/94571/products",
    name: "meat alternatives",
  },
  {
    url: "https://www.quik.co.il/categories/79840/products",
    name: "gluten free",
  },
  {
    url: "https://www.quik.co.il/categories/94568/products",
    name: "sugar free diet",
  },
  {
    url: "https://www.quik.co.il/categories/87293/products",
    name: "vitamens and supplements",
  },
  {
    url: "https://www.quik.co.il/categories/94589/products",
    name: "special diet",
  },
  {
    url: "https://www.quik.co.il/categories/79654/products",
    name: "snacks",
  },
  {
    url: "https://www.quik.co.il/categories/79655/products",
    name: "candy",
  },
  {
    url: "https://www.quik.co.il/categories/79742/products",
    name: "home cleaning products",
  },
  {
    url: "https://www.quik.co.il/categories/79744/products",
    name: "toilet paper and papers",
  },
  {
    url: "https://www.quik.co.il/categories/79741/products",
    name: "laundry",
  },
  {
    url: "https://www.quik.co.il/categories/79743/products",
    name: "cleaning products",
  },
  {
    url: "https://www.quik.co.il/categories/79572/products",
    name: "shower",
  },
  {
    url: "https://www.quik.co.il/categories/95186/products",
    name: "mouth hygine",
  },
  {
    url: "https://www.quik.co.il/categories/79574/products",
    name: "hygine products",
  },
  {
    url: "https://www.quik.co.il/categories/79573/products",
    name: "pharm",
  },
  {
    url: "https://www.quik.co.il/categories/95797/products",
    name: "baby hygine",
  },
  {
    url: "https://www.quik.co.il/categories/95798/products",
    name: "baby food",
  },
  {
    url: "https://www.quik.co.il/categories/95807/products",
    name: "baby products",
  },
  {
    url: "https://www.quik.co.il/categories/79769/products",
    name: "one time use",
  },
  {
    url: "https://www.quik.co.il/categories/79768/products",
    name: "home products",
  },
  {
    url: "https://www.quik.co.il/categories/79766/products",
    name: "animal shiii",
  },
  {
    url: "https://www.quik.co.il/categories/79767/products",
    name: "free time",
  },
  {
    url: "https://www.quik.co.il/categories/79770/products",
    name: "towels",
  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  const visitedUrls = new Set();

  for (const { url, name } of urlsToVisit) {
    if (!visitedUrls.has(url)) {
      try {
        await page.goto(url, { waitUntil: "networkidle2" });

        await delay(5000);

        await autoScroll(page);

        const htmlContent = await page.evaluate(
          () => document.documentElement.outerHTML
        );

        await savePageHTML(url, htmlContent, { [url]: name });

        visitedUrls.add(url);
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
      }
    }
  }

  await browser.close();

  async function autoScroll(page) {
    let previousHeight = await page.evaluate("document.body.scrollHeight");
    let scrollAttempts = 0;
    const maxScrollAttempts = 100;

    while (scrollAttempts < maxScrollAttempts) {
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      await delay(2000);

      const currentHeight = await page.evaluate("document.body.scrollHeight");

      if (currentHeight === previousHeight) {
        console.log("Reached bottom of page");
        break;
      }

      previousHeight = currentHeight;
      console.log(`Scroll attempt ${scrollAttempts + 1}: ${currentHeight}`);
      scrollAttempts++;
    }
  }

  function delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
})();
