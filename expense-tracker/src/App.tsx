import ExpenseTracker from "./components/ExpenseTracker";
import ShowList from "./components/ShowList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/add"
            element={<ExpenseTracker onTrue={undefined} onClose={undefined} />}
          />

          <Route path="/" element={<ShowList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
