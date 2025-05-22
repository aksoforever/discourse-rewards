import DiscourseRoute from "discourse/routes/discourse";
import { service } from "@ember/service";

export default class AdminRewardsRoute extends DiscourseRoute {
  @service router;

  beforeModel(transition) {
    if (transition && transition.targetName) {
      this.router.transitionTo(transition.targetName);
    } else {
      this.router.transitionTo("admin-rewards.index"); // or whatever is your default
    }
  }
}
