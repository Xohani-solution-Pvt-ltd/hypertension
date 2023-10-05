import React from "react";
import { Table } from 'react-bootstrap';

const DisplayUser = ({ userInfo }) => {
  return (
    <Table bordered hover responsive>
      <tbody>
        <tr>
          <td className="font-primary text-primary-300">Id</td>
          <td className="text-secondary-300">{userInfo._id}</td>
        </tr>
        <tr>
          <td className="font-primary text-primary-300">Name</td>
          <td className="text-secondary-300">{userInfo.fullName}</td>
        </tr>
        <tr>
          <td className="font-primary text-primary-300">Email</td>
          <td className="text-secondary-300">{userInfo.email}</td>
        </tr>
        <tr>
          <td className="font-primary text-primary-300">Mobile</td>
          <td className="text-secondary-300">{userInfo.mobile}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DisplayUser;
