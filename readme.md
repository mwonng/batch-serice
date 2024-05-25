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

## We will be looking for:
- a well designed API
 usability as an external library
- good documentation/comments
- a well written, maintainable test suite

The requirements above leave some unanswered questions, so you will need to use your judgement
to design the most useful library. Our language preference is Go, but we want to see your best effort,
so please use whatever language you feel most comfortable with for this task.

## Assumption:
- This should only take care of batch not processing task.
- Batching requests by numbers and interval both whichever comes to meet first.
- Able to have a setting for batch number limit and interval.
- This lib won't care about how to process tasks in multiple theads or distributed system. processor will be mocked only.
