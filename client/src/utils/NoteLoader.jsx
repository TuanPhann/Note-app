import { RequestLoader } from "./RequestLoader";

export const NoteLoader = async ({ request, params }) => {
  const folderId = params.folderId;
  const query = `
    query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          content
          id
          updatedAt
        }
      }
    }
    `;

  const res = await RequestLoader({
    query,
    variables: {
      folderId: folderId,
    },
  });

  const data = await res.json();
  return data;
};

export const NoteDetailLoader = async ({ request, params }) => {
  const noteId = params.noteId;
  const query = `
  query Query($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }
    `;

  const res = await RequestLoader({
    query,
    variables: {
      noteId: noteId,
    },
  });

  const data = await res.json();
  return data;
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `
  mutation Mutation($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      content
      id
    }
  }  
  `;

  const res = await RequestLoader({ query, variables: formDataObj });
  return res;
};

export const updateNote = async ({ params, request }) => {
  const updateNote = await request.formData();
  console.log(updateNote);
  const formDataObj = {};
  updateNote.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);
  const query = `
  mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      content
      id
    }
  }
  `;

  const res = await RequestLoader({ query, variables: formDataObj });
  return res;
};
