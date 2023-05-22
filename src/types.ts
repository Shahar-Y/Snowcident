/**
 * The most important type to understand - Includes all of the required fields for the incident.
 */
export type IncidentRequest = {
  description: string; // Filled by the user
  short_description: string; // Filled by the user
  assignment_group: string; // Unique, get it from the Snow supporter - The team that will get the incident
  business_service: string; // Unique, get it from the Snow supporter - The service that the organization gies: audio/messages/...
  caller_id: string; // Get it from the sys_id of the user by calling GET http://<IP>:<PORT>/api/now/table/sys_user?sysparm_query=u_uuid%3D<KartoffelID>
  category: string; // Category in hebrew, the name is unique get from GET http://<IP>:<PORT>/api/now/table/sys_choice?element=category&language=he&name=incident
  service_offering: string; // Depends on the business service. reference. Unique, get it from the Snow supporter. This is the sys_id of your application
  u_network: string; // Which network you are using currently. Choice: http://<IP>:<PORT>/api/now/table/sys_choice?element=u_network&language=he&name=incident ==> label
  /**
   * OTHER FIELDS
   */
  // subcategory: string | null; // Not mandatory
  // contact_type: string | null; // Not mandatory
  // cmdb_ci: string | null; // Not mandatory
  // priority: string | null; // Not mandatory, Defaults to medium
};

// Helps prevent code duplication since the API is the same for all of the choices
export enum ChoiceType {
  NETWORK = "u_network",
  CATEGORY = "category",
}
