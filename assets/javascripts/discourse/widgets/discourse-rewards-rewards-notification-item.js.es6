import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";
import { formatUsername } from "discourse/lib/utilities";

export default {
  name: "discourse-rewards-notification",
  initialize() {
    withPluginApi("1.15.0", (api) => {
      api.registerNotificationTypeRenderer("rewards", (notification) => {
        let message;
        if (notification.data.type === "redeemed") {
          message = I18n.t("notifications.rewards.new_user_reward", {
            username: formatUsername(notification.data.display_username),
            description: I18n.t("notifications.rewards.redeemed", {
              reward_title: notification.data.reward.title,
            }),
          });
        } else {
          message = I18n.t("notifications.rewards.new", {
            reward_title: notification.data.reward.title,
          });
        }

        let url =
          notification.data.type === "redeemed"
            ? "/admin/rewards/grant"
            : "/points-center/available-rewards";

        // You can also return a Glimmer component if you want richer UI.
        // For simple notifications, return an object like this:
        return {
          label: message,
          url,
          icon: "gift",
        };
      });
    });
  },
};
