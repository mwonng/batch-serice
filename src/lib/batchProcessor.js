/**
 * This is a mock function that takes an array of tasks and a processor function as arguments.
 * @param {[Task]} tasks -  an array of tasks need to be excuted.
 * @param {function} processor  - a function that process a task and returns a promise.
 * @returns 
 */

export const batchProcessor = async (tasks, processor) =>
  Promise.allSettled(tasks.map((task, index) => processor(task)))
    .then((results) => results)
    .catch((error) => { console.error("error", error) });

