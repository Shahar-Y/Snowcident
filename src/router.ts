import express, { Express, Request, Response } from "express";
import { ChoiceType, IncidentRequest } from "./types";
import { generateIncident, getChoices, getCallerId } from "./auxFunctions";
import { config } from "./config";
import bodyParser from "body-parser";
export const app: Express = express();

app.use(bodyParser.json());

// Create a new incident. See the types.ts file for the required fields.`
app.post("/createIncident", async (req: Request, res: Response) => {
  console.log("Creating incident. body:");
  console.log(req.body);

  const IncidentRequest: IncidentRequest = {
    description: req.body.description || "Description",

    short_description: req.body.short_description || "Short description",

    assignment_group:
      req.body.assignment_group || config.example.exampleAssignmentGroup,

    business_service:
      req.body.business_service || config.example.exampleBusinessService,

    caller_id:
      req.body.caller_id || (await getCallerId(config.example.exampleCallerId)),

    category: req.body.category || (await getChoices(ChoiceType.CATEGORY))[0],

    service_offering:
      req.body.service_offering || config.example.exampleServiceOffering,

    u_network: req.body.u_network || (await getChoices(ChoiceType.NETWORK))[0],
  };

  console.log("Incident request: ", IncidentRequest);

  const generatedIncidenResponse = await generateIncident(IncidentRequest);

  console.log("Generated incident response: ", generatedIncidenResponse);

  res.send(generatedIncidenResponse);
});
