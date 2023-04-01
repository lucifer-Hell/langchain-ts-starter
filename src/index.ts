
import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, Calculator, DynamicTool } from "langchain/tools";
const model = new OpenAI({ temperature: 0 });
const now = new Date();
const hours = now.getHours() % 12 || 12;
const minutes = now.getMinutes().toString().padStart(2, "0");
const seconds = now.getSeconds().toString().padStart(2, "0");
const amPm = now.getHours() >= 12 ? "PM" : "AM";
const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
// console.log(currentTime);

const tools = [new DynamicTool({
  name: "timeCheck",
  description:
    "use this tool more then normal whenever user is asking for current time ",
  func: async () =>{
    
     return currentTime
    } ,
}),new SerpAPI(), new Calculator()];

const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description",
  false
);
console.log("Loaded agent.");
const args = process.argv.slice(2);
const combinedArgs = args.join(' ');
const input =combinedArgs;
console.log(`Executing with input "${input}"...`);
const result = await executor.call({ input });

console.log(`${result.output}`);