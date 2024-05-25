import { batchProcessor } from './lib/batchProcessor.js';

export class BatchService {
  constructor(batchSize, interval = 1000, taskProcessor) {
    this.batchSize = batchSize;
    this.interval = interval;
    this.taskProcessor = taskProcessor;
    this.timer = null;
    this.taskQueue = []
    this.history = [];
  }

  async dispatch(task) {
    if (task) {
      this.taskQueue.push(task);
    }

    if (this.taskQueue.length === 0) {
      console.log("no task to process", task)
      return;
    }

    return await this.waitForResults(task)
  }

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
      console.log("error", error);
    }
  }

  shutdown() {
    return this.history
  }
}
