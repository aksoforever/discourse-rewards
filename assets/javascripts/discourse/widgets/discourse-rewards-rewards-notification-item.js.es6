import { DefaultNotificationItem } from "discourse/widgets/default-notification-item";
import I18n from "I18n";
import { createWidgetFrom } from "discourse/widgets/widget";
import { formatUsername } from "discourse/lib/utilities";
import { iconNode } from "discourse-common/lib/icon-library";

createWidgetFrom(DefaultNotificationItem, "rewards-notification-item", {
  text(_notificationName, data) {
    if (this.attrs.data.type == "redeemed") {
      return I18n.t("notifications.rewards.new_user_reward", {
        username: formatUsername(data.display_username),
        description: I18n.t(`notifications.rewards.redeemed`, {
          reward_title: data.reward.title,
        }),
      });
    }

    return I18n.t("notifications.rewards.new", {
      reward_title: data.reward.title,
    });
  },

  url() {
    if (this.attrs.data.type == "redeemed") {
      return "/admin/rewards/grant";
    }

    return "/points-center/available-rewards";
  },

  icon() {
    return iconNode("gift");
  },
});
