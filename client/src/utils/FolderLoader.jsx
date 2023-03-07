import { RequestLoader } from "./RequestLoader";

export const FolderLoader = async () => {
  const query = `
    query Query {
      folders {
        id
        name
      }
    }
    `;

  const res = await RequestLoader({ query });
  const data = await res.json();
  return data;
};

export const AddNewFolder = async (newFolder) => {
  const query = `
  mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }  

  `;
  const res = await RequestLoader({
    query,
    variables: {
      name: newFolder.name,
    },
  });

  const data = await res.json();
  return data;
};
