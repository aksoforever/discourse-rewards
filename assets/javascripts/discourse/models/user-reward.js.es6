import { Promise } from "rsvp";
import RestModel from "discourse/models/rest";
import { ajax } from "discourse/lib/ajax";
import User from "discourse/models/user";
import Reward from "../models/reward";

const UserReward = RestModel.extend({});

UserReward.reopenClass({
  grant(user_reward) {
    if (!user_reward.id) {
      return Promise.resolve();
    }

    return ajax(`/user-rewards/${user_reward.id}`, {
      type: "post",
    });
  },

  cancelReward(user_reward, reason) {
    if (!user_reward.id) {
      return Promise.resolve();
    }

    return ajax(`/user-rewards/${user_reward.id}`, {
      data: { cancel_reason: reason },
      type: "delete",
    });
  },

  createFromJson(json) {
    let userRewards = [];
    if (json && "user_reward" in json) {
      userRewards = [json.user_reward];
    } else if (json && "user_reward_list" in json && json["user_reward_list"]) {
      userRewards = json["user_reward_list"]["user_rewards"] || [];
    }

    userRewards = (userRewards || []).map((userRewardJson) => {
      userRewardJson.reward = Reward.createFromJson(userRewardJson || {});
      userRewardJson.user = User.create(userRewardJson.user || {});
      return userRewardJson;
    });

    if (json && "user_reward" in json) {
      return userRewards[0];
    } else {
      return {
        userRewards,
        count:
          json && json["user_reward_list"]
            ? json["user_reward_list"]["count"]
            : 0,
      };
    }
  },
});

export default UserReward;
