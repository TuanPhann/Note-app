import { Text, Stack, Button } from "@mantine/core";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { Navigate } from "react-router-dom";
import { RequestLoader } from "../utils/RequestLoader";

function LoginPage() {
  const auth = getAuth();
  const { user } = useContext(AppContext);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    console.log({ uid }, { displayName });
    const res = await RequestLoader({
      query: `mutation Mutation($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          name
          uid
        }
      }`,
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  console.log(123);
  return (
    <Stack>
      <Text style={{ textAlign: "center" }}>WelCome to Note-App</Text>
      <Button variant="outline" onClick={handleSignInWithGoogle}>
        Login with Google
      </Button>
    </Stack>
  );
}

export default LoginPage;
