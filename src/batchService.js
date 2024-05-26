import { batchProcessor } from './lib/batchProcessor.js';

export class BatchService {
  constructor(batchSize = 3, interval = 1000, taskProcessor) {
    this.batchSize = batchSize;
    this.interval = interval;
    this.taskProcessor = taskProcessor;
    this.timer = null;
    this.taskQueue = [];  // tasks waiting for processing
    this.history = [];  // processed tasks by chunks
  }

  /**
   * 
   * @param {Task} task - pass a single task to the batch service 
   * @returns - return a queue of tasks if batch service process the small chunk
   */
  async dispatch(task) {
    if (task) {
      this.taskQueue.push(task);
    }

    if (this.taskQueue.length === 0) {
      return;
    }

    return await this.waitForResults(task)
  }

  // schedule the task to be sent later with interval
  sendLater() {
    return new Promise((resolve, reject) => {
      this.timer = setTimeout(() => {
        let cloneQueue = [...this.taskQueue]
        this.reset()
        this.processTaskQueue(cloneQueue, this.taskProcessor)
          .then(res => {
            // this.results = res;
            this.history.push(res);
            resolve(res);
          });
      }, this.interval);
    });
  }

  // send the task immediately
  sendNow() {
    return new Promise((resolve, reject) => {
      let cloneQueue = [...this.taskQueue]
      this.reset()
      this.processTaskQueue(cloneQueue, this.taskProcessor)
        .then(res => {
          this.history.push(res);
          resolve(res);
        });
      this.reset()
    });
  }

  // fetch batch results
  waitForResults = async () => {
    return new Promise(async (resolve, reject) => {
      if (!this.timer) {
        resolve(await this.sendLater())
      }

      if (this.timer && this.taskQueue.length >= this.batchSize) {
        resolve(await this.sendNow())
      }
    });
  }

  reset = () => {
    this.taskQueue = [];
    clearTimeout(this.timer);
    this.timer = null;
  }

  processTaskQueue = async (taskQueue, taskProcessor) => {
    try {
      let res = await batchProcessor(taskQueue, taskProcessor)
      return res
    } catch (error) {
      console.error("error", error);
    }
  }

  /**
   * 
   * @returns - return a history of processed tasks by chunks
   */
  shutdown() {
    return this.history
  }
}
