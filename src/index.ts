import * as express from "express";
import { config } from "./config";
import axios from "axios";

enum ChoiceType {
  NETWORK = "u_network",
  CATEGORY = "category",
}

async function main() {
  console.log("Hello World!");
  console.log(config);
  const networks = await getChoices(ChoiceType.NETWORK);
  const categories = await getChoices(ChoiceType.CATEGORY);
  const callerId = await getCallerId(config.example.exampleCallerId);
  console.log(networks);
  console.log(categories);
  console.log(callerId);

  // generate http get request
  const generatedIncidenResponse = await generateIncident(
    "בדיקת פתיחת תקלה עבור אמיר",
    "הרצה מלאה מתוך הסקריפט 2",
    config.example.exampleAssignmentGroup,
    config.example.exampleBusinessService,
    categories[0],
    callerId,
    config.example.exampleServiceOffering,
    networks[0]
  );
  console.log(generatedIncidenResponse);
}

main();

// Create a post request to the snow api using axios, with basic auth
// Generate an incident with the given parameters
async function generateIncident(
  description: string,
  short_description: string,
  assignment_group: string,
  business_service: string,
  caller_id: string,
  category: string,
  service_offering: string,
  u_network: string
): Promise<any> {
  const url = `http://${config.ip}:${config.port}/api/now/table/incident`;
  console.log(url);
  try {
    const response = await axios.post(
      url,
      {
        description,
        short_description,
        assignment_group,
        business_service,
        caller_id,
        category,
        service_offering,
        u_network,
      },
      {
        auth: {
          username: config.snow.username,
          password: config.snow.password,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return {};
}

// Create a get request to the snow api using axios, with basic auth
// Then, extract the choices from the "label" field
async function getChoices(choiceType: ChoiceType): Promise<any[]> {
  const url = `http://${config.ip}:${config.port}/api/now/table/sys_choice?element=${choiceType}&language=he&name=incident`;
  console.log(url);
  try {
    const response = await axios.get(url, {
      auth: {
        username: config.snow.username,
        password: config.snow.password,
      },
    });

    // Extract the networks from the "label" field
    const resultsArray = response.data.result.map(
      (resObject: any) => resObject.label
    );
    return resultsArray;
  } catch (error) {
    console.log(error);
  }

  return [];
}

// Translates the kartoffel id to the snow id
async function getCallerId(kartoffelId: string): Promise<string> {
  const url = `http://${config.ip}:${config.port}/api/now/table/sys_user?sysparm_query=u_uuid%3D${kartoffelId}`;
  console.log(url);
  try {
    const response = await axios.get(url, {
      auth: {
        username: config.snow.username,
        password: config.snow.password,
      },
    });

    const callerId = response?.data?.result[0]?.sys_id;
    if (!callerId) {
      throw new Error("No caller id found");
    }
    console.log(callerId);
    // Extract the networks from the "label" field

    return callerId;
  } catch (error) {
    console.log(error);
  }

  return "";
}
