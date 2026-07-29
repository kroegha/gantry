/**
 * Gantry document style constants.
 *
 * Neutral defaults for generated Word documents. Every key here is consumed by
 * generate-prd.js — rename nothing, remove nothing. To match a house style,
 * change the values in place (this file is the single point of visual control)
 * or point the generator at your own module exporting the same shape.
 *
 * Usage:
 *   const STYLE = require('./style-constants.js');
 *   STYLE.colors.heading1; // "1f2937"
 */

const STYLE = {
  // Colour palette (hex without #). Neutral slate/steel — no brand identity.
  colors: {
    // Headings
    heading1: "1f2937",      // Near-black slate
    heading2: "334155",      // Dark steel
    heading3: "3f4a5a",      // Mid slate
    heading4: "334155",      // Dark steel (italic)

    // Table styling
    tableHeader: "1f2937",       // Header background
    tableHeaderText: "FFFFFF",   // White text on headers
    tableRowAlt: "f5f6f8",       // Zebra stripe
    tableRowNormal: "FFFFFF",    // Normal row
    tableBorder: "d4d7dd",       // Light borders

    // Header/Footer
    headerFooter: "6b7280",      // Gray text

    // Links
    hyperlink: "1d4ed8",         // Blue underlined

    // Callouts/Notes
    noteBackground: "f4f4f5",    // Neutral note background
    noteText: "3f3f46",          // Note text

    // Cover page
    coverTitle: "1f2937",
    coverProduct: "334155",
    coverSubtitle: "52606d",
    coverSpec: "5b6673",
    coverEdition: "6b7280",

    // Special
    confidential: "9f1239",      // Deep red
    inlineCode: "9d174d"         // Code accent
  },

  // Font sizes (half-points: divide by 2 for pt)
  sizes: {
    // Cover page
    coverTitle: 48,      // 24pt
    coverProduct: 44,    // 22pt
    coverSpec: 28,       // 14pt
    coverText: 24,       // 12pt
    coverTrading: 22,    // 11pt
    confidential: 20,    // 10pt

    // Headings
    heading1: 32,        // 16pt
    heading2: 28,        // 14pt
    heading3: 24,        // 12pt
    heading4: 22,        // 11pt

    // Body text
    body: 22,            // 11pt
    table: 20,           // 10pt
    headerFooter: 18,    // 9pt
    code: 18             // 9pt
  },

  // Spacing (DXA — twentieths of a point)
  spacing: {
    heading1Before: 400,
    heading1After: 200,
    heading2Before: 300,
    heading2After: 150,
    heading3Before: 250,
    heading3After: 100,
    heading4Before: 200,
    heading4After: 80,

    bodyAfter: 120,
    noteBeforeAfter: 150,

    tableCellTop: 80,
    tableCellLeft: 120,
    tableCellBottom: 80,
    tableCellRight: 120,

    coverTopSpace: 1800,
    coverSectionSpace: 500,
    coverSmallSpace: 100,
    coverMediumSpace: 300,
    coverConfidentialSpace: 400,
    coverTradingSpace: 50
  },

  // Page margins (DXA) — 1 inch all round
  margins: {
    top: 1440,
    right: 1440,
    bottom: 1440,
    left: 1440
  },

  // Fonts. Both are safe defaults present on Windows and macOS.
  fonts: {
    primary: "Calibri",
    code: "Consolas"
  }
};

// Derived helpers
STYLE.tableBorderStyle = {
  style: 'single',
  size: 1,
  color: STYLE.colors.tableBorder
};

STYLE.cellBorders = {
  top: STYLE.tableBorderStyle,
  bottom: STYLE.tableBorderStyle,
  left: STYLE.tableBorderStyle,
  right: STYLE.tableBorderStyle
};

STYLE.cellMargins = {
  top: STYLE.spacing.tableCellTop,
  left: STYLE.spacing.tableCellLeft,
  bottom: STYLE.spacing.tableCellBottom,
  right: STYLE.spacing.tableCellRight
};

module.exports = STYLE;
