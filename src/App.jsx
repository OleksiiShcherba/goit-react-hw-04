import "./App.css";
import "modern-normalize";

import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <SearchBar
        onSubmit={(text) => {
          console.log(text);
        }}
      />
    </>
  );
}

export default App;
