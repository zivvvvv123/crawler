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
    url: "https://www.keshet-teamim.co.il/categories/95114/products",
    name: "pastrami",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95115/products",
    name: "sausages",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95116/products",
    name: "sausages נקניקיות",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95117/products",
    name: "spreads",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/94255/products",
    name: "cheeses weighed",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95076/products",
    name: "dried and salty fish",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95059/products",
    name: "caviar",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95087/products",
    name: "home made pickles",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95085/products",
    name: "cheese alternatives",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95168/products",
    name: "fresh chicken ",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95169/products",
    name: "meats",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95277/products",
    name: "sauseges נקניקיות",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/109921/products",
    name: "keshet made meat",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79706/products",
    name: "fresh vegetables",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79705/products",
    name: "fresh fruit",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79707/products",
    name: "fried fruit and nuts ",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95136/products",
    name: "wine",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95138/products",
    name: "alcohol",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95139/products",
    name: "beers",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95140/products",
    name: "energy drinks",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95141/products",
    name: "cigarettes",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79689/products",
    name: "bread",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79688/products",
    name: "cake and cookies",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79690/products",
    name: "crackers",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/96550/products",
    name: "bakery",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79655/products",
    name: "candy",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79654/products",
    name: "snacks",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/119994/products",
    name: "organic",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120017/products",
    name: "gluten free",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120027/products",
    name: "sugar free diet",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120037/products",
    name: "vegan",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120043/products",
    name: "healthy from the fridge",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120046/products",
    name: "natural pharm",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120047/products",
    name: "acological",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79621/products",
    name: "basic stuff and seasoning",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/121170/products",
    name: "sauces",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79623/products",
    name: "canned food",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79624/products",
    name: "cooking",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79622/products",
    name: "baking products",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79620/products",
    name: "honey and jam",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95207/products",
    name: "cereal",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/97334/products",
    name: "fish and sea fruiits frozen",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120072/products",
    name: "smoked fish dried and salty fish",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/120077/products",
    name: "packaged fish",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95816/products",
    name: "doughs",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95824/products",
    name: "frozen fruits and vegetables",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95192/products",
    name: "frozen meats and birds",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/119595/products",
    name: "frozen deserts",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95266/products",
    name: "heat up and eat(frozen)",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79592/products",
    name: "ice cream",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95010/products",
    name: "milk and drinks",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79720/products",
    name: "eggs",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95012/products",
    name: "cheese and butter",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95011/products",
    name: "yogurts",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95013/products",
    name: "frozen cake (with milk)",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95809/products",
    name: "creams",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95200/products",
    name: "packed salads",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79670/products",
    name: "sodas",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79668/products",
    name: "hot drinks",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79669/products",
    name: "alcohol",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79572/products",
    name: "shower stuff",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95186/products",
    name: "mouth hygine",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79574/products",
    name: "general hygine",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79573/products",
    name: "pharm",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95797/products",
    name: "baby hygine",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95798/products",
    name: "baby food",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/119998/products",
    name: "toilet paper",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/95807/products",
    name: "baby products",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79742/products",
    name: "cleaning products",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79741/products",
    name: "laundry",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79743/products",
    name: "cleaning tools",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79769/products",
    name: "one time use",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79768/products",
    name: "house products",
  },
  {
    url: "https://www.keshet-teamim.co.il/categories/79766/products",
    name: "animal stuff",
  },
];

(async () => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({ headless: true });

  // Create a new page
  const page = await browser.newPage();

  // Initialize a set to keep track of visited URLs
  const visitedUrls = new Set();

  // Crawl each URL
  for (const { url, name } of urlsToVisit) {
    if (!visitedUrls.has(url)) {
      try {
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
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
      }
    }
  }

  // Close the browser
  await browser.close();

  // Function to continuously scroll until all products are loaded
  async function autoScroll(page) {
    let previousHeight = await page.evaluate("document.body.scrollHeight");
    let scrollAttempts = 0;
    const maxScrollAttempts = 100; // Increased the value for more thorough scrolling

    while (scrollAttempts < maxScrollAttempts) {
      // Scroll to the bottom of the page
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

      // Wait for a short interval to allow content loading
      await delay(2000); // Wait for 2 seconds; adjust as needed

      // Get the current scroll height
      const currentHeight = await page.evaluate("document.body.scrollHeight");

      // If the current scroll height hasn't changed, it means all content is loaded
      if (currentHeight === previousHeight) {
        console.log("Reached bottom of page");
        break;
      }

      // Update the previous scroll height and increment scroll attempts
      previousHeight = currentHeight;
      console.log(`Scroll attempt ${scrollAttempts + 1}: ${currentHeight}`);
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
