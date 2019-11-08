import React, { Component } from "react";
import HeaderJumbo from "../HeaderJumbo";
import UsersTableComponent from "../UsersTableComponent";
import CardComponent from "../CardComponent";
import Button from "react-bootstrap/Button";
import ModalComponent from "../ModalComponent";
import TextComponent from "../TextComponent";

// api axios baseUrl
import API from "../../ApiCalls/ApiCalls";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCust: [],
      TableHeader: [
        "first_name",
        "last_name",
        "email",
        "phone",
        "description",
        "created_at"
      ],
      loading: true,
      heading: "Add Customer",
      openModal: false,
      animation: true,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      dis: "",
      address: "",
      id: "",
      notfound:""
    };
  }

  componentDidMount() {
    this.getCustomers();
  }

  handleModalClose = () => {
    this.setState({
      openModal: false,
      heading: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      dis: "",
      address: "",
      id: ""
    });
  };

  handleModalOpen = heading => {
    this.setState({
      openModal: true,
      heading: heading
    });
  };
  HandleText = event => {
    const field = event.target.name;
    this.setState({
      [field]: event.target.value
    });
  };

  // get all customers
  getCustomers = () => {
    API.get("customers").then(res => {
      console.log(res);
      if (res && res.data.length > 0) {
        this.setState({
          allCust: res.data,
          loading: false,
          notfound:""
        });
      } else if (res && res.data.status === 404) {
        this.setState({
          loading: true,
          notfound:"No Users Found."
        });
      } else {
        this.setState({
          loading: true,
          notfound:""
        });
      }
    });
  };
  // add customer

  handleSubmit = () => {
    const customerData = {};
    customerData["first_name"] = this.state.firstname;
    customerData["last_name"] = this.state.lastname;
    customerData["email"] = this.state.email;
    customerData["phone"] = parseInt(this.state.phone);
    customerData["description"] = this.state.dis;
    customerData["address"] = this.state.address;

    if (customerData && this.state.id === "") {
      API.post("create", customerData).then(res => {
        if (res && res.data) {
          this.setState(
            {
              loading: false,
              openModal: false
            },
            this.getCustomers()
          );
        }
      });
    } else if (customerData && this.state.id) {
      API.put(`update?customerID=${this.state.id}`, customerData).then(res => {
        if (res && res.data) {
          this.setState(
            {
              loading: false,
              openModal: false,
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              dis: "",
              address: "",
              id: "",
            },
            this.getCustomers()
          );
        }
      });
    }
  };

  // deleteCust
  handleDelete = id => {
    API.delete(`delete?customerID=${id}`).then(res => {
      if (res && res.data) {
        this.setState(
          {
            heading: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            dis: "",
            address: "",
            id: ""
          },
          this.getCustomers()
        );
      }
    });
  };

  // editCust
  handleEdit = id => {
    API.get(`customer/${id}`).then(res => {
      if (res && res.data) {
        this.setState(
          {
            firstname: res.data.first_name,
            lastname: res.data.last_name,
            email: res.data.email,
            phone: res.data.phone,
            address: res.data.address,
            dis: res.data.description,
            id: res.data._id
          },
          () => {
            this.setState({
              openModal: true,
              heading: "Edit Customer"
            });
          }
        );
      }
    });
  };

  render() {
    return (
      <div>
        <HeaderJumbo {...this.props}></HeaderJumbo>
        <CardComponent
          header={"Customer Management"}
          styleCard={{ textAlign: "end" }}
        >
          <Button
            variant="primary"
            onClick={() => this.handleModalOpen("Add Customers")}
          >
            New Customer
          </Button>
        </CardComponent>
        <UsersTableComponent
          TableData={this.state.allCust}
          Header={this.state.TableHeader}
          Loading={this.state.loading}
          deleteUser={this.handleDelete}
          editUser={this.handleEdit}
          notfound={this.state.notfound}
        ></UsersTableComponent>
        <ModalComponent
          ModalHeading={this.state.heading}
          show={this.state.openModal}
          animation={this.state.animation}
          onHide={this.handleModalClose}
          editData={this.state.editUserData}
        >
          <TextComponent
            TextHeader={"First Name"}
            PlaceHolder={"First Name"}
            Name={"firstname"}
            onHandleText={this.HandleText}
            value={this.state.firstname}
          ></TextComponent>
          <TextComponent
            TextHeader={"Last Name"}
            PlaceHolder={"Last Name"}
            Name={"lastname"}
            onHandleText={this.HandleText}
            value={this.state.lastname}
          ></TextComponent>
          <TextComponent
            TextHeader={"Email"}
            PlaceHolder={"Email"}
            onHandleText={this.HandleText}
            Name={"email"}
            value={this.state.email}
          ></TextComponent>
          <TextComponent
            TextHeader={"Phone"}
            PlaceHolder={"Phone"}
            onHandleText={this.HandleText}
            Name={"phone"}
            value={this.state.phone}
          ></TextComponent>
          <TextComponent
            TextHeader={"Address"}
            PlaceHolder={"Address"}
            onHandleText={this.HandleText}
            Name={"address"}
            value={this.state.address}
          ></TextComponent>
          <TextComponent
            TextHeader={"Description"}
            PlaceHolder={"Description"}
            Textarea="textarea"
            Name={"dis"}
            onHandleText={this.HandleText}
            value={this.state.dis}
          ></TextComponent>
          <div style={{ textAlign: "end" }}>
            <Button
              variant="success"
              className="mr-sm-3"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="danger"
              className="mr-sm-3"
              onClick={this.handleModalClose}
            >
              Close
            </Button>
          </div>
        </ModalComponent>
      </div>
    );
  }
}
