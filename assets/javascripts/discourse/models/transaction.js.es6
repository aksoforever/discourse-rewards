import RestModel from "discourse/models/rest";
import { ajax } from "discourse/lib/ajax";
import User from "discourse/models/user";
import UserReward from "../models/user-reward";

const Transaction = RestModel.extend({});

Transaction.reopenClass({
  createFromJson(json) {
    let transactions = [];
    if (json && "transaction" in json) {
      transactions = [json.transaction];
    } else if (json && "transactions" in json) {
      transactions = json["transactions"];
    }

    transactions = (transactions || []).map((transactionJson) => {
      transactionJson.created_by = User.create(transactionJson.user || {});

      if (
        transactionJson.user_reward &&
        typeof transactionJson.user_reward === "object"
      ) {
        transactionJson.user_reward = UserReward.createFromJson(
          transactionJson.user_reward
        );
      } else {
        transactionJson.user_reward = null;
      }

      return transactionJson;
    });

    if (json && "transaction" in json) {
      return transactions[0];
    } else {
      return { transactions, count: json ? json["count"] : 0 };
    }
  },
});

export default Transaction;
