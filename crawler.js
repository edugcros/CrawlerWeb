const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function crawl(url, maxDist, filePath) {
  const visited = new Set();
  const queue = [{ url, dist: 0 }];
  const results = [];

  while (queue.length > 0) {
    const { url, dist } = queue.shift();

    if (dist <= maxDist && !visited.has(url)) {
      visited.add(url);

      try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        results.push({ url, data: $("body").text() });

        // Extract links from the page
        $("a").each((i, element) => {
          const link = $(element).attr("href");
          if (link && !link.startsWith("http") && !link.startsWith("mailto:")) {
            queue.push({ url: new URL(link, url).href, dist: dist + 1 });
          }
        });
        //console.log(results);
      } catch (error) {
        console.error(`Error crawling ${url}: ${error.message}`);
      }
    }
  }
  // Save results to file
  saveResultsToFile(results, filePath);
}

function saveResultsToFile(results, filePath) {
  try {
    // Format results based on the specified format
    let formattedResults;
    formattedResults = JSON.stringify(results, null, 2);
    // Write formatted results to the file
    fs.writeFileSync(filePath, formattedResults);
    console.log("Results saved to", filePath);
  } catch (error) {
    console.error("Error saving results:", error);
  }
}

module.exports = { crawl };
