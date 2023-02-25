import Entity from "./entity";
import System from "./system";

export default class EntityManager {
  private _ids: number;

  private _entitiesMap: Map<string, Entity>;

  private _entities: Entity[];
  
  private _systems: System[];

  constructor() {
    this._ids = 0;
    this._entitiesMap = new Map<string, Entity>();
    this._entities = [];
    this._systems = [];
  }

  private _generateEntityName(n: string | undefined): string {
    this._ids += 1;

    return n ?? "" + this._ids;
  }

  public getEntity(n: string): Entity | undefined {
    return this._entitiesMap.get(n);
  }

  public filterEntities(callback: (e: Entity) => boolean): Entity[] {
    return this._entities.filter(callback);
  }

  public add(e: Entity): void;

  public add(s: System): void;

  public add(arg: Entity | System): void {
    if (arg instanceof Entity) {
      let n = arg.name;
      if (!n || this._entitiesMap.has(n)) {
        n = this._generateEntityName(n);
      }
  
      this._entitiesMap.set(n, arg);
      this._entities.push(arg);
  
      arg.setEntityManager(this);
      arg.setName(n);
    }
    if (arg instanceof System) {
      arg.setParent(this);
      this._systems.push(arg);
      arg.init();
    }
  }

  public setActive(e: Entity, active: boolean) {
    const i = this._entities.indexOf(e);
    if (i < 0) {
      if (active) {
        this.add(e)
      }
      return;
    }
    if (active) {
      return;
    }
    this._entities.splice(i, 1);
    this._entitiesMap.delete(e.name);
  }

  public update(animRatio: number): void {
    for (const s of this._systems) {
      s.onUpdate(animRatio);
    }
  }
}
