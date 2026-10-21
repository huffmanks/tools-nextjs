import { STOP_WORDS } from "@/features/MockContent/constants";
import data from "@/features/MockContent/mock-content_data.json";
import type { MockContentValues } from "@/features/MockContent/types";

const grabRandom = <T>(arr: T[], count = 1): T[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const generateFormats = (elements: string[], values: MockContentValues) => {
  const has = new Set(elements);

  const inlineOptions = {
    bold: values.check_inline_bold,
    italic: values.check_inline_italic,
    links: values.check_inline_links,
  };

  const htmlOutput: string[] = [];
  const markdownOutput: string[] = [];
  const plainTextOutput: string[] = [];

  if (has.has("h1")) {
    const title = grabRandom(data.longPhrases)[0];
    htmlOutput.push(`<h1>${title}</h1>`);
    markdownOutput.push(`# ${title}\n`);
    plainTextOutput.push(`${title.toUpperCase()}\n`);
  }

  if (has.has("p")) {
    const rawText = grabRandom(data.sentences, 2).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
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
    const rawText = grabRandom(data.sentences, 3).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
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
    const selectedTable = data.tables.finance;

    const ths = selectedTable.headers.map((th) => `      <th>${th}</th>`).join("\n");
    const htmlRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => {
        const tds = row.map((td) => `      <td>${td}</td>`).join("\n");
        return `    <tr>\n${tds}\n    </tr>`;
      })
      .join("\n");
    htmlOutput.push(
      `<table>\n  <thead>\n    <tr>\n${ths}\n    </tr>\n  </thead>\n  <tbody>\n${htmlRows}\n  </tbody>\n</table>`
    );

    const mdHeader = `| ${selectedTable.headers.join(" | ")} |`;
    const mdDivider = `| ${selectedTable.headers.map(() => "---").join(" | ")} |`;
    const mdRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");
    markdownOutput.push(`${mdHeader}\n${mdDivider}\n${mdRows}\n`);
  }

  if (has.has("p")) {
    const rawText = grabRandom(data.sentences, 3).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
  }

  if (has.has("p")) {
    const rawText = grabRandom(data.sentences, 2).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
  }

  if (has.has("ul")) {
    const items = grabRandom(data.shortPhrases, 4);

    const liMarkup = items.map((li) => `  <li>${li}</li>`).join("\n");
    htmlOutput.push(`<ul>\n${liMarkup}\n</ul>`);

    const mdMarkup = items.map((li) => `- ${li}`).join("\n");
    markdownOutput.push(`${mdMarkup}\n`);
  }

  if (has.has("h3")) {
    const title = grabRandom(data.shortPhrases)[0];
    htmlOutput.push(`<h3>${title}</h3>`);
    markdownOutput.push(`### ${title}\n`);
    plainTextOutput.push(`${title}\n`);
  }

  if (has.has("p")) {
    const rawText = grabRandom(data.sentences, 3).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
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
    const selectedTable = data.tables.tech;

    const ths = selectedTable.headers.map((th) => `      <th>${th}</th>`).join("\n");
    const htmlRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => {
        const tds = row.map((td) => `      <td>${td}</td>`).join("\n");
        return `    <tr>\n${tds}\n    </tr>`;
      })
      .join("\n");
    htmlOutput.push(
      `<table>\n  <thead>\n    <tr>\n${ths}\n    </tr>\n  </thead>\n  <tbody>\n${htmlRows}\n  </tbody>\n</table>`
    );

    const mdHeader = `| ${selectedTable.headers.join(" | ")} |`;
    const mdDivider = `| ${selectedTable.headers.map(() => "---").join(" | ")} |`;
    const mdRows = selectedTable.rows
      .slice(0, 4)
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");
    markdownOutput.push(`${mdHeader}\n${mdDivider}\n${mdRows}\n`);
  }

  if (has.has("p")) {
    const rawText = grabRandom(data.sentences, 3).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
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
    const rawText = grabRandom(data.sentences, 1).join(" ");
    const htmlText = applyInlineStylesHtml(rawText, inlineOptions);
    const mdText = applyInlineStylesMarkdown(rawText, inlineOptions);

    htmlOutput.push(`<p>${htmlText}</p>`);
    markdownOutput.push(`${mdText}\n`);
    plainTextOutput.push(`${rawText}\n`);
  }

  return {
    html: htmlOutput.join("\n\n"),
    markdown: markdownOutput.join("\n"),
    plaintext: plainTextOutput.join("\n"),
  };
};

