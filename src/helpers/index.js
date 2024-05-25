/**
 * This is functeion simulate handler for processing a single task
 * @param {Task} task - pass a Task object to the function
 * @returns Task
 */
export const singleTaskHandler = (task) => {
  return task;
}

/**
 * This is a helper function to simulate a delay
 * @param {number} ms - pass a number in milliseconds
 * @returns Promise
 */
export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
