// import file system module
import fs from 'fs';

// import the musicMetadata
import musicMetadata from 'music-metadata';
// Import the database driver
import mysql from 'mysql2/promise';

// Databse connection
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

// read all file names from the Music fodler
const files = await fs.readdirSync('./client/music/');

// loop through all music files and read metadata
for (let file of files) {

  // Get the metadata for the file
  let metadata = await musicMetadata.parseFile('./client/music/' + file);

  // delete (in-memory) some parts of the metadata
  delete metadata.native;
  delete metadata.quality;
  delete metadata.common.disk;

  // INSERT TO DATABASE
  let result = await query(`
    INSERT INTO music (name, description)
    VALUES(?, ?)
  `, [file, metadata]);

  // Log the result of inserting in the database
  console.log(file, result);

}
process.exit();