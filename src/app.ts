import "babylonjs"
import EntitySystemManager from "./core/entity-manager";
import Entity from "./core/entity";
import RotateAroundTransformnode from "./demo/rotate-around-component";
import Transform from "./vital-components/transform";
import { Engine, Scene, Vector3 } from "babylonjs";

export default class App {
  public canvas: HTMLCanvasElement;
  public engine: Engine;
  private _scene: Scene
  private _entityManager: EntitySystemManager;
  constructor() {
    this._initialize();
  }

  _initialize() {
    const canvas = document.getElementById('babylon-canvas') as HTMLCanvasElement;
    this.canvas = canvas;
    this.engine = new Engine(this.canvas);
    this._scene = new Scene(this.engine);

    this._createEnvironment();

    this._entityManager = new EntitySystemManager();

    this._loadDemo();

    this.engine.runRenderLoop(() => {
      this._scene.render();
      this._step(this._scene.getAnimationRatio());
    });
  }

  _createEnvironment() {
    this._scene.createDefaultCameraOrLight(false, true, true);
    this._scene.createDefaultEnvironment();
  }

  _loadDemo() {
    const e = new Entity("box1");
    e.addComponent(new Transform({ initialPosition: new Vector3(0, 1, 2) }, this._scene))
    e.addComponent(new RotateAroundTransformnode(1));
    this._entityManager.add(e);

    const e2 = new Entity("box2");
    e2.addComponent(new Transform({ initialPosition: new Vector3(2, 2, 2) }, this._scene))
    e2.addComponent(new RotateAroundTransformnode(10));
    this._entityManager.add(e2);

    const e3 = new Entity("box3");
    e3.addComponent(new Transform({ initialPosition: new Vector3(0, 1, 0) }, this._scene))
    e3.addComponent(new RotateAroundTransformnode(2));
    this._entityManager.add(e3);
  }

  _step(animRatio: number) {
    this._entityManager.update(animRatio);
  }
}
