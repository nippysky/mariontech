import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "y1vdiofe",
  dataset: "production",
  apiVersion: "2023-01-27",
  useCdn: false,
});

const imageBuilder = ImageUrlBuilder(client);
const urlFor = (source) => imageBuilder.image(source);

export default urlFor;
