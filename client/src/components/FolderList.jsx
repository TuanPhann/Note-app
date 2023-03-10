import { Card, CardSection, Group, Stack, Text, Title } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

import NewFolder from "./NewFolder";

function FolderList({ listFolder }) {
  const param = useParams();

  return (
    <Card>
      <Stack>
        <Group style={{ justifyContent: "space-between" }}>
          <Title style={{ fontSize: 25 }}>Folder</Title>
          <NewFolder />
        </Group>

        {listFolder.map((item, index) => (
          <Link
            to={`folders/${item.id}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <Card
              p={0}
              style={{
                backgroundColor: `${
                  param.folderId === item.id ? "#efb64e" : "#ccc"
                }`,
                maxWidth: "300px",
              }}
            >
              <CardSection p={10}>
                <Text>{item.name}</Text>
              </CardSection>
            </Card>
          </Link>
        ))}
      </Stack>
    </Card>
  );
}

export default FolderList;
