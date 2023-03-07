import { IoMdNotifications } from "react-icons/io";
import { createClient } from "graphql-ws";
import { SUBSCRIPTION_ENDPOINT } from "../utils/Constant";
import { useEffect } from "react";
import { Indicator } from "@mantine/core";
import { useState } from "react";

const client = createClient({
  url: SUBSCRIPTION_ENDPOINT,
});

const query = `
subscription Subscription {
  notification {
    message
  }
}
`;

function Notification() {
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    // subscription
    (async () => {
      const onNext = (data) => {
        /* handle incoming values */
        console.log({ data });
        setNotification(false);
      };

      await new Promise((resolve, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  return (
    <Indicator disabled={notification}>
      <IoMdNotifications size={30} />
    </Indicator>
  );
}

export default Notification;
