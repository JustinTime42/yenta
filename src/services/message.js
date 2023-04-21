import PubNub from "pubnub";
import { auth } from "./auth";
export const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  userId: auth.currentUser.uid,
});
