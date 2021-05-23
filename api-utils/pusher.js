import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export async function pushComment(message) {
  const response = await pusher.trigger("realtime", "comment-event", {
    message,
  });
}

export async function pushReply(message) {
  const response = await pusher.trigger("realtime", "reply-event", {
    message,
  });
}

export async function pushVote(message) {
  const response = await pusher.trigger("realtime", "vote-event", {
    message,
  });
}