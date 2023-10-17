import { useState } from "react";
import "./App.css";
import { Login, IFormData } from "./layout/login";
import { LoggedIn } from "./layout/loggedIn";
import useApi from "./hooks/useApi";
import { Loader } from "./components/loader";

function App() {
  const { loading, error, postData } = useApi();
  const [tokens, setTokens] = useState<string>("");

  const handleSubmit = async (formData: IFormData) => {
    try {
      const response = await postData("login", formData);
      setTokens(response?.token ?? "");
    } catch (e) {
      setTokens("");
      console.error(e);
    }
  };

  const handleRemoveToken = (): void => {
    setTokens("");
  };

  return (
    <div className="login-wrapper">
      {loading && <Loader />}
      <div className="login-form-wrapper">
        <div className="login-form">
          {tokens ? (
            <LoggedIn removeToken={handleRemoveToken} />
          ) : (
            <Login error={error} handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
