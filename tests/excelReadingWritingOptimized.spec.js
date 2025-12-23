const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');
const fs = require('fs');

// Utility functions for Excel operations
function createWorkbook() {
  return new ExcelJS.Workbook();
}

function addWorksheet(workbook, name) {
  return workbook.addWorksheet(name);
}

function addColumns(worksheet, columns) {
  worksheet.columns = columns;
}

function addRow(worksheet, data) {
  worksheet.addRow(data);
}

async function writeToFile(workbook, path) {
  await workbook.xlsx.writeFile(path);
}

async function readFromFile(path) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);
  return workbook;
}

function getWorksheet(workbook, name) {
  return workbook.getWorksheet(name);
}

function modifyCell(worksheet, row, col, value) {
  worksheet.getRow(row).getCell(col).value = value;
}

function getCellValue(worksheet, row, col) {
  return worksheet.getRow(row).getCell(col).value;
}

function cleanupFile(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

test('Excel Reading, Writing, and Modifying Test (Optimized)', async () => {
  const filePath = 'test_optimized.xlsx';

  // Create workbook and worksheet
  const workbook = createWorkbook();
  const worksheet = addWorksheet(workbook, 'TestSheet');

  // Add columns and data
  addColumns(worksheet, [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Email', key: 'email', width: 32 }
  ]);

  addRow(worksheet, { id: 1, name: 'John Doe', email: 'john@example.com' });
  addRow(worksheet, { id: 2, name: 'Jane Smith', email: 'jane@example.com' });

  // Write to file
  await writeToFile(workbook, filePath);

  // Read from file
  const readWorkbook = await readFromFile(filePath);
  const readWorksheet = getWorksheet(readWorkbook, 'TestSheet');

  // Assert initial data
  expect(getCellValue(readWorksheet, 2, 1)).toBe(1);
  expect(getCellValue(readWorksheet, 2, 2)).toBe('John Doe');
  expect(getCellValue(readWorksheet, 2, 3)).toBe('john@example.com');

  expect(getCellValue(readWorksheet, 3, 1)).toBe(2);
  expect(getCellValue(readWorksheet, 3, 2)).toBe('Jane Smith');
  expect(getCellValue(readWorksheet, 3, 3)).toBe('jane@example.com');

  // Nested loops to iterate through rows and columns, find specific values, then manipulate
  const targetName = 'Jane Smith';
  const nameColumnIndex = 2; // Assuming Name is column 2 (1-based)
  const emailColumnIndex = 3; // Assuming Email is column 3 (1-based)
  const totalRows = readWorksheet.rowCount;
  const totalColumns = readWorksheet.columns.length;

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    for (let colIndex = 0; colIndex < totalColumns; colIndex++) {
      const actualRow = rowIndex + 1; // Convert to 1-based for ExcelJS
      const actualCol = colIndex + 1; // Convert to 1-based for ExcelJS
      const cellValue = getCellValue(readWorksheet, actualRow, actualCol);
      console.log(`Row ${actualRow}, Col ${actualCol}: ${cellValue}`);

      // Find specific value in Name column and manipulate Email column
      if (actualCol === nameColumnIndex && cellValue === targetName) {
        modifyCell(readWorksheet, actualRow, emailColumnIndex, 'jane.updated@example.com');
        console.log(`Updated Email for ${targetName} in Row ${actualRow} to: ${getCellValue(readWorksheet, actualRow, emailColumnIndex)}`);
        break; // Assuming only one match, break inner loop
      }
    }
  }

  // Write the modified data back to file
  await writeToFile(readWorkbook, filePath);

  // Read back to verify manipulation
  const manipulatedWorkbook = await readFromFile(filePath);
  const manipulatedWorksheet = getWorksheet(manipulatedWorkbook, 'TestSheet');

  // Assert the manipulated data
  expect(getCellValue(manipulatedWorksheet, 3, 3)).toBe('jane.updated@example.com');

  // Modify data
  modifyCell(readWorksheet, 2, 2, 'John Updated');
  await writeToFile(readWorkbook, filePath);

  // Read modified file
  const modifiedWorkbook = await readFromFile(filePath);
  const modifiedWorksheet = getWorksheet(modifiedWorkbook, 'TestSheet');

  // Assert modified data
  expect(getCellValue(modifiedWorksheet, 2, 2)).toBe('John Updated');

  // Clean up
  // cleanupFile(filePath); // Commented out to keep the file for inspection
});