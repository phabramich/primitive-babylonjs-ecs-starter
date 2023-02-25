import StateMachine from "./state-machine";

export default abstract class State {
  private _parentStateMachine: StateMachine;

  constructor(parent: StateMachine) {
    this._parentStateMachine = parent;
  }

  public abstract get name(): string;

  public abstract enter(prevState?: State): void;

  public abstract update(animRatio?: number): void;

  public abstract exit(): void;
}
