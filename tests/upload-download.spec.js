const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');
//const test = require('node:test');

async function writeExcelTest(searchText,replaceText,change,filePath)
{

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
   
async function readExcel(worksheet, searchText)
{
    let output = {row:-1, column: -1};
    worksheet.eachRow((row,rowNumber)=>
      {
         row.eachCell((cell,colNumber)=>
         {
            //console.log(cell.value);  //this print the entire table
            if(cell.value === searchText)   //to track a particular iten and its position in the table
            {
                // console.log(rowNumber);
                // console.log(colNumber);   
                //To get dynamic values of rows and columns
                output.row= rowNumber;
                output.column= colNumber;
            }
         })
      })
    return output;
}
    
//update Mango price to 350
//writeExcelTest("Banana","Republic","/Users/smohapatra/downloads/excelTest.xlsx");  //Banana is the searchTeaxt that is added in the argument
//"Republic" is the replaceText argument, filePath is the file directory path//
//update--->
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/smohapatra/downloads/excelTest.xlsx");

//Assertions
test('upload download excel validation', async({page})=>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise;
    writeExcelTest(textSearch,350,{rowChange:0,colChange:2},"/Users/smohapatra/downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/smohapatra/downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has:textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})
