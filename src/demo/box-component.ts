import Component from "../base-abstract-classes/component";
import SceneNodeComponent from "../vital-components/scene-node-component";

export default class BoxComponent extends Component {
  private _params: { startingPosition: BABYLON.Vector3 };
  constructor(params: { startingPosition: BABYLON.Vector3 }) {
    super();
    this._Init(params);
  }

  _Init(params: any) {
    this._params = params;
  }

  _CreateGeometry() {
    const node: SceneNodeComponent | undefined = this.GetComponent<SceneNodeComponent>("SceneNodeComponent");
    if (!node) {
      return;
    }
    const box: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox(" ", { size: 0.5 });
    box.parent = node.transformNode;
    box.position = this._params.startingPosition;
  }

  InitComponent() {
    this._CreateGeometry();
  }
}
