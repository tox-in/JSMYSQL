const fs = require("fs");
const mysql = require("mysql");

// MySQL database connection parameters
const dbConfig = {
  host: "localhost", //your host
  user: "root", //your db username
  password: "", //your db password
  database: "employee", //your db name
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Open the CSV file
fs.readFile("employees_202309130449.csv", "utf8", (err, data) => {
  //employees_202309130449.csv is my csv file name
  if (err) {
    console.error(err);
    return;
  }

  // Split the CSV data into an array of rows
  const rows = data.split("\n");

  // Remove the header row if it exists
  if (rows.length > 0) {
    rows.shift(); // Remove the header row
  }

  // Loop through each row and insert it into the MySQL table
  rows.forEach((row) => {
    const values = row.split(",");

    // Customize the query to match your table structure
    const insertQuery = `
      INSERT INTO employeed (emp_no, birth_date, first_name, last_name, gender, hire_date) 
      VALUES (?, ?, ?, ?, ?, ?)
    `; //table, column names inside blackets

    // Execute the INSERT query
    connection.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error(error);
      }
    });
  });

  // Close the MySQL connection
  connection.end((err) => {
    if (err) {
      console.error(err);
    }
  });
});
