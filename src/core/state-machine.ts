import State from "./state";

export default class StateMachine {
  private _states: Record<string, new (p: StateMachine) => State> = {};

  private _currentState: State | undefined;

  public addState(name: string, type: new (p: StateMachine) => State) {
    this._states[name] = type;
  }

  public setState(name: string): void {
    if (!(name in this._states)) {
      return;
    }

    const prevState: State | undefined = this._currentState;
    if (prevState) {
      if (prevState.name === name) {
        return;
      }
      prevState.exit();
    }
  
    const state = new this._states[name](this);

    this._currentState = state;
    state.enter(prevState);
  }

  Update(animRatio?: number): void {
    if (this._currentState) {
      this._currentState.update(animRatio);
    }
  }
}
