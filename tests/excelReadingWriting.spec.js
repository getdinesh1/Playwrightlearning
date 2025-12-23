const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');

test('Excel Reading and Writing Test', async () => {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();

  // Add a worksheet
  const worksheet = workbook.addWorksheet('TestSheet');

  // Add data to the worksheet
  worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Email', key: 'email', width: 32 }
  ];

  worksheet.addRow({ id: 1, name: 'John Doe', email: 'john@example.com' });
  worksheet.addRow({ id: 2, name: 'Jane Smith', email: 'jane@example.com' });

  // Write to a file
  const filePath = 'test.xlsx';
  await workbook.xlsx.writeFile(filePath);

  // Read the file back
  const readWorkbook = new ExcelJS.Workbook();
  await readWorkbook.xlsx.readFile(filePath);

  const readWorksheet = readWorkbook.getWorksheet('TestSheet');

  // Assert the initial data
  expect(readWorksheet.getRow(2).getCell(1).value).toBe(1);
  expect(readWorksheet.getRow(2).getCell(2).value).toBe('John Doe');
  expect(readWorksheet.getRow(2).getCell(3).value).toBe('john@example.com');

  expect(readWorksheet.getRow(3).getCell(1).value).toBe(2);
  expect(readWorksheet.getRow(3).getCell(2).value).toBe('Jane Smith');
  expect(readWorksheet.getRow(3).getCell(3).value).toBe('jane@example.com');

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
      const cellValue = readWorksheet.getRow(actualRow).getCell(actualCol).value;
      console.log(`Row ${actualRow}, Col ${actualCol}: ${cellValue}`);

      // Find specific value in Name column and manipulate Email column
      if (actualCol === nameColumnIndex && cellValue === targetName) {
        readWorksheet.getRow(actualRow).getCell(emailColumnIndex).value = 'jane.updated@example.com';
        console.log(`Updated Email for ${targetName} in Row ${actualRow} to: ${readWorksheet.getRow(actualRow).getCell(emailColumnIndex).value}`);
        break; // Assuming only one match, break inner loop
      }
    }
  }

  // Write the modified data back to file
  await readWorkbook.xlsx.writeFile(filePath);

  // Read back to verify manipulation
  const manipulatedWorkbook = new ExcelJS.Workbook();
  await manipulatedWorkbook.xlsx.readFile(filePath);
  const manipulatedWorksheet = manipulatedWorkbook.getWorksheet('TestSheet');

  // Assert the manipulated data
  expect(manipulatedWorksheet.getRow(3).getCell(3).value).toBe('jane.updated@example.com');

  // Modify the data
  readWorksheet.getRow(2).getCell(2).value = 'John Updated';
  await readWorkbook.xlsx.writeFile(filePath);

  // Read the modified file back
  const modifiedWorkbook = new ExcelJS.Workbook();
  await modifiedWorkbook.xlsx.readFile(filePath);

  const modifiedWorksheet = modifiedWorkbook.getWorksheet('TestSheet');

  // Assert the modified data
  expect(modifiedWorksheet.getRow(2).getCell(2).value).toBe('John Updated');

  // Clean up: delete the file (optional, for test isolation)
  // const fs = require('fs');
  // if (fs.existsSync(filePath)) {
  //   fs.unlinkSync(filePath);
  // } // Commented out to keep the file for inspection
});
