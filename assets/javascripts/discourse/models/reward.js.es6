import { Promise } from "rsvp";
import RestModel from "discourse/models/rest";
import { ajax } from "discourse/lib/ajax";
import User from "discourse/models/user";
import UserReward from "../models/user-reward";

const Reward = RestModel.extend({});

Reward.reopenClass({
  save(data) {
    let url = "/rewards",
      type = "POST";

    if (data.id) {
      // We are updating an existing reward.
      url += `/${data.id}`;
      type = "PUT";
    }

    return ajax(url, { type, data }).then((rewardJson) => {
      return this.createFromJson(rewardJson);
    });
  },

  destroy(reward) {
    if (!reward.id) {
      return Promise.resolve();
    }

    return ajax(`/rewards/${reward.id}`, {
      type: "DELETE",
    });
  },

  grant(reward) {
    if (!reward.id) {
      return Promise.resolve();
    }

    return ajax(`/rewards/${reward.id}/grant`, {
      type: "post",
    });
  },

  findById(id) {
    return ajax(`/rewards/${id}`).then((rewardJson) =>
      this.createFromJson(rewardJson)
    );
  },

  createFromJson(json) {
    let rewards = [];
    if (json && "reward" in json) {
      rewards = [json.reward];
    } else if (json && "reward_list" in json && json["reward_list"]) {
      rewards = json["reward_list"]["rewards"] || [];
    }

    rewards = (rewards || []).map((rewardJson) => {
      if (!rewardJson) {
        return {};
      }
      rewardJson.created_by = User.create(rewardJson.created_by || {});
      // If user_rewards is an array, create each one, otherwise default to empty array/object
      if (Array.isArray(rewardJson.user_rewards)) {
        rewardJson.user_rewards = rewardJson.user_rewards.map((ur) =>
          UserReward.create(ur || {})
        );
      } else {
        rewardJson.user_rewards = [];
      }
      return rewardJson;
    });

    if (json && "reward" in json) {
      return rewards[0];
    } else {
      return {
        rewards,
        count: json && json["reward_list"] ? json["reward_list"]["count"] : 0,
      };
    }
  },
});

export default Reward;
