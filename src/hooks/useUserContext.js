import {useEffect, useState} from "react";

function getUsersFromAPI() {}
function deleteUserFromApi() {}

export default function useUserContext() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(false);
    setUsers([]);
  }, []);

  return {users, loading, getUsersFromAPI, deleteUserFromApi}
}