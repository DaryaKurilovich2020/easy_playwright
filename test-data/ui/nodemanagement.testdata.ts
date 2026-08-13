import { getNodeUniqueName } from "../../helpers/utils";

export const NODE_MANAGEMENT_DATA = {
  Name: getNodeUniqueName("Node"),
  Description: "Test",
  "Working Directory": "Test",
};

export const UPDATED_NODE_MANAGEMENT_DATA = {
  Description: "Test_Update",
  "Working Directory": "Test_Update",
};