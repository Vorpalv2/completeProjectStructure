import { connectToServer } from "./app.js";
import { connectTODB } from "./src/db/mongoose.db.js";

connectTODB().then(() => {
  console.log(`connected to the database`);
  connectToServer();
});
