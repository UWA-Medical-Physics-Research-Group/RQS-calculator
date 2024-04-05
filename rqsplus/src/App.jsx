import { useState } from "react";

import { Modal } from "./components/Modal";
import { Table } from "./components/Table";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    { page: "Page 1", description: "this is 1st page", status: "live" },
    { page: "Page 2", description: "this is 2nd page", status: "draft" },
    { page: "Page 3", description: "this is 3rd page", status: "error" },
  ]);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} />
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
