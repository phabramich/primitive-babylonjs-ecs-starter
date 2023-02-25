import Component from "./component";
import EntityManager from "./entity-manager";
import { Message, MessageHandler } from "./message";

export default class Entity {
  private _name : string = "";

  private _components: Map<string, Component> = new Map<string, Component>();

  private _handlers: Map<string, MessageHandler[]> = new Map<string, MessageHandler[]>();

  protected _entityManager: EntityManager;

  constructor(name: string) {
    this._name = name;
  }

  // Meant to be accessible from components
  public registerHandler(topic: string, h: MessageHandler): void {
    if (!(topic in this._handlers)) {
      this._handlers[topic] = [];
    }
    this._handlers[topic].push(h);
  }

  public setEntityManager(p: EntityManager): void {
    this._entityManager = p;
  }

  public setName(n: string): void {
    this._name = n;
  }

  public get name(): string {
    return this._name;
  }

  public setActive(b: boolean = true): void {
    this._entityManager.setActive(this, b);
  }

  public addComponent(c: Component): void {
    c.setParentEntity(this);
    this._components[c.constructor.name] = c;

    c.initComponent();
  }

  public getComponent<T extends Component>(n: string): T | null {
    if (n in this._components) {
      return this._components[n] as T;
    }
    return null;
  }

  public hasComponents(names: string[]): boolean {
    return names.every(n => n in this._components);
  }

  public findEntity(n: string): Entity | undefined {
    return this._entityManager.getEntity(n);
  }

  public instantiate(): Entity {
    const e: Entity = new Entity(this._name + "_instance");
    this._components.forEach(c => {
      e.addComponent(c.clone())
    });
    this._entityManager.add(e);
    return e;
  }

  public broadcast(message: Message): void {
    if (!this._handlers.has(message.type)) {
      return;
    }

    for (const handler of this._handlers[message.type]) {
      handler(message);
    }
  }

  public destroy(): void {
    this.setActive(false);
    this._components.forEach(c => {
      c.destroy();
    })
    this._components.clear()
    this._handlers.clear()
  }
};
