import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const {
    userInfo: { name },
  } = userLogin;
  // const [notes, setNotes] = useState([]);

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you need to delete ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteNoteAction(id));
            navigate("/mynotes");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/mynotes"),
        },
      ],
    });

    // if (window.confirm("Are you sure?")) {
    //   dispatch(deleteNoteAction(id));
    // }
    // navigate("/mynotes");
  };

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  // };

  useEffect(() => {
    dispatch(listNotes());

    // fetchNotes();
  }, [dispatch, successCreate, successUpdate, successDelete]);
  return (
    <MainScreen title={`Welcome Back ${name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <>
            <Accordion key={note._id}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <Link to={`/note/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                  <span className="lead" style={{ marginLeft: "30%" }}>
                    {note.title}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <Badge bg="success">Category - {note.category}</Badge>
                  <blockquote className="blockquote mb-0">
                    <p className="fs-6 mt-2">{note.content}</p>
                    <footer style={{ fontSize: 14, opacity: 0.5 }}>
                      Created on - {note.createdAt.substring(0, 10)}
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
