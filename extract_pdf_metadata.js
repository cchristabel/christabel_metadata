// Import the fork module
import pdfParse from 'pdf-parse-fork';

import mysql from 'mysql2/promise';
//Importera file system (fs) - inbyggt i node.js
import fs from 'fs';
 
// Ger oss en lista på alla filerna i mappen
let files = fs.readdirSync('./client/pdfs/');
 
// Kopplar oss till databasen
const db = await mysql.createConnection({
    host: '161.97.144.27',
    port: "8094",
    user: 'root',
    password: 'guessagain94',
    database: 'christabel_metadata'
  });

// Funktion för att skapa querys
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}
 
// loop through all pdfs files and read metadata
for (let file of files) {

  // extract all data/metadata from the pdf
  let data = await pdfParse(fs.readFileSync('./client/pdfs/' + file));


  // create a new object which only contains the parts I'm interested in.
  // there are other parts we don't use:
  // numrender, metadata, version,
  let metadata = {
    numpages: data.numpages,
    info: data.info
  };

  // get the full text of the pdf as well
  let fullText = data.text;

  // todo - thing we might want to do with the data
  // when we write it to a table in the database

  // todo: write to a column of type varchar
  console.log(data);

  // todo: write to a column of type json
  console.log(metadata);

  // todo: write to a column of type LONGTEXT
  console.log(fullText);

 
  // Sätt in i databasen med hjälp av query funktionen
  let result = await query(`
    INSERT INTO pdfs (name, description)
    VALUES(?, ?)
  `, [file, metadata]);
 
  // Logga resultatet för att se att något händer.
  console.log(file, result);
 
}
 
// Automatisk stop när det är klart, annars tror VSC
// att något mer ska skickas in då vi är kopplade till databasen.
process.exit();