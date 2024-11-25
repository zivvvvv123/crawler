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
    url: "https://www.mck.co.il/categories/79706/products",
    name: "vegetables",
  },
  {
    url: "https://www.mck.co.il/categories/79705/products",
    name: "fruits",
  },
  {
    url: "https://www.mck.co.il/categories/79707/products",
    name: "dried fruits and vegetables",
  },
  {
    url: "https://www.mck.co.il/categories/79720/products",
    name: "eggs",
  },
  {
    url: "https://www.mck.co.il/categories/95010/products",
    name: "milk and diary products",
  },
  {
    url: "https://www.mck.co.il/categories/95012/products",
    name: "cheese and butter",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
  },
  {
    url: "",
    name: "",
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
