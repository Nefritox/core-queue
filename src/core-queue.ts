export interface Task {
	func: any;
	resolve: any;
	reject: any;
}

export interface CoreQueueOptions {
	maxTasks: number;
	maxConcurrency: number;
}

export class CoreQueue {
	// #region properties
	private queue: Array<Task> = new Array<Task>();
	private tasksInProgress: number = 0;
	private options: CoreQueueOptions;
	// #endregion


	// #region constructor
	constructor(options?: CoreQueueOptions) {
		if (options) {
			this.options = options;
		}
	}
	// #endregion


	// #region getters
	public get size(): number {
		return this.queue.length;
	}

	public get isEmpty(): boolean {
		if (this.queue.length === 0) {
			return true;
		}

		return false;
	}

	public get isFull(): boolean {
		if (this.queue.length >= this.options.maxTasks) {
			return true;
		}

		return false;
	}

	public get peek(): Task {
		if (this.isEmpty) {
			return null;
		}

		return this.queue[0];
	}
	// #endregion


	// #region methods
	public enqueue(func: any): Promise<void> {
		if(this.size >= this.options.maxTasks - 1){
			throw new Error("Max number of task reached!");
		}

		return new Promise((resolve, reject) => {
			const task: Task = {
				func,
				resolve,
				reject
			};

			this.queue.push(task);
			this.dequeue();
		});

	}

	public async dequeue(): Promise<void> {
		if (this.isEmpty) {
			return;
		}

		if (this.tasksInProgress >= this.options.maxConcurrency) {
			return;
		}

		this.tasksInProgress++;

		const task: Task = this.queue.shift();

		try {
			const result: any = await task.func();
			task.resolve(result);
		} catch (error) {
			task.reject(error);
		} finally {
			this.tasksInProgress--;
			this.dequeue();
		}
	}
	// #endregion
}