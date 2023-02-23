import Component from "../base-abstract-classes/component";

export default class RotateAroundTransformnode extends Component {
  speed: number;
  constructor(speed: number) {
    super();
    this.speed = speed;
  }

  InitComponent() {}
}
