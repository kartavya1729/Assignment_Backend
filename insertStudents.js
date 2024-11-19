const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb://localhost:27017"; // Local MongoDB server
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("schoolDB"); // Database name
    const students = db.collection("students"); // Collection name

    // Insert sample student data
    await students.insertMany([
      { name: "Alice", enrolled: true, grade: "A" },
      { name: "Bob", enrolled: false, grade: "B" },
      { name: "Charlie", enrolled: true, grade: "D" },
      { name: "David", enrolled: false, grade: "F" },
      { name: "Eva", enrolled: true, grade: "C" },
      { name: "Frank", enrolled: false, grade: "B" },
      { name: "Grace", enrolled: true, grade: "E" }
    ]);

    console.log("Sample student data inserted.");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
