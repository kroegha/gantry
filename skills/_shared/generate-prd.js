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
      children: [new TextRun({ text, bold: true, color: STYLE.colors.tableHeaderText, size: STYLE.sizes.table, font: STYLE.fonts.primary })]
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
      children: [new TextRun({ text, size: STYLE.sizes.table, font: STYLE.fonts.primary })]
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
    new Paragraph({ spacing: { before: 200 }, children: [] })
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

    // Headings
    if (line.startsWith('# ')) {
      elements.push(new Paragraph({ children: [new PageBreak()] }));
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.slice(2), bold: true })]
      }));
    } else if (line.startsWith('## ')) {
      if (line.match(/^## \d+\./)) {
        elements.push(new Paragraph({ children: [new PageBreak()] }));
      }
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: line.slice(3), bold: true })]
      }));
    } else if (line.startsWith('### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: line.slice(4), bold: true })]
      }));
    } else if (line.startsWith('#### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun({ text: line.slice(5), bold: true })]
      }));
    } else if (line.startsWith('##### ')) {
      elements.push(new Paragraph({
        heading: HeadingLevel.HEADING_4,
        children: [new TextRun({ text: line.slice(6), bold: true })]
      }));
    }
    // Bullet lists
    else if (line.match(/^[-*] /)) {
      elements.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: line.slice(2), font: STYLE.fonts.primary })]
      }));
    } else if (line.match(/^  [-*] /)) {
      elements.push(new Paragraph({
        numbering: { reference: "bullet-list", level: 1 },
        children: [new TextRun({ text: line.slice(4), font: STYLE.fonts.primary })]
      }));
    }
    // Numbered lists
    else if (line.match(/^\d+\. /)) {
      elements.push(new Paragraph({
        numbering: { reference: "numbered-list", level: 0 },
        children: [new TextRun({ text: line.replace(/^\d+\. /, ''), font: STYLE.fonts.primary })]
      }));
    }
    // Regular paragraphs
    else if (line.trim()) {
      elements.push(new Paragraph({
        spacing: { after: STYLE.spacing.bodyAfter },
        children: parseInlineFormatting(line)
      }));
    }
  }

  return elements;
}

// Parse inline formatting (bold, italic, code)
function parseInlineFormatting(text) {
  const runs = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/);
    // Code
    const codeMatch = remaining.match(/`(.+?)`/);

    const matches = [
      boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index } : null,
      italicMatch ? { type: 'italic', match: italicMatch, index: italicMatch.index } : null,
      codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index } : null
    ].filter(m => m !== null).sort((a, b) => a.index - b.index);

    if (matches.length === 0) {
      runs.push(new TextRun({ text: remaining, font: STYLE.fonts.primary }));
      break;
    }

    const first = matches[0];
    if (first.index > 0) {
      runs.push(new TextRun({ text: remaining.slice(0, first.index), font: STYLE.fonts.primary }));
    }

    if (first.type === 'bold') {
      runs.push(new TextRun({ text: first.match[1], bold: true, font: STYLE.fonts.primary }));
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === 'italic') {
      runs.push(new TextRun({ text: first.match[1], italics: true, font: STYLE.fonts.primary }));
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === 'code') {
      runs.push(new TextRun({ text: first.match[1], font: STYLE.fonts.code, size: STYLE.sizes.code, color: STYLE.colors.inlineCode }));
      remaining = remaining.slice(first.index + first.match[0].length);
    }
  }

  return runs;
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
