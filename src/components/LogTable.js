import React, {useEffect} from 'react';
import useUserContext from "../hooks/useUserContext";
import ContentLoading from "./loading/ContentLoading";
import Table from "./table/Table";
import TableHead from "./table/TableHead";
import TableRow from "./table/TableRow";
import TableCell from "./table/TableCell";
import TableBody from "./table/TableBody";

function LogTable() {
  const { loading, users, getUsersFromAPI, deleteUserFromApi } = useUserContext()

  useEffect(() => {
    getUsersFromAPI();
  }, []);

  return (
    <div>
      {loading ? (
        <ContentLoading />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUserFromApi(user.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default LogTable;