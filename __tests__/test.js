import { BatchService, singleTaskHandler } from '../main.js';
import * as BatchProcessor from '../src/lib/batchProcessor.js'
import { sleep } from "../src/helpers/index.js";

beforeEach(() => {
  jest.clearAllMocks();
});

test('should be batch request if batch size is full', async () => {
  const batchService = new BatchService(3, 300, singleTaskHandler);
  batchService.dispatch("1");
  batchService.dispatch("2");
  batchService.dispatch("3");
  batchService.dispatch("4");

  await sleep(400);
  const resultLength = batchService.shutdown().length;

  expect(resultLength).toBe(2);

});

test('batch dispatch should be called', async () => {
  const mockDispatch = jest.spyOn(BatchProcessor, 'batchProcessor');

  const batchService = new BatchService(3, 500, singleTaskHandler);
  batchService.dispatch("1");
  batchService.dispatch("2");
  batchService.dispatch("3");
  batchService.dispatch("4");

  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

test('batch dispatch should be called 2 times', async () => {
  const mockBatchProcessor = jest.spyOn(BatchProcessor, 'batchProcessor');

  const batchService = new BatchService(3, 300, singleTaskHandler);
  batchService.dispatch("1");
  batchService.dispatch("2");
  batchService.dispatch("3");
  batchService.dispatch("4");
  batchService.dispatch("5");
  batchService.dispatch("6");
  batchService.dispatch("7");
  await sleep(400);

  expect(mockBatchProcessor).toHaveBeenCalledTimes(3);
});

test('should be call BatchProcessor if batch size is expired', async () => {
  const batchService = new BatchService(3, 200, singleTaskHandler);
  batchService.dispatch("1");
  await sleep(300);
  batchService.dispatch("2");

  setTimeout(() => {
    const resultLength = batchService.shutdown().length;
    const fristTask = batchService.shutdown()[0]
    const secondTask = batchService.shutdown()[1]
    expect(resultLength).toBe(2);
    expect(fristTask[0].value).toBe("1");
    expect(secondTask[0].value).toBe("2");
  }, 1000)
});


test('should NOT call BatchProcessor if batch size empty', () => {
  const mockBatchProcessor = jest.spyOn(BatchProcessor, 'batchProcessor');
  const batchService = new BatchService(3, 200, singleTaskHandler);
  batchService.dispatch(null);
  expect(mockBatchProcessor).toHaveBeenCalledTimes(0);
});