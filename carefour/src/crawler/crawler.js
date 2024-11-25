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
    console.log(`saved ${fileName}.html`);
  } catch (error) {
    console.error(`Error saving ${fileName}.html:`, error);
  }
}

// Empty array for URLs to visit
const urlsToVisit = [
  {
    url: "https://www.carrefour.co.il/categories/79706/products",
    name: "vegetables",
  },
  {
    url: "https://www.carrefour.co.il/categories/79705/products",
    name: "fruits",
  },
  {
    url: "https://www.carrefour.co.il/categories/79707/products",
    name: "dried fruits and nuts",
  },
  {
    url: "https://www.carrefour.co.il/categories/79720/products",
    name: "eggs",
  },
  {
    url: "https://www.carrefour.co.il/categories/95010/products",
    name: "milk and milk beverages",
  },
  {
    url: "https://www.carrefour.co.il/categories/95012/products",
    name: "cheeses and butter",
  },
  {
    url: "https://www.carrefour.co.il/categories/95011/products",
    name: "yogurts",
  },
  {
    url: "https://www.carrefour.co.il/categories/95809/products",
    name: "creams",
  },
  {
    url: "https://www.carrefour.co.il/categories/95013/products",
    name: "pastas and doughy stuff",
  },
  {
    url: "https://www.carrefour.co.il/categories/79689/products",
    name: "bread",
  },
  {
    url: "https://www.carrefour.co.il/categories/79688/products",
    name: "cakes and cookies",
  },
  {
    url: "https://www.carrefour.co.il/categories/79690/products",
    name: "crackers and prochiyot",
  },
  {
    url: "https://www.carrefour.co.il/categories/96550/products",
    name: "bakery",
  },
  {
    url: "https://www.carrefour.co.il/categories/79822/products",
    name: "fresh chicken",
  },
  {
    url: "https://www.carrefour.co.il/categories/93709/products",
    name: "frozen chicken",
  },
  {
    url: "https://www.carrefour.co.il/categories/79823/products",
    name: "fresh meat",
  },
  {
    url: "https://www.carrefour.co.il/categories/93710/products",
    name: "frozen meat",
  },
  {
    url: "https://www.carrefour.co.il/categories/79824/products",
    name: "fish",
  },
  {
    url: "https://www.carrefour.co.il/categories/79621/products",
    name: "basic stuff and seasoning",
  },
  {
    url: "https://www.carrefour.co.il/categories/79623/products",
    name: "sauces and canned food",
  },
  {
    url: "https://www.carrefour.co.il/categories/79624/products",
    name: "cooking",
  },
  {
    url: "https://www.carrefour.co.il/categories/79622/products",
    name: "baking products",
  },
  {
    url: "https://www.carrefour.co.il/categories/79620/products",
    name: "jam honey and spreadables",
  },
  {
    url: "https://www.carrefour.co.il/categories/79732/products",
    name: "morning cereal",
  },
  {
    url: "https://www.carrefour.co.il/categories/79733/products",
    name: "cereal",
  },
  {
    url: "https://www.carrefour.co.il/categories/95814/products",
    name: "cereal and energy snacks",
  },
  {
    url: "https://www.carrefour.co.il/categories/79605/products",
    name: "packed salads",
  },
  {
    url: "https://www.carrefour.co.il/categories/79604/products",
    name: "Sausages and pastrami",
  },
  {
    url: "https://www.carrefour.co.il/categories/79606/products",
    name: "Deli",
  },
  {
    url: "https://www.carrefour.co.il/categories/81224/products",
    name: "weighed sausages and pastrami",
  },
  {
    url: "https://www.carrefour.co.il/categories/95816/products",
    name: "frozen dough",
  },
  {
    url: "https://www.carrefour.co.il/categories/95824/products",
    name: "frozen fruits and vegetables",
  },
  {
    url: "https://www.carrefour.co.il/categories/95828/products",
    name: "ready food",
  },
  {
    url: "https://www.carrefour.co.il/categories/79592/products",
    name: "ice cream",
  },
  {
    url: "https://www.carrefour.co.il/categories/79670/products",
    name: "sodas",
  },
  {
    url: "https://www.carrefour.co.il/categories/79668/products",
    name: "warm drinks",
  },
  {
    url: "https://www.carrefour.co.il/categories/79669/products",
    name: "alcohol",
  },
  {
    url: "https://www.carrefour.co.il/categories/94570/products",
    name: "milk alternatives",
  },
  {
    url: "https://www.carrefour.co.il/categories/94571/products",
    name: "meat alternatives",
  },
  {
    url: "https://www.carrefour.co.il/categories/79840/products",
    name: "gluten free products",
  },
  {
    url: "https://www.carrefour.co.il/categories/94568/products",
    name: "sugar free",
  },
  {
    url: "https://www.carrefour.co.il/categories/87293/products",
    name: "vitams and supplements",
  },
  {
    url: "https://www.carrefour.co.il/categories/94589/products",
    name: "special diet",
  },
  {
    url: "https://www.carrefour.co.il/categories/79654/products",
    name: "snacks",
  },
  {
    url: "https://www.carrefour.co.il/categories/79655/products",
    name: "candy",
  },
  {
    url: "https://www.carrefour.co.il/categories/79742/products",
    name: "home cleaning supplies",
  },
  {
    url: "https://www.carrefour.co.il/categories/79744/products",
    name: "toilet paper etc",
  },
  {
    url: "https://www.carrefour.co.il/categories/79741/products",
    name: "laundry",
  },
  {
    url: "https://www.carrefour.co.il/categories/79743/products",
    name: "cleaning tools",
  },
  {
    url: "https://www.carrefour.co.il/categories/79572/products",
    name: "shower",
  },
  {
    url: "https://www.carrefour.co.il/categories/95186/products",
    name: "mouth hygine",
  },
  {
    url: "https://www.carrefour.co.il/categories/79574/products",
    name: "general hygine",
  },
  {
    url: "https://www.carrefour.co.il/categories/79573/products",
    name: "pharm",
  },
  {
    url: "https://www.carrefour.co.il/categories/95797/products",
    name: "baby hygine",
  },
  {
    url: "https://www.carrefour.co.il/categories/95798/products",
    name: "baby food",
  },
  {
    url: "https://www.carrefour.co.il/categories/95807/products",
    name: "baby products",
  },
  {
    url: "https://www.carrefour.co.il/categories/79769/products",
    name: "one time use",
  },
  {
    url: "https://www.carrefour.co.il/categories/79768/products",
    name: "home products",
  },
  {
    url: "https://www.carrefour.co.il/categories/79766/products",
    name: "animal stuff",
  },
  {
    url: "https://www.carrefour.co.il/categories/79767/products",
    name: "free time",
  },
  {
    url: "https://www.carrefour.co.il/categories/79770/products",
    name: "towels",
  },
  {
    url: "https://www.carrefour.co.il/categories/79765/products",
    name: "batteries",
  },
];

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Initialize a set to keep track of visited URLs
  const visitedUrls = new Set();

  // Crawl each URL
  for (const { url, name } of urlsToVisit) {
    if (!visitedUrls.has(url)) {
      // Visit the URL
      await page.goto(url, { waitUntil: "networkidle2" }); // Wait for network activity to be idle

      // Wait for the specific selector to appear
      await delay(5000);

      // Continuously scroll until all products are loaded
      await autoScroll(page);

      // Get the page HTML content after it's fully loaded
      const htmlContent = await page.evaluate(
        () => document.documentElement.outerHTML
      );

      // Save the HTML content to a file with the specified name
      await savePageHTML(url, htmlContent, { [url]: name });

      // Add the URL to the set of visited URLs
      visitedUrls.add(url);
    }
  }

  // Close the browser
  await browser.close();

  // Function to continuously scroll until all products are loaded
  async function autoScroll(page) {
    let previousHeight = 0;
    let scrollAttempts = 0;
    const maxScrollAttempts = 60; // Adjust this value as needed

    while (scrollAttempts < maxScrollAttempts) {
      // Scroll to the bottom of the page
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      // Wait for a short interval to allow content loading
      await delay(1500); // Wait for 4 seconds; adjust as needed

      // Get the current scroll height
      const currentHeight = await page.evaluate("document.body.scrollHeight");

      // If the current scroll height hasn't changed, it means all content is loaded
      if (currentHeight === previousHeight) {
        break;
      }

      // Update the previous scroll height and increment scroll attempts
      previousHeight = currentHeight;
      console.log(scrollAttempts, currentHeight);
      scrollAttempts++;
    }
  }

  // Function to create a delay
  function delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
})();
