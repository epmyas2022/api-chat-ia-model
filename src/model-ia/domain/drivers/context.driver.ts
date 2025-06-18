export abstract class ContextOperation<T> {
  abstract execute(args: T): Promise<string>;
}

export class ContextDriver<T> {
  private strategy: ContextOperation<T>;

  context(args: T): Promise<string> {
    return this.strategy.execute(args);
  }

  setContext(strategy: ContextOperation<T>): void {
    this.strategy = strategy;
  }
}
