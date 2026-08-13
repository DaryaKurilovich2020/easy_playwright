export const getNodeUniqueName = (prefix: string = "Node"): string => {
  return `${prefix}_${Date.now()}`;
};

export const getAutomationProcessUniqueName = (prefix: string = "Automation Process"): string => {
  return `${prefix}_${Date.now()}`;
};

