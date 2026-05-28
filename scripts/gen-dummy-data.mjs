import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function generateData() {
  // 1. Short Inline Phrases (Great for H3, H4, or List Items)
  const shortPhrases = Array.from({ length: 50 }, () => faker.helpers.fake("{{hacker.verb}} {{hacker.adjective}} {{hacker.noun}}")).map(capitalize);

  // 2. Long Titles (Great for H1, H2)
  const longPhrases = Array.from({ length: 50 }, () => {
    return capitalize(faker.company.buzzPhrase());
  });

  // 3. Readable Sentences (Using new company.buzzPhrase API)
  const sentences = Array.from({ length: 150 }, () => {
    const pattern = faker.helpers.arrayElement(["{{hacker.phrase}}", "{{company.buzzPhrase}}. {{hacker.phrase}}", "{{company.catchPhrase}}. {{company.buzzPhrase}}"]);
    return capitalize(faker.helpers.fake(pattern));
  });

  // 4. Blockquotes
  const quotes = Array.from({ length: 30 }, () => {
    const phraseOne = capitalize(faker.company.buzzPhrase());
    const phraseTwo = capitalize(faker.hacker.phrase());
    return `${phraseOne}. ${phraseTwo}`;
  });

  // 5. Structural Table Data - Flavor 1: System Infrastructure
  const techHeaders = ["ID", "Resource Module", "Status", "Throughput", "Deployment Node"];
  const techRows = Array.from({ length: 50 }, () => [
    faker.string.alphanumeric({ length: 5, casing: "upper" }),
    capitalize(faker.hacker.noun()),
    faker.helpers.arrayElement(["Active", "Optimized", "Deprecated", "Standby"]),
    `${faker.number.int({ min: 100, max: 999 })} Mb/s`,
    capitalize(faker.hacker.abbreviation()),
  ]);

  // 5b. Structural Table Data - Flavor 2: Financial Ledger
  const financeHeaders = ["Ticker", "Asset Class", "Volume", "Market Cap", "Yield"];
  const financeRows = Array.from({ length: 50 }, () => [
    faker.finance.currencyCode(),
    faker.helpers.arrayElement(["Equity", "Fixed Income", "Commodity", "Derivative"]),
    faker.number.int({ min: 5000, max: 250000 }).toLocaleString(),
    `$${faker.number.int({ min: 10, max: 950 })}B`,
    `${faker.number.float({ min: 0.5, max: 8.5, fractionDigits: 2 })}%`,
  ]);

  return {
    shortPhrases,
    longPhrases,
    sentences,
    quotes,
    tables: {
      tech: {
        headers: techHeaders,
        rows: techRows,
      },
      finance: {
        headers: financeHeaders,
        rows: financeRows,
      },
    },
  };
}

const outputData = generateData();
const outputPath = path.join(__dirname, "./dummy_data.json");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), "utf-8");
console.log(`Successfully compiled raw Faker asset to: ${outputPath}`);
