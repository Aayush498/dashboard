import { AnalysisData } from '@/types';

/**
 * Export data as CSV
 */
export function exportAsCSV(data: Record<string, any>[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        })
        .join(',')
    ),
  ].join('\n');

  downloadFile(csv, `${filename}.csv`, 'text/csv');
}

/**
 * Export data as JSON
 */
export function exportAsJSON(data: any, filename: string) {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${filename}.json`, 'application/json');
}

/**
 * Export analysis results as structured text
 */
export function exportAnalysisAsText(analysis: AnalysisData, filename: string) {
  const text = `
PAYER POLICY ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

FILE INFORMATION
================
Name: ${analysis.fileName}
Size: ${analysis.fileSize} bytes
Timestamp: ${analysis.timestamp}

DATASET SUMMARY
===============
Total Rows: ${analysis.total_rows}
Total Columns: ${analysis.total_columns}

ACCESS DISTRIBUTION
===================
${Object.entries(analysis.access_distribution)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

AI-GENERATED INSIGHTS
====================
${analysis.ai_analysis}
  `;

  downloadFile(text.trim(), `${filename}.txt`, 'text/plain');
}

/**
 * Download file helper
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export chart as PNG (requires html2canvas to be installed)
 */
export async function exportChartAsPNG(
  elementId: string,
  filename: string
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID ${elementId} not found`);
      return;
    }

    // Note: To enable this feature, install html2canvas:
    // npm install html2canvas
    // Then uncomment the code below

    /*
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */

    console.log('Export PNG not yet implemented. Install html2canvas to enable.');
  } catch (error) {
    console.error('Error exporting chart:', error);
  }
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate report filename with timestamp
 */
export function generateReportFilename(basenamename: string): string {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${basenamename}-${timestamp}`;
}
