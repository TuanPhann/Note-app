import { Avatar, Button, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useContext } from "react";
import FolderList from "../components/FolderList";
import { AppContext } from "../context/AppProvider";
import { Outlet, useLoaderData } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import Notification from "../components/Notification";

function HomePage() {
  const { user } = useContext(AppContext);
  const data = useLoaderData();
  const auth = getAuth();

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <Stack>
      <Group>
        <Avatar src={user.photoURL} />
        <Text>{user.displayName}</Text>
        <Button onClick={handleLogOut}>LogOut</Button>
        {/* <Notification /> */}
      </Group>
      <Stack style={{ alignItems: "center" }}>
        <Title style={{ textAlign: "center", marginBottom: "50px" }}>
          Note-App
        </Title>
        <Grid
          style={{
            padding: 15,
            width: 1200,
            height: 500,
            borderRadius: 10,
            backgroundColor: "#e0e1e1",
          }}
        >
          <Grid.Col
            span={3}
            style={{ padding: 0, borderRadius: 10, overflow: "hidden" }}
          >
            <FolderList listFolder={data.folders} />
          </Grid.Col>
          <Grid.Col span={9} style={{ paddingLeft: 25 }}>
            <Outlet />
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default HomePage;
