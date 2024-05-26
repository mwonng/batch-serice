## Requirement
Micro-batching is a technique used in processing pipelines where individual tasks are grouped
together into small batches. This can improve throughput by reducing the number of requests made
to a downstream system. Your task is to implement a micro-batching library, with the following
requirements:

- it should allow the caller to submit a single Job, and it should return a JobResult
- it should process accepted Jobs in batches using a BatchProcessor
  - Don't implement BatchProcessor. This should be a dependency of your library.
- it should provide a way to configure the batching behaviour i.e. size and frequency
- it should expose a shutdown method which returns after all previously accepted Jobs are
processed

## How to run

### Requirement:
Since it is a Node application, it needs Node version >= 16.15,
Refer how to install Node [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

### Usage:
You can import BatchService:
```js
import BatchService from 'XXXX'

// Initialize service:
// params:
//  - batch queue limits
//  - batch expired time in miliseconds
//  - handler for single task
const batchServce = new BatchService(3, 500, singleTaskHandler);

// dispatch/add a task

batchServce.dispatch("1");

// shutdown batch service and show previous task list
batchServce.shutdown()
```

You can also run demo in termianl into root folder of this repo:
```shell
## before run, you might need to run npm install or yarn 
$ node demo.js
```

## Assumption:
- This should only take care of batch not processing task.
- Batching requests by numbers and interval both whichever comes to meet first.
- Able to have a setting for batch number limit and interval.
- This lib won't care about how to process tasks in multiple theads or distributed system. processor will be mocked only.
- Request error handler should be in batchProcessor, and batchProcessor will return the responses if it's response is good, and if response is bad, promise will reject.

## Improvement not done:
- Task/Job return on every time they send request to server, and if it is not been send yet, the request will not able to get result, this can be improve by a state management and set a timeout waiting for the incoming call or current timer to be excuted and then return it.
