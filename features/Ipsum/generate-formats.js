import data from "./ipsum_data.json";

const grabRandom = (arr, count = 1) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const generateFormats = (elements, tableDataType = "tech") => {
  const has = new Set(elements);

  const htmlOutput = [];
  const markdownOutput = [];
  const plainTextOutput = [];

  if (has.has("h1")) {
    const title = grabRandom(data.longPhrases)[0];
    htmlOutput.push(`<h1>${title}</h1>`);
    markdownOutput.push(`# ${title}\n`);
    plainTextOutput.push(`${title.toUpperCase()}\n`);
  }

  if (has.has("p")) {
    const introPara = grabRandom(data.sentences, 2).join(" ");
    htmlOutput.push(`<p>${introPara}</p>`);
    markdownOutput.push(`${introPara}\n`);
    plainTextOutput.push(`${introPara}\n`);
  }

  if (has.has("h2")) {
    const title = grabRandom(data.longPhrases)[0];
    htmlOutput.push(`<h2>${title}</h2>`);
    markdownOutput.push(`## ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("h3")) {
    const title = grabRandom(data.shortPhrases)[0];
    htmlOutput.push(`<h3>${title}</h3>`);
    markdownOutput.push(`### ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 3).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("blockquote")) {
    const quote = grabRandom(data.quotes)[0];
    htmlOutput.push(`<blockquote>\n  <p>${quote}</p>\n</blockquote>`);
    markdownOutput.push(`> ${quote}\n`);
    plainTextOutput.push(`${quote}\n`);
  }

  if (has.has("h4")) {
    const title = grabRandom(data.shortPhrases)[0];
    htmlOutput.push(`<h4>${title}</h4>`);
    markdownOutput.push(`#### ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("table")) {
    // finance table
    const selectedTable = data.tables.finance;

    const ths = selectedTable.headers.map((th) => `      <th>${th}</th>`).join("\n");
    const htmlRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => {
        const tds = row.map((td) => `      <td>${td}</td>`).join("\n");
        return `    <tr>\n${tds}\n    </tr>`;
      })
      .join("\n");
    htmlOutput.push(`<table>\n  <thead>\n    <tr>\n${ths}\n    </tr>\n  </thead>\n  <tbody>\n${htmlRows}\n  </tbody>\n</table>`);

    const mdHeader = `| ${selectedTable.headers.join(" | ")} |`;
    const mdDivider = `| ${selectedTable.headers.map(() => "---").join(" | ")} |`;
    const mdRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");
    markdownOutput.push(`${mdHeader}\n${mdDivider}\n${mdRows}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 3).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 2).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("ul")) {
    const items = grabRandom(data.shortPhrases, 4);

    const liMarkup = items.map((li) => `  <li>${li}</li>`).join("\n");
    htmlOutput.push(`<ul>\n${liMarkup}\n</ul>`);

    const mdMarkup = items.map((li, i) => `- ${li}`).join("\n");
    markdownOutput.push(`${mdMarkup}\n`);
  }

  if (has.has("h3")) {
    const title = grabRandom(data.shortPhrases)[0];
    htmlOutput.push(`<h3>${title}</h3>`);
    markdownOutput.push(`### ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 3).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("blockquote")) {
    const quote = grabRandom(data.quotes)[0];
    htmlOutput.push(`<blockquote>\n  <p>${quote}</p>\n</blockquote>`);
    markdownOutput.push(`> ${quote}\n`);
    plainTextOutput.push(`${quote}\n`);
  }

  if (has.has("h4")) {
    const title = grabRandom(data.shortPhrases)[0];
    htmlOutput.push(`<h4>${title}</h4>`);
    markdownOutput.push(`#### ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("table")) {
    // tech table
    const selectedTable = data.tables.tech;

    const ths = selectedTable.headers.map((th) => `      <th>${th}</th>`).join("\n");
    const htmlRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => {
        const tds = row.map((td) => `      <td>${td}</td>`).join("\n");
        return `    <tr>\n${tds}\n    </tr>`;
      })
      .join("\n");
    htmlOutput.push(`<table>\n  <thead>\n    <tr>\n${ths}\n    </tr>\n  </thead>\n  <tbody>\n${htmlRows}\n  </tbody>\n</table>`);

    const mdHeader = `| ${selectedTable.headers.join(" | ")} |`;
    const mdDivider = `| ${selectedTable.headers.map(() => "---").join(" | ")} |`;
    const mdRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");
    markdownOutput.push(`${mdHeader}\n${mdDivider}\n${mdRows}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 3).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 2).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("ol")) {
    const items = grabRandom(data.shortPhrases, 4);

    const liMarkup = items.map((li) => `  <li>${li}</li>`).join("\n");
    htmlOutput.push(`<ol>\n${liMarkup}\n</ol>`);

    const mdMarkup = items.map((li, i) => `${i + 1}. ${li}`).join("\n");
    markdownOutput.push(`${mdMarkup}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 3).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  if (has.has("p")) {
    const bodyPara = grabRandom(data.sentences, 1).join(" ");
    htmlOutput.push(`<p>${bodyPara}</p>`);
    markdownOutput.push(`${bodyPara}\n`);
    plainTextOutput.push(`${bodyPara}\n`);
  }

  return {
    html: htmlOutput.join("\n\n"),
    markdown: markdownOutput.join("\n"),
    plaintext: plainTextOutput.join("\n"),
  };
};

export const getCheckedElements = (currentValues) => {
  return Object.keys(currentValues)
    .filter((key) => key.startsWith("check_") && currentValues[key] === true)
    .map((key) => key.replace("check_", ""));
};
