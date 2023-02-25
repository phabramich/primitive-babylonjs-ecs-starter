import Entity from "./entity";
import EntityManager from "./entity-manager"

export default abstract class System {
  protected _entityManager: EntityManager;

  private _isActive: boolean = true;

  // This list needs to be initialized with targer components' names
  protected abstract _requiredComponents: string[];

  init(): void {}

  onUpdate(animRatio: number): void {
    if (!this._isActive) {
      return;
    }
    if (!this._requiredComponents || this._requiredComponents.length === 0) {
      return;
    }
    const entities: Entity[] = this._entityManager.filterEntities(e => {
      return e.hasComponents(this._requiredComponents)
    })
    entities.forEach(e => this.onUpdateEntity(e, animRatio));
  }

  abstract onUpdateEntity(e: Entity, animRatio: number): void;

  setParent(entityManager: EntityManager): void {
    this._entityManager = entityManager;
  }

  stop(): void {
    this._isActive = false;
  }

  resume(): void {
    this._isActive = true;
  }
}
