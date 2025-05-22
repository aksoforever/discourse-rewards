import DiscourseRoute from "discourse/routes/discourse";

export default DiscourseRoute.extend({
  redirect(router, model, transition) {
    router.transitionTo(transition.targetName);
  },
});
