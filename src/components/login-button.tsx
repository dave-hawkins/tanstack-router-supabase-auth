import React from "react";
import { auth } from "../utils/auth"; // Adjust the path as necessary

const LoginButton: React.FC = () => {
  const loginWithGoogle = async () => {
    await auth.login();
    console.log(auth.status); // Logging the auth status, consider handling any errors or state updates here
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
