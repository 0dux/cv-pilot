//@ts-ignore
import dotenv from "dotenv/config"; 
//I had to config this way cause of some import issue, Tried importing dotenv before everything else. But that issue persisted cause of type:"module" something this caused so now I'm done with connecting to cloudinary.
import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}✅ 
Link: http://localhost:3000/`);
});
