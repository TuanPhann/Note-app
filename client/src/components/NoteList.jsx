import {
  Card,
  CardSection,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment";
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function NoteList() {
  const param = useParams();
  const data = useLoaderData();
  const [selected, setSelected] = useState(param.noteId);
  const submit = useSubmit();
  const navigate = useNavigate();

  const folder = data.folder.notes;

  useEffect(() => {
    if (param.noteId) {
      setSelected(param.noteId);
      return;
    }

    if (data?.folder?.notes[0]) {
      navigate(`note/${data.folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.noteId, data.folder.notes]);

  const handleAddNote = () => {
    submit(
      {
        content: "",
        folderId: param.folderId,
      },
      {
        method: "post",
        action: `/folders/${param.folderId}`,
      }
    );
  };

  return (
    <Grid>
      <Grid.Col span={4}>
        <Stack>
          <Group>
            <Title>Note</Title>
            <div onClick={handleAddNote}>
              <AiOutlineFolderAdd />
            </div>
          </Group>
          {folder.map((item, index) => (
            <Link
              key={index}
              to={`note/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                p={0}
                style={{
                  backgroundColor: `${
                    selected === item.id ? "#22b8cf" : "#ccc"
                  }`,
                  maxWidth: "300px",
                }}
              >
                <CardSection pl={10} pr={10}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${item.content.substring(0, 30) || "Empty"}`,
                    }}
                  />
                  <Text>
                    {moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </Text>
                </CardSection>
              </Card>
            </Link>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}

export default NoteList;
