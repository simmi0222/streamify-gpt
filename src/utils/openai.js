import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  // apiKey: process.env['OPENAI_API_KEY'],
  dangerouslyAllowBrowser: true,  // using this we can make the api call from browser/frontend side
});

export default openai;
