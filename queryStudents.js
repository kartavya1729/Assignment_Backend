const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb://localhost:27017"; // Local MongoDB server
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("schoolDB");
    const students = db.collection("students");

    // Query to find students who are not enrolled or whose grade is less than "C"
    const unenrolledOrLowGrade = await students.find(
      {
        $or: [
          { enrolled: false },
          { grade: { $lt: "C" } }
        ]
      },
      {
        projection: { _id: 0, name: 1, enrolled: 1, grade: 1 }
      }
    ).toArray();

    console.log("Unenrolled or Low Grade Students:", unenrolledOrLowGrade);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
