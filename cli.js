const { crawl } = require("./crawler");

const args = process.argv.slice(2);
console.log(args);
const urlIndex = args.findIndex((arg) => arg === "url");
const maxDistIndex = args.findIndex((arg) => arg === "maxdist");
const filePathIndex = args.findIndex((arg) => arg === "file");

if (urlIndex === -1 || maxDistIndex === -1 || filePathIndex === -1) {
  console.error(
    "Usage: ./cli.js --url <url> --maxdist <maxdist> --file <filePath>"
  );
  process.exit(1);
}

const url = args[urlIndex + 1];
console.log(url);
const maxDist = parseInt(args[maxDistIndex + 1]);
console.log(maxDist);
const filePath = args[filePathIndex + 1];
console.log(filePath);

crawl(url, maxDist, filePath);
