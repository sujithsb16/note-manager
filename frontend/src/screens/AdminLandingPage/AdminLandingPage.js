import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { confirmAlert } from "react-confirm-alert";
import {
  listusers,
  deleteUserAction,
  blockUserAction,
} from "../../actions/adminActions";

const AdminLandingPage = ({ userSearch, setAdmin }) => {
  setAdmin(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    userInfo: { isAdmin },
  } = userLogin;

  const userList = useSelector((state) => state.adminUserList);
  const { loading, users, error } = userList;

  const adminUserBlock = useSelector((state) => state.adminUserBlock);

  const {
    loading: loadingBlock,
    error: errorBlock,
    success: successBlock,
  } = adminUserBlock;

  const adminUserDelete = useSelector((state) => state.adminUserDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adminUserDelete;

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure you need to delete ${user} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteUserAction(id));
            navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin"),
        },
      ],
    });
  };

  const blockHandler = (id, status) => {
    confirmAlert({
      title: "Confirm",
      message: `Are you sure you need to block ${user} ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(blockUserAction(id, status));
            // navigate("/admin");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/admin"),
        },
      ],
    });
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/mynotes");
    }
    dispatch(listusers());
  }, [dispatch, successBlock]);

  return (
    <MainScreen title={`Dashboard`}>
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />}
      {loadingBlock && <Loading />} */}
      {successDelete && (
        <ErrorMessage variant="success">Deleted Successfully</ErrorMessage>
      )}
      {/* {successBlock && (
        <ErrorMessage variant="success">Blocked Successfully</ErrorMessage>
      )} */}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {errorBlock && <ErrorMessage variant="danger">{errorBlock}</ErrorMessage>}
      {!loading && !error && (
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>SiNo</th>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit/Delete</th>
              <th>Block</th>
            </tr>
          </thead>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td style={{ width: "160px" }}>
                    <img
                      style={{ width: "80px", height: "auto" }}
                      src={user.pic}
                      alt={user.name}
                    ></img>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/admin/user/${user._id}`}>
                      <Button>
                        <FaPencilAlt />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => {
                        setUser(user.name);
                        deleteHandler(user._id);
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant={user.blocked ? "success" : "danger"}
                      onClick={async () => {
                        setUser(user.name);
                        blockHandler(user._id, !user.blocked);
                      }}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      )}
    </MainScreen>
  );
};

export default AdminLandingPage;
