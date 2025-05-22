import UserReward from "../models/user-reward";
import DiscourseRoute from "discourse/routes/discourse";
import { ajax } from "discourse/lib/ajax";

export default class AdminRewardsGrantRoute extends DiscourseRoute {
  model() {
    return ajax("/user-rewards.json").then((json) => {
      return UserReward.createFromJson(json);
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model,
    });
  }
}
