import Reward from "../models/reward";
import DiscourseRoute from "discourse/routes/discourse";
import { ajax } from "discourse/lib/ajax";

export default class AdminRewardsIndexRoute extends DiscourseRoute {
  model() {
    return ajax("/rewards.json").then((json) => {
      return Reward.createFromJson(json);
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model,
    });
  }
}
