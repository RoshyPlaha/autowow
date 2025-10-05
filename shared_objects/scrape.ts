import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

interface CarListing {
  id: string; // Unique identifier
  title: string;
  price: string;
  year: string;
  mileage: string;
  location: string;
  description: string;
  imageUrl?: string;
  listingUrl?: string;
}

export const scrapeAutoTrader = async (
  brand: string,
  model: string
): Promise<CarListing[]> => {
  let browser;
  try {
    // Encode parameters for URL
    const encodedBrand = encodeURIComponent(brand);
    const encodedModel = encodeURIComponent(model);

    const url = `https://www.autotrader.co.uk/car-search?postcode=se3+7hs&make=${encodedBrand}&model=${encodedModel}`;

    console.log("Scraping URL with Puppeteer:", url);

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set user agent and viewport
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1920, height: 1080 });

    // Set extra headers
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      DNT: "1",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1",
    });

    // Navigate to the page
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for content to load
    console.log("Waiting for content to load...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Wait for car listings to appear and content to fully load
    console.log("Waiting for car listings to load...");
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const currentHtml = await page.content();

      // Check if we have actual car content (not loading states)
      if (
        !currentHtml.includes("loading cars") &&
        !currentHtml.includes("0 results") &&
        currentHtml.includes("£")
      ) {
        console.log("Content appears to be loaded!");
        break;
      }

      // Scroll to trigger lazy loading
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      attempts++;
      console.log(
        `Attempt ${attempts}/${maxAttempts} - waiting for content...`
      );
    }

    // Final wait to ensure everything is loaded
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Get the final page content
    const html = await page.content();

    // Parse with cheerio
    const $ = cheerio.load(html);
    const cars: CarListing[] = [];
    const seenIds = new Set<string>(); // Track unique cars

    // Fallback to broader search if no containers found
    $("div, section, article, li").each((index, element) => {
      const $el = $(element);
      const text = $el.text().trim();

      // Look for patterns that suggest car listings
      if (
        text.length > 20 &&
        text.length < 500 &&
        (text.includes("£") ||
          text.includes(encodedBrand) ||
          text.includes(encodedModel))
      ) {
        const priceMatch = text.match(/£[\d,]+/);
        const yearMatch = text.match(/\b(19|20)\d{2}\b/);

        if (priceMatch || yearMatch) {
          const uniqueId = `${text.substring(0, 50)}-${priceMatch || ""}-${
            yearMatch || ""
          }`
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

          if (!seenIds.has(uniqueId)) {
            seenIds.add(uniqueId);

            // Extract image URL from the same element or nearby elements
            let imageUrl = "";

            // Look for main-image class in the current element or its children
            const mainImage = $el.find('img[class*="main-image"]').first();
            if (mainImage.length > 0) {
              imageUrl = mainImage.attr("src") || "";
            } else {
              console.log("No main image found!!!");
              // Look in parent elements for the image
              const parentWithImage = $el
                .parents()
                .find('img[class*="main-image"]')
                .first();
              if (parentWithImage.length > 0) {
                imageUrl = parentWithImage.attr("src") || "";
                console.log("Found main image URL in parent:", imageUrl);
              }
            }

            cars.push({
              id: uniqueId,
              title: text.substring(0, 100).trim(),
              price: priceMatch ? priceMatch[0] : "Price on application",
              year: yearMatch ? yearMatch[0] : "",
              mileage: "",
              location: "",
              description: text.substring(0, 200).trim(),
              imageUrl: imageUrl.startsWith("http")
                ? imageUrl
                : imageUrl
                ? `https://www.autotrader.co.uk${imageUrl}`
                : "",
              listingUrl: "",
            });
          }
        }
      }
    });

    console.log(`Found ${cars.length} car listings`);
    return cars;
  } catch (error) {
    console.error("Error scraping AutoTrader with Puppeteer:", error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
