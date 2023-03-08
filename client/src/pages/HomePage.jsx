import { Avatar, Button, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { useContext } from "react";
import FolderList from "../components/FolderList";
import { AppContext } from "../context/AppProvider";
import { Outlet, useLoaderData } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Notification from "../components/Notification";

function HomePage() {
  const { user } = useContext(AppContext);
  const data = useLoaderData();
  const auth = getAuth();

  const handleLogOut = () => {
    auth.signOut();
  };

  console.log(data);
  return (
    <Stack>
      <Group>
        <Avatar src={user.photoURL} />
        <Text>{user.displayName}</Text>
        <Button onClick={handleLogOut}>LogOut</Button>
        <Notification />
      </Group>
      <Stack>
        <Title style={{ textAlign: "center", marginBottom: "50px" }}>
          Note-App
        </Title>
        <Grid>
          <Grid.Col span={4}>
            <FolderList listFolder={data.folders} />
          </Grid.Col>
          <Grid.Col span={8}>
            <Outlet />
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default HomePage;
