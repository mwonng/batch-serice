/**
 * This is functeion simulate handler for processing a single task
 * @param {Task} task - pass a Task object to the function
 * @returns Task
 */
export const singleTaskHandler = (task) => {
  return task;
}

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
