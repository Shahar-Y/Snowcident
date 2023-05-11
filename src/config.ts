import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  port: process.env.PORT || 3000,
  ip: process.env.IP || "xxx.xxx.xxx.xxx",
  snow: {
    username: process.env.SNOW_USERNAME || "userName",
    password: process.env.SNOW_PASSWORD || "Password!",
  },
  example: {
    exampleCallerId: process.env.EXAMPLE_CALLER_ID || "ECIDValue",
    exampleBusinessService: process.env.EXAMPLE_BUSINESS_SERVICE || "EBSValue",
    exampleAssignmentGroup: process.env.EXAMPLE_ASSIGNMENT_GROUP || "EAGValue",
    exampleServiceOffering: process.env.EXAMPLE_SERVICE_OFFERING || "ESOValue",
  },
};
