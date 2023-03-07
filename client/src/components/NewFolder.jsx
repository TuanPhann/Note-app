import { AiOutlineFolderAdd } from "react-icons/ai";
import { Dialog, Text, TextInput, Button, Group } from "@mantine/core";
import { useState } from "react";
import { AddNewFolder } from "../utils/FolderLoader";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewFolder() {
  const [opened, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const popupName = searchParam.get("popup");
  const navigate = useNavigate();
  const handleChangeValue = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleOpenPopup = () => {
    setSearchParam({ popup: "add-folder" });
  };

  const handleCancel = () => {
    setValue("");
    navigate(-1);
  };

  const handleSubmit = async () => {
    const data = await AddNewFolder({ name: value });
    handleCancel();
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupName]);

  return (
    <>
      <div onClick={handleOpenPopup} style={{ marginRight: 100 }}>
        <AiOutlineFolderAdd size={25} />
      </div>

      <Dialog opened={opened} withCloseButton size="lg" radius="md">
        <Text size="sm" mb="xs" weight={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput
            placeholder="hello@gluesticker.com"
            sx={{ flex: 1 }}
            value={value}
            onChange={handleChangeValue}
          />
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}

export default NewFolder;
