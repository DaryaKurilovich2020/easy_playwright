export const getNodeUniqueName = (prefix: string = 'Node'): string => {
    return `${prefix}_${Date.now()}`;
};