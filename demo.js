
import { BatchService } from "./src/batchService.js";
import { singleTaskHandler, sleep } from "./src/helpers/index.js";

console.log("batch 5 requests, to be batched in 3s and 500ms timeout")


const batchServce = new BatchService(3, 500, singleTaskHandler);

batchServce.dispatch("1");
batchServce.dispatch("2");
batchServce.dispatch("3");
batchServce.dispatch("4");
batchServce.dispatch("5");


setTimeout(() => {
  console.log("--- list batched tasks ---")
  console.log(batchServce.shutdown())
}, 1000)
