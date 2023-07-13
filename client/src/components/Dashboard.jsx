import React, { useEffect, useState } from "react";
import axios from "axios";
​
export default function Dashboard() {
  const [user, setUser] = useState(null);
​
  const getUser = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
​
  useEffect(() => {
    getUser();
  }, []);
​
  return (
    <div>
      Dashboard
      {user && (
        <div>
          <h3>{user.username}</h3>
        </div>
      )}
    </div>
  );
}