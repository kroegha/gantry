/**
 * PRD Document Generator
 *
 * Generates Word documents from Markdown PRD files.
 * Visual styling lives entirely in ./style-constants.js — edit that to match a
 * house style; this file decides structure, not appearance.
 *
 * Usage:
 *   node generate-prd.js <input.md> <output.docx> [options]
 *
 * Options:
 *   --product-name "Name"      Product name for cover page
 *   --version "X.X"            Version number
 *   --date "Month Year"        Document date
 *   --author "Name"            Author name
 *   --status "Draft|Review"    Document status
 *   --organisation "Name"      Company/org on the cover, control table and header.
 *                              Omit for none — the document simply carries no
 *                              organisation, which is a valid and common result.
 *   --classification "Text"    Document classification (default: Confidential).
 *                              Pass "" to omit it entirely.
 *
 * Required: npm install docx
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  LevelFormat, PageBreak, ShadingType, PageNumber, TableOfContents,
  convertInchesToTwip
} = require('docx');

// Visual style: neutral defaults, shipped alongside this script.
const STYLE = require('./style-constants.js');

// Parse command line arguments
function parseArgs(args) {
  const config = {
    inputFile: args[0],
    outputFile: args[1],
    productName: 'Product Name',
    version: '1.0',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    author: 'Author',
    status: 'Draft',
    organisation: '',
    classification: 'Confidential'
  };

  for (let i = 2; i < args.length; i += 2) {
    switch (args[i]) {
      case '--product-name': config.productName = args[i + 1]; break;
      case '--version': config.version = args[i + 1]; break;
      case '--date': config.date = args[i + 1]; break;
      case '--author': config.author = args[i + 1]; break;
      case '--status': config.status = args[i + 1]; break;
      case '--organisation': config.organisation = args[i + 1] || ''; break;
      case '--organization': config.organisation = args[i + 1] || ''; break;
      case '--classification': config.classification = args[i + 1] || ''; break;
    }
  }

  return config;
}

// Style definitions
const styles = {
  default: {
    document: {
      run: { font: STYLE.fonts.primary, size: STYLE.sizes.body }
    }
  },
  paragraphStyles: [
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: STYLE.sizes.heading1, bold: true, color: STYLE.colors.heading1, font: STYLE.fonts.primary },
      paragraph: { spacing: { before: STYLE.spacing.heading1Before, after: STYLE.spacing.heading1After }, outlineLevel: 0 }
    },
    {
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: STYLE.sizes.heading2, bold: true, color: STYLE.colors.heading2, font: STYLE.fonts.primary },
      paragraph: { spacing: { before: STYLE.spacing.heading2Before, after: STYLE.spacing.heading2After }, outlineLevel: 1 }
    },
    {
      id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: STYLE.sizes.heading3, bold: true, font: STYLE.fonts.primary },
      paragraph: { spacing: { before: STYLE.spacing.heading3Before, after: STYLE.spacing.heading3After }, outlineLevel: 2 }
    },
    {
      id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: STYLE.sizes.heading4, bold: true, italics: true, color: STYLE.colors.heading2, font: STYLE.fonts.primary },
      paragraph: { spacing: { before: STYLE.spacing.heading4Before, after: STYLE.spacing.heading4After }, outlineLevel: 3 }
    }
  ]
};

const numbering = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u25CF", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "\u25CB", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }
      ]
    },
    {
      reference: "numbered-list",
      levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
      ]
    }
  ]
};

// Helper functions
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: STYLE.colors.tableBorder };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

function createHeaderCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: STYLE.colors.tableHeader, type: ShadingType.CLEAR },
    margins: STYLE.cellMargins,
    children: [new Paragraph({
      // Inline markdown is parsed in cells too — **bold** in a table is common
      // in PRDs and rendering it literally is the most visible failure there is.
      children: parseInlineFormatting(text, { bold: true, color: STYLE.colors.tableHeaderText, size: STYLE.sizes.table })
    })]
  });
}

function createDataCell(text, width, isAlt) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: isAlt ? STYLE.colors.tableRowAlt : STYLE.colors.tableRowNormal, type: ShadingType.CLEAR },
    margins: STYLE.cellMargins,
    children: [new Paragraph({
      children: parseInlineFormatting(text, { size: STYLE.sizes.table })
    })]
  });
}

// Cover page
function createCoverPage(config) {
  return [
    new Paragraph({ spacing: { before: STYLE.spacing.coverTopSpace }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRODUCT REQUIREMENTS DOCUMENT", bold: true, size: STYLE.sizes.coverTitle, color: STYLE.colors.coverTitle, font: STYLE.fonts.primary })] }),
    new Paragraph({ spacing: { before: STYLE.spacing.coverSectionSpace }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: config.productName, bold: true, size: STYLE.sizes.coverProduct, color: STYLE.colors.coverProduct, font: STYLE.fonts.primary })] }),
    new Paragraph({ spacing: { before: STYLE.spacing.coverMediumSpace }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Complete Specification", size: STYLE.sizes.coverSpec, color: STYLE.colors.coverSpec, font: STYLE.fonts.primary })] }),
    new Paragraph({ spacing: { before: STYLE.spacing.coverSectionSpace }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Version ${config.version}`, size: STYLE.sizes.coverText, font: STYLE.fonts.primary })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: config.date, size: STYLE.sizes.coverText, font: STYLE.fonts.primary })] }),
    new Paragraph({ spacing: { before: STYLE.spacing.coverSectionSpace }, children: [] }),
    // Organisation is optional: with none supplied the cover simply omits it.
    ...(config.organisation ? [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: config.organisation, bold: true, size: STYLE.sizes.coverText, font: STYLE.fonts.primary })] })
    ] : []),
    ...(config.classification ? [
      new Paragraph({ spacing: { before: STYLE.spacing.coverConfidentialSpace }, children: [] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: config.classification.toUpperCase(), bold: true, size: STYLE.sizes.confidential, color: STYLE.colors.confidential, font: STYLE.fonts.primary })] })
    ] : []),
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// Document control
function createDocumentControl(config) {
  const col1 = 3000, col2 = 6360;
  const data = [
    ["Document Title", `${config.productName} Product Requirements Document`],
    ["Version", config.version],
    ["Date", config.date],
    ["Prepared By", config.author],
    // Rows below are included only when the value exists — an absent
    // organisation must not leave an empty labelled row in the table.
    ...(config.organisation ? [["Organisation", config.organisation]] : []),
    ["Status", config.status],
    ...(config.classification ? [["Classification", config.classification]] : [])
  ];

  const rows = [new TableRow({ tableHeader: true, children: [createHeaderCell("Item", col1), createHeaderCell("Details", col2)] })];
  data.forEach((row, i) => rows.push(new TableRow({ children: [createDataCell(row[0], col1, i % 2 === 1), createDataCell(row[1], col2, i % 2 === 1)] })));

  return [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Document Control", bold: true })] }),
    new Table({ columnWidths: [col1, col2], rows }),
    // Document Control owns its page — the table of contents starts on the next.
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// TOC
function createTOC() {
  return [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "Table of Contents", bold: true })] }),
    new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// Parse markdown and convert to docx elements
function parseMarkdown(content) {
  const elements = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      elements.push(new Paragraph({
        shading: { fill: STYLE.colors.tableRowAlt, type: ShadingType.CLEAR },
        indent: { left: 360 },
        children: [new TextRun({ text: line || ' ', font: STYLE.fonts.code, size: STYLE.sizes.code })]
      }));
      continue;
    }

    // Tables
    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      if (!line.includes('---')) {
        tableRows.push(line.split('|').filter(c => c.trim()).map(c => c.trim()));
      }
      continue;
    } else if (inTable) {
      // End of table
      if (tableRows.length > 0) {
        const colWidth = Math.floor(9360 / tableRows[0].length);
        const rows = tableRows.map((row, rowIdx) => {
          const cells = row.map(cell =>
            rowIdx === 0
              ? createHeaderCell(cell, colWidth)
              : createDataCell(cell, colWidth, rowIdx % 2 === 0)
          );
          return new TableRow({ tableHeader: rowIdx === 0, children: cells });
        });
        elements.push(new Table({ columnWidths: Array(tableRows[0].length).fill(colWidth), rows }));
        elements.push(new Paragraph({ spacing: { before: 120 }, children: [] }));
      }
      inTable = false;
      tableRows = [];
    }

    // Thematic breaks are separators in the source, not content. Drop them —
    // previously they printed as a literal "---" line.
    if (isHorizontalRule(line)) continue;

    // Headings. The page break is suppressed when nothing has been emitted yet:
    // the caller already breaks after the table of contents, and two breaks in
    // a row produce a blank page.
    if (line.startsWith('# ')) {
      if (elements.length > 0) elements.push(new Paragraph({ children: [new PageBreak()] }));
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: parseInlineFormatting(line.slice(2), { bold: true })
      }));
    } else if (line.startsWith('## ')) {
      if (line.match(/^## \d+\./) && elements.length > 0) {
        elements.push(new Paragraph({ children: [new PageBreak()] }));
      }
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: parseInlineFormatting(line.slice(3), { bold: true })
      }));
    } else if (line.startsWith('### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: parseInlineFormatting(line.slice(4), { bold: true })
      }));
    } else if (line.startsWith('#### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: parseInlineFormatting(line.slice(5), { bold: true })
      }));
    } else if (line.startsWith('##### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_4,
        children: parseInlineFormatting(line.slice(6), { bold: true })
      }));
    }
    // Blockquotes — indented and italic rather than a literal ">".
    else if (line.match(/^>\s?/)) {
      elements.push(new Paragraph({
        indent: { left: 720 },
        spacing: { after: STYLE.spacing.bodyAfter },
        children: parseInlineFormatting(line.replace(/^>\s?/, ''), { italics: true, color: STYLE.colors.coverSubtitle })
      }));
    }
    // Bullet lists — nested first, or the two-space form is eaten by the
    // top-level pattern.
    else if (line.match(/^\s{2,}[-*] /)) {
      elements.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 1 },
        children: parseInlineFormatting(line.replace(/^\s+[-*] /, ''))
      }));
    } else if (line.match(/^[-*] /)) {
      elements.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: parseInlineFormatting(line.slice(2))
      }));
    }
    // Numbered lists
    else if (line.match(/^\d+\. /)) {
      elements.push(new Paragraph({
        numbering: { reference: "numbered-list", level: 0 },
        children: parseInlineFormatting(line.replace(/^\d+\. /, ''))
      }));
    }
    // Regular paragraphs — justified, which is the convention for a formal
    // specification and what stakeholders expect to see.
    else if (line.trim()) {
      elements.push(new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: STYLE.spacing.bodyAfter },
        children: parseInlineFormatting(line)
      }));
    }
  }

  return elements;
}

// Parse inline markdown into TextRuns.
//
// `base` supplies defaults every run inherits — size and colour for table cells,
// bold for headers, and so on — so the same parser serves body text, headings,
// list items and table cells. Call this anywhere text reaches the document;
// building a bare TextRun from a markdown line is how `**bold**` ends up printed
// literally in front of a stakeholder.
function parseInlineFormatting(text, base = {}) {
  const mk = (t, extra = {}) =>
    new TextRun({ font: STYLE.fonts.primary, ...base, ...extra, text: t });

  // Order matters: the longest delimiter must be tried first, or `**bold**`
  // is consumed as an italic run containing a stray asterisk.
  const RULES = [
    // Code first — its contents are literal and must not be parsed further.
    { re: /`([^`]+)`/,
      run: m => mk(m[1], { font: STYLE.fonts.code, size: base.size || STYLE.sizes.code, color: STYLE.colors.inlineCode }) },
    { re: /\*\*\*(.+?)\*\*\*/, run: m => mk(m[1], { bold: true, italics: true }) },
    { re: /___(.+?)___/,       run: m => mk(m[1], { bold: true, italics: true }) },
    { re: /\*\*(.+?)\*\*/,     run: m => mk(m[1], { bold: true }) },
    { re: /__(.+?)__/,         run: m => mk(m[1], { bold: true }) },
    { re: /<u>(.+?)<\/u>/i,    run: m => mk(m[1], { underline: {} }) },
    { re: /~~(.+?)~~/,         run: m => mk(m[1], { strike: true }) },
    // Single-delimiter emphasis. Three guards, each earning its place:
    //   (?<![\w*])      — not mid-word, so snake_case survives
    //   (?!\s) / (?<!\s) — no space just inside the delimiters, which is what
    //                      markdown requires and what stops "2 * 3 * 4" from
    //                      italicising " 3 "
    { re: /(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])/, run: m => mk(m[1], { italics: true }) },
    { re: /(?<![\w_])_(?!\s)([^_\n]+?)(?<!\s)_(?![\w_])/,   run: m => mk(m[1], { italics: true }) },
    // Links render as their label, styled as a link. The URL is dropped rather
    // than shown, because a printed PRD full of raw URLs reads badly.
    { re: /\[([^\]]+)\]\(([^)]+)\)/,
      run: m => mk(m[1], { color: STYLE.colors.hyperlink, underline: {} }) }
  ];

  const runs = [];
  let rest = text;

  while (rest.length > 0) {
    let best = null;
    for (const rule of RULES) {
      const m = rest.match(rule.re);
      // Strict `<` keeps RULES order as the tie-break when two rules match at
      // the same position — which is exactly the ** vs * case.
      if (m && (best === null || m.index < best.m.index)) best = { rule, m };
    }

    if (!best) { runs.push(mk(rest)); break; }
    if (best.m.index > 0) runs.push(mk(rest.slice(0, best.m.index)));
    runs.push(best.rule.run(best.m));
    rest = rest.slice(best.m.index + best.m[0].length);
  }

  return runs.length > 0 ? runs : [mk('')];
}

