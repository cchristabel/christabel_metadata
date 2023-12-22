// Import the fork module
import pdfParse from 'pdf-parse-fork';

import mysql from 'mysql2/promise';
//Import file system fs
import fs from 'fs';
 
// Give us a list of the files in the map
let files = fs.readdirSync('./client/pdfs/');
 
// Connecting to database
const db = await mysql.createConnection({
    host: '161.97.144.27',
    port: "8094",
    user: 'root',
    password: 'guessagain94',
    database: 'christabel_metadata'
  });

// Function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
 
// loop through all pdfs files and read metadata
for (let file of files) {

  // extract all data/metadata from the pdf
  let data = await pdfParse(fs.readFileSync('./client/pdfs/' + file));


  // create a new object which only contains the parts I'm interested in.
  let metadata = {
    numpages: data.numpages,
    info: data.info
  };

  // get the full text of the pdf as well
  let fullText = data.text;

  // todo: write to a column of type varchar
  console.log(data);

  // todo: write to a column of type json
  console.log(metadata);

  // todo: write to a column of type LONGTEXT
  console.log(fullText);

 
  // Inserting into database
  let result = await query(`
    INSERT INTO pdfs (name, description)
    VALUES(?, ?)
  `, [file, metadata]);
 
  // Log results
  console.log(file, result);
 
}
 
process.exit();