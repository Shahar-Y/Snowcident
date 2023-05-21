import express, { Express, Request, Response } from "express";
import { ChoiceType } from "./types";
import { generateIncident, getChoices, getCallerId } from "./auxFunctions";
import { config } from "./config";
import bodyParser from "body-parser";
export const app: Express = express();

app.use(bodyParser.json());

app.post("/createIncident", async (req: Request, res: Response) => {
  const description = req.body.description || "Description";
  const short_description = req.body.short_description || "Short description";
  const assignment_group =
    req.body.assignment_group || config.example.exampleAssignmentGroup;
  const business_service =
    req.body.business_service || config.example.exampleBusinessService;
  const caller_id =
    req.body.caller_id || (await getCallerId(config.example.exampleCallerId));
  const category =
    req.body.category || (await getChoices(ChoiceType.CATEGORY))[0];
  const service_offering =
    req.body.service_offering || config.example.exampleServiceOffering;
  const u_network =
    req.body.u_network || (await getChoices(ChoiceType.NETWORK))[0];

  const generatedIncidenResponse = await generateIncident(
    description,
    short_description,
    assignment_group,
    business_service,
    caller_id,
    category,
    service_offering,
    u_network
  );

  res.send(generatedIncidenResponse);
});
