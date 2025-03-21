import docsData from './docs.json';

const updatedDocsData = Object.fromEntries(Object.entries(docsData).map(([key, value]) => [key, [{ ...value[0], source: key }]]));

export { updatedDocsData as docs };
