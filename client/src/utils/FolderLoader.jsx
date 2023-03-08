import { RequestLoader } from "./RequestLoader";

export const FolderLoader = async () => {
  const query = `
    query Query {
      folders {
        id
        name
        createdAt
      }
    }
    `;

  const data = await RequestLoader({ query });
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
  const data = await RequestLoader({
    query,
    variables: {
      name: newFolder.name,
    },
  });

  return data;
};