export const getCheckedElements = (currentValues: MockContentValues): string[] => {
  return Object.keys(currentValues)
    .filter((key) => key.startsWith("check_") && currentValues[key] === true)
    .map((key) => key.replace("check_", ""));
};

const cleanWord = (w: string) => w.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();

const getRandomRange = (max: number, len: number, usedIndices: Set<number>) => {
  for (let attempt = 0; attempt < 25; attempt++) {
    const start = Math.floor(Math.random() * (max - len - 2)) + 1;
    let overlap = false;
    for (let i = start; i < start + len; i++) {
      if (usedIndices.has(i)) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      for (let i = start; i < start + len; i++) usedIndices.add(i);
      return start;
    }
  }
  return -1;
};

const applyInlineStylesHtml = (
  text: string,
  options: { bold: boolean; italic: boolean; links: boolean }
) => {
  const words = text.split(" ");
  if (words.length < 8) return text;

  const resultWords = [...words];
  const usedIndices = new Set<number>();

  const isValidPhrase = (phraseWords: string[]) => {
    if (phraseWords.length === 0) return false;
    const first = cleanWord(phraseWords[0]);
    const last = cleanWord(phraseWords[phraseWords.length - 1]);
    return first.length > 1 && !STOP_WORDS.has(first) && last.length > 1 && !STOP_WORDS.has(last);
  };

  if (options.links && resultWords.length > 6) {
    const len = Math.floor(Math.random() * 2) + 3;
    const start = getRandomRange(resultWords.length, len, usedIndices);
    if (start !== -1) {
      const slice = resultWords.slice(start, start + len);
      if (isValidPhrase(slice)) {
        const target = slice.join(" ");
        resultWords.splice(
          start,
          len,
          `<a href="https://example.com" target="_blank">${target}</a>`
        );
      }
    }
  }

  if (options.bold && resultWords.length > 6) {
    const len = Math.floor(Math.random() * 2) + 3;
    const start = getRandomRange(resultWords.length, len, usedIndices);
    if (start !== -1) {
      const slice = resultWords.slice(start, start + len);
      if (isValidPhrase(slice)) {
        const target = slice.join(" ");
        resultWords.splice(start, len, `<strong>${target}</strong>`);
      }
    }
  }

  if (options.italic && resultWords.length > 6) {
    const len = Math.floor(Math.random() * 2) + 3;
    const start = getRandomRange(resultWords.length, len, usedIndices);
    if (start !== -1) {
      const slice = resultWords.slice(start, start + len);
      if (isValidPhrase(slice)) {
        const target = slice.join(" ");
        resultWords.splice(start, len, `<em>${target}</em>`);
      }
    }
  }

  return resultWords.join(" ");
};

const applyInlineStylesMarkdown = (
  text: string,
  options: { bold: boolean; italic: boolean; links: boolean }
) => {
  const result = text;
  const words = result.split(" ");
  if (words.length < 4) return result;

  if (options.bold && words.length > 2) {
    words[0] = `**${words[0]}**`;
  }
  if (options.italic && words.length > 4) {
    const idx = Math.min(2, words.length - 1);
    words[idx] = `*${words[idx]}*`;
  }
  if (options.links && words.length > 3) {
    const idx = Math.min(1, words.length - 1);
    words[idx] = `[${words[idx]}](https://example.com)`;
  }
  return words.join(" ");
};
