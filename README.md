# core-queue

**Package is under development.**

## Installation



```bash
npm install core-queue
```

## Example

```ts
import { CoreQueue, CoreQueueOptions } from "/core-queue";

function timeoutTask(id: number, timeoutMs: number): Promise<number> {
	return new Promise((resolve, reject) => {
		const start: number = performance.now();
		setTimeout(() => {
			console.log(`Task ${id} completed.`);
			resolve(start);
		}, timeoutMs);
	})
}

function getRandomIntInclusive(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function example(): void {
	const coreQueue: CoreQueue = new CoreQueue(
		{
			maxConcurrency: 1,
			maxTasks: 10
		}
	);

	for (let i = 0; i < 10; i++) {
		coreQueue
			.enqueue(() => timeoutTask(i, getRandomIntInclusive(500, 1000)))
			.then((start) => { console.log(`Done in ${Math.round(performance.now() - start)}ms`) })
			.catch((error) => { console.log(`Error occured ${error.message}`) });
	}
}


example();
```

Output:
```
Task 0 completed.
Done in 520ms
Task 1 completed.
Done in 799ms
Task 2 completed.
Done in 769ms
Task 3 completed.
Done in 892ms
Task 4 completed.
Done in 723ms
Task 5 completed.
Done in 969ms
Task 6 completed.
Done in 646ms
Task 7 completed.
Done in 984ms
Task 8 completed.
Done in 723ms
Task 9 completed.
Done in 892ms
```

## License
[MIT](https://choosealicense.com/licenses/mit/)