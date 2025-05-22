import DiscourseRoute from "discourse/routes/discourse";
import { service } from "@ember/service";

export default class PointsCenterRoute extends DiscourseRoute {
  @service router;

  beforeModel(transition) {
    if (transition && transition.targetName) {
      this.router.transitionTo(transition.targetName);
    } else {
      this.router.transitionTo("points-center.available-rewards"); // set your default
    }
  }
}
