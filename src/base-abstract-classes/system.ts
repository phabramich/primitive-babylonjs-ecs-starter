import Entity from "./base-classes/entity";
import EntitySystemManager from "./base-classes/entity-system-manager"

export default abstract class System {
  protected _entityManager: EntitySystemManager;

  protected abstract _requiredComponentsNames: string[];

  Init(): void {}

  Update(animRatio: number): void {
    if (!this._requiredComponentsNames || this._requiredComponentsNames.length === 0) {
      return;
    }
    const entities: Entity[] = this._entityManager.Filter(e => {
      return e.HasComponents(this._requiredComponentsNames)
    })
    entities.forEach(e => this.UpdateEntity(e, animRatio));
  }

  abstract UpdateEntity(e: Entity, animRatio: number): void;

  SetParent(m: EntitySystemManager): void {
    this._entityManager = m;
  }

  Stop(): void {}
}
