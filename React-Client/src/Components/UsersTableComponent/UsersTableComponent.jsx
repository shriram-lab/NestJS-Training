import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Moment from "moment";
import HocSpinnerComponent from "../SpinnerComponent";

class UsersTableComponent extends Component {
  render() {
    const {
      TableData,
      Header,
      children,
      Loading,
      deleteUser,
      editUser,
      notfound
    } = this.props;
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {Header.map(value => {
                return (
                  <>
                    <th>
                      {value
                        .toLowerCase()
                        .replace("_", " ")
                        .replace(/^\w|\s\w/g, function(letter) {
                          return letter.toUpperCase();
                        })}
                    </th>
                  </>
                );
              })}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Loading ? (
              <tr>
                <td colSpan={Header.length + 1} style={{ textAlign: "center" }}>
                  {children}
                </td>
              </tr>
            ) : (
              TableData.map(values => {
                const val = Header.map(value => {
                  if (value === "created_at") {
                    return (
                      <td>
                        {Moment(values[value]).format("DD MMM YYYY hh:mm A")}
                      </td>
                    );
                  }
                  return (
                    <td>
                      {values[value].replace(/^\w|\s\w/g, function(letter) {
                        return letter.toUpperCase();
                      })}
                    </td>
                  );
                });
                return (
                  <tr>
                    {val}
                    <td className="text-center">
                      <Button
                        className="mr-sm-3"
                        onClick={() => editUser(values._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mr-sm-3"
                        variant="danger"
                        onClick={() => deleteUser(values._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default HocSpinnerComponent(UsersTableComponent);
