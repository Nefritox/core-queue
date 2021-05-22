# core-queue
Simple, zero dependency, promise-based queue.

**Package is under development. API might change. **

## Features
- Promise based queue.
- Concurrency.
- Build-in flow control methods.

## Installation
Via npm:
```bash
npm install core-queue
```
Via yarn:
```bash
yarn add core-queue
```

## Loading the module
```bash
import { CoreQueue, CoreQueueOptions } from "core-queue";
```

## Common usage
##### Create options
```ts
const options: CoreQueueOptions = {
	maxConcurrency: 1,
	maxTasks: 10,
	autostart: true
};
```
##### Create queue
```ts
const coreQueue: CoreQueue = new CoreQueue(options);
```
##### Add async task and handle result with promises
```ts
coreQueue
	.enqueue(() => someTask())
	.then(result => {})
	.catch(error => {});
```

##### Add async task and await result
```ts
	try { 
		await coreQueue.enqueue(() => someTask());
	}catch(error){
		// handle error
	}
```
##### Await until every task is settled (resolved or rejected)
```ts
await coreQueue.done();
```

## API
### CoreQueue(options)
Returns new CoreQueue instance.

#### Getters
##### size ` number`
- Returns sum of tasks awaiting in queue and tasks which are currently in progress.

##### pendingSize ` number`
- Returns number of tasks in queue.

##### inProgressSize ` number`
- Returns number of tasks which currently beign executed.

##### isEmpty ` boolean`
- Returns `true` if the number of awaiting tasks is zero.

##### isFull ` boolean`
- Returns `true` if the options limit is exceeded. 
- Is calculated as pedningTasks + awaitingTasks.

##### peek
- Returns first element without removing it.
- Returns `null` if queue is empty.

#### Methods
##### start() 
- Start task execution (Have to be called if `autostart` is set to `false`).
- Could be called after `stop()`

##### stop()
- Stop task execution.
- Task that was already started will settle.

##### clear()
- Removes all pending tasks.

##### done() `promise`
- Resolves after all tasks are settled and queue is empty.

##### enqueue(()=> {})
- Add new async task into queue.
- Throws error if maxTasks is exceeded.

### CoreQueueOptions
##### maxTasks  `number`
- Maximum of pending and idle tasks in queue. 

##### maxConcurrency  `number`
- Maximum of concurrently executed tasks.

##### autostart  `boolean`
- Specify if tasks should be resolved as soon as possible.
- If set to `false`, then `start()` have to be called.

## License
[MIT](https://choosealicense.com/licenses/mit/)