// A markdown thematic break (---, ***, ___, - - -). These are section
// separators in the source and must never reach the page as literal text.
function isHorizontalRule(line) {
  return /^\s*([-*_])(\s*\1){2,}\s*$/.test(line);
}

// Main function
async function generatePRD(config) {
  // Read markdown content
  const markdownContent = fs.readFileSync(config.inputFile, 'utf-8');

  // Parse markdown to docx elements
  const contentElements = parseMarkdown(markdownContent);

  // Build document
  const doc = new Document({
    styles,
    numbering,
    features: { updateFields: true },
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1)
          }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: `${config.productName} PRD v${config.version}${config.organisation ? ` | ${config.organisation}` : ''}`, color: STYLE.colors.headerFooter, size: STYLE.sizes.headerFooter, font: STYLE.fonts.primary })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Page ", color: STYLE.colors.headerFooter, size: STYLE.sizes.headerFooter, font: STYLE.fonts.primary }),
              new TextRun({ children: [PageNumber.CURRENT], color: STYLE.colors.headerFooter, size: STYLE.sizes.headerFooter, font: STYLE.fonts.primary }),
              new TextRun({ text: " of ", color: STYLE.colors.headerFooter, size: STYLE.sizes.headerFooter, font: STYLE.fonts.primary }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], color: STYLE.colors.headerFooter, size: STYLE.sizes.headerFooter, font: STYLE.fonts.primary })
            ]
          })]
        })
      },
      children: [
        ...createCoverPage(config),
        ...createDocumentControl(config),
        ...createTOC(),
        ...contentElements
      ]
    }]
  });

  // Save
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(config.outputFile, buffer);
  console.log(`SUCCESS: ${config.outputFile} created!`);
}

// Run
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node generate-prd.js <input.md> <output.docx> [options]');
  console.log('Options:');
  console.log('  --product-name "Name"');
  console.log('  --version "X.X"');
  console.log('  --date "Month Year"');
  console.log('  --author "Name"');
  console.log('  --status "Draft|Review"');
  process.exit(1);
}

const config = parseArgs(args);
generatePRD(config).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
