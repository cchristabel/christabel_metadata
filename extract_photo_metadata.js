// import file system module
import fs from 'fs';
import exifr from 'exifr';
import mysql from 'mysql2/promise';

let images = fs.readdirSync('./client/images/');

const db = await mysql.createConnection({
  host: '161.97.144.27', 
  port: '8094',               
  user: 'root',
  password: 'guessagain94',  
  database: 'christabel_metadata'
});

// A small function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

// read all file names from the images fodler
const files = await fs.readdirSync('./client/images/');


// loop through all images files and read metadata
for (let image of images) {

  // Get the metadata for the file
  let metadata = await exifr.parse('./client/images/' + image);

  // INSERT TO DATABASE
  let result = await query(`
    INSERT INTO photos (name, description)
    VALUES(?, ?)
  `, [image, metadata]);

  // Log the result of inserting in the database
  console.log(image, result);

}

// exit/stop the script when everything is imported
// so you don't have to press Ctrl+C
process.exit();