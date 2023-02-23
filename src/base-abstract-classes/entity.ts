import Component from "./component";
import EntitySystemManager from "./entity-system-manager";
import RotateAroundTransformnode from "../rotate-arount-component";

export type Message = {
  topic: string;
  value: any;
}

export type Handler = (message: Message) => void

export default class Entity {
  private _name : string = "";
  private _components: Record<string, Component> = {};
  private _handlers: Record<string, Handler[]> = {};
  private _entityManager: EntitySystemManager;

  constructor(name: string) {
    this._name = name;
  }

  _RegisterHandler(topic: string, h: Handler) {
    if (!(topic in this._handlers)) {
      this._handlers[topic] = [];
    }
    this._handlers[topic].push(h);
  }

  SetEntityManager(p: EntitySystemManager) {
    this._entityManager = p;
  }

  SetName(n: string): void {
    this._name = n;
  }

  get Name(): string {
    return this._name;
  }

  SetActive(b: boolean = true): void {
    this._entityManager.SetActive(this, b);
  }

  AddComponent(c: Component): void {
    c.SetParent(this);
    this._components[c.constructor.name] = c;

    c.InitComponent();
  }

  GetComponent<T extends Component>(n: string): T {
    return this._components[n] as T;
  }

  HasComponents(names: string[]): boolean {
    return names.every(n => n in this._components);
  }

  FindEntity(n: string): Entity | undefined {
    return this._entityManager.Get(n);
  }

  Broadcast(msg: Message) {
    if (!(msg.topic in this._handlers)) {
      console.log(this._name, msg.topic, msg.value);
      return;
    }

    for (const curHandler of this._handlers[msg.topic]) {
      curHandler(msg);
    }
  }

  // Can be added, if we threw away -systems- from our scheme
  // Update(timeElapsed) {
  //   for (let k in this._components) {
  //     this._components[k].Update(timeElapsed);
  //   }
  // }
};
