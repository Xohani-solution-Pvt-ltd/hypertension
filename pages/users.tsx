
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { LockSVG, ProcessCircle } from "../assets/SVG/image";
import notify from "../helpers/notify";
import React from "react";
import { getUsers } from "../services/call";
import { User, Response } from "../interfaces/index";
import Layout from "../components/Layout";
import { Table } from 'react-bootstrap';

const UserList = () => {
  // State to store the fetched data and loading status
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data function
  const fetchUsers = async () => {
    try {
      const [data, err] = await getUsers({});
      if (data?.success === true) {
        setUsers(data?.data);
        notify.success("users fetch successfully");
        return null;
      } else if (err) {
        console.log(err?.message);
        notify.error(err?.message);
        return err;
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Fetch data once when the app mounts
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log('users', users);

  return (
    <Layout title="User List">
      <div>
        <h2>API Users List:</h2>
        <div className="table-responsive">
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link href={`/users/${item._id}`} passHref>
                          <a className="mb-3">{item.fullName}</a>
                        </Link>
                      </td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        {/* <Link href="/signup">Sign Up</Link>
      <Link href="/forgotPassword">Forgot Password?</Link> */}
      </div>
    </Layout>
  );
};

export default UserList;

