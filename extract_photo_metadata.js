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

//Function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

// read all file names from the images folder
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
// Automatic stop when done, so VSC doesn't think we are going to be sending in more data when connceted to the database.
process.exit();