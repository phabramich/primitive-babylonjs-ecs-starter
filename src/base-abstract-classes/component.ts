import Entity, { Handler, Message } from "./entity";

export default class Component {
  protected _parentEntity: Entity

  SetParent(p: Entity): void {
    this._parentEntity = p;
  }

  InitComponent(): void {};

  GetComponent<T extends Component>(n: string): T {
    return this._parentEntity.GetComponent(n);
  }

  FindEntity(n: string): Entity | undefined {
    return this._parentEntity.FindEntity(n);
  }

  Broadcast(m: Message): void {
    this._parentEntity.Broadcast(m);
  }

  Update() { }

  _RegisterHandler(topic: string, h: Handler) {
    this._parentEntity._RegisterHandler(topic, h);
  }
};
