import "dotenv/config"; //with the latest version of ES6 dotenv.config() is not compatible so this
import app from "./app.js";
// also if you want to test a file with env using npx tsx filename.ts
// either do it in the right directory --> root for env (backend) to load properly and then the command or run the server using npm run dev else,,,
// npx tsx src/config/env.ts this will work and others wont and during testing you'll have to use
// import "dotenv/config" on the file you're trying to test and requires a env variable value
import { env } from "./config/env.js";

const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}✅ 
Link: http://localhost:3000/`);
});
