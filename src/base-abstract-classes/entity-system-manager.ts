import Entity from "./entity";
import System from "../system";

export default class EntitySystemManager {

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

  _GenerateName(n: string | undefined): string {
    this._ids += 1;

    return n ?? "" + this._ids;
  }

  Get(n: string): Entity | undefined {
    return this._entitiesMap.get(n);
  }

  Filter(callback: (e: Entity) => boolean): Entity[] {
    return this._entities.filter(callback);
  }

  Add(e: Entity): void {
    let n = e.Name;
    if (!n || this._entitiesMap.has(n)) {
      n = this._GenerateName(n);
    }

    this._entitiesMap.set(n, e);
    this._entities.push(e);

    e.SetEntityManager(this);
    e.SetName(n);
  }

  SetActive(e: Entity, active: boolean) {
    const i = this._entities.indexOf(e);
    if (i < 0) {
      if (active) {
        this.Add(e)
      }
      return;
    }
    if (active) {
      return;
    }
    this._entities.splice(i, 1);
    this._entitiesMap.delete(e.Name);
  }

  AddSystem(s: System): void {
    s.SetParent(this);
    this._systems.push(s);
    s.Init();
  }

  Update(animRatio: number): void {
    for (const s of this._systems) {
      s.Update(animRatio);
    }
  }
}
