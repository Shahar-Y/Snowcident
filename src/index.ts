import { config } from "./config";
import { app } from "./router";

async function main() {
  console.log("Starting Main!");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

main();
