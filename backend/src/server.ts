import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}✅ 
Link: http://localhost:3000/`);
});
