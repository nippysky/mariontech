import { createClient } from "next-sanity";

const client = createClient({
  projectId: "y1vdiofe",
  dataset: "production",
  apiVersion: "2023-01-27",
  useCdn: false,
});

export default client;
