import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import AuthService from "../../../services/AuthService";
import HttpService from "../../../services/HttpService";
import makeForm from "../../../services/makeForm";
import EditProfileModal from "../../templates/EditProfileModal";

export default function SettingsHome() {
  let params = AuthService.getCurrentUser();
  const [user, setUser] = React.useState<any>({});
  const [profile_modal, setProfileModal] = React.useState<any>({
    onopen: false,
  });
  const [personal_details, setPersonalDetails] = React.useState<any[]>([]);
  const [nok_details, setNokDetails] = React.useState<any[]>([]);
  const [bank_details, setBankDetails] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isParam, setParam] = React.useState(false);
  React.useEffect(() => {
    setUser(params);
  }, []);

  React.useEffect(() => {
    let nok_ = [
      "nok_firstname",
      "nok_surname",
      "nok_phone",
      "nok_email",
      "nok_relationship",
    ];
    let bank_ = ["bank_name", "account_name", "account_number", "account_type"];
    let personal_ = [
      "id",
      "firstname",
      "surname",
      "othernames",
      "phone",
      "othernames",
    ];

    let pers: any[] = [];
    let noks: any[] = [];
    let banks: any[] = [];

    for (const [key, value] of Object.entries(user)) {
      console.log(`${key}: ${value}`);
      if (nok_.includes(key)) {
        noks.push(makeForm({ key: key, type: "text", value: value }));
      } else if (bank_.includes(key)) {
        banks.push(makeForm({ key: key, type: "text", value: value }));
      } else if (personal_.includes(key)) {
        if (key === "id") {
          pers.push(makeForm({ key: key, type: "hidden", value: value }));
        } else {
          pers.push(makeForm({ key: key, type: "text", value: value }));
        }
      }
    }
    const btn = {
      key: "action",
      type: "submit",
      name: "action",
      label: "Update Profile",
      value: "update_profile",
    };
    noks.push(btn);
    banks.push(btn);
    pers.push(btn);
    setNokDetails(noks);
    setBankDetails(banks);
    setPersonalDetails(pers);
    console.log(pers);
    console.log(banks);
    console.log(noks);
  }, [user]); //componentDidMount

  const steps = [
    { id: 0, title: "PROFILE DETAILS" },
    { id: 1, title: "BANKING DETAILS" },
  ];

  const editOnClose = () => {
    setProfileModal({ onopen: false });
    setUser(params);
  };
  const launchChangePart = (obj: any) => {
    obj.mode = "edit-details";
    console.log("DET:: ", obj);
    let mods: any = {};
    mods.onopen = true;
    mods.onclose = editOnClose;
    mods.form_data = obj;
    mods.title = "Edit Profile";
    setProfileModal(mods);
  };
  const savePart = (obj: any) => {
    HttpService.postHeader("general", obj).then((resp) => {
      console.log(resp);
    });
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py30">
          <div className="page-head bg-grax">
            <div className="flex flex-row-resp">
              <div className="inline-block pxy20">
                <Avatar
                  src="/images/logo.png"
                  sx={{ width: "80px", height: "80px" }}
                />{" "}
                <h2>{user.firstname + " " + user.surname}</h2>
              </div>
            </div>
          </div>
          <div className="pt10 pb5 flex flex-row align-items-center">
            <h3>Profile info</h3>
            <span className="spacer"></span>
            <span>
              <IconButton onClick={() => launchChangePart(personal_details)}>
                <Edit />
              </IconButton>
            </span>
          </div>
          <Card sx={{ marginBottom: "10px" }}>
            <ListItem>
              <ListItemText>
                Firstname
                <h3>{user.firstname}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Surname
                <h3>{user.surname}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Gender
                <h3>{user.gender}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Phone
                <h3>{user.phone}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Email
                <h3>{user.email}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
          </Card>
          <div className="pt10 pb5 flex flex-row align-items-center">
            <h3>Banking info</h3>
            <span className="spacer"></span>
            <span>
              <IconButton onClick={() => launchChangePart(bank_details)}>
                <Edit />
              </IconButton>
            </span>
          </div>
          <Card sx={{ marginBottom: "10px" }}>
            <ListItem>
              <ListItemText>
                Bank
                <h3>{user.bank_name}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Account Name
                <h3>{user.account_name}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Account Number
                <h3>{user.account_number}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Account Type
                <h3>{user.account_type}</h3>
              </ListItemText>
            </ListItem>
          </Card>
          <div className="pt10 pb5  flex flex-row align-items-center">
            <h3>Next of Kin info</h3>
            <span className="spacer"></span>
            <span>
              <IconButton onClick={() => launchChangePart(nok_details)}>
                <Edit />
              </IconButton>
            </span>
          </div>
          <Card sx={{ marginBottom: "10px" }}>
            <ListItem>
              <ListItemText>
                Firstname
                <h3>{user.nok_firstname}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Surname
                <h3>{user.nok_surname}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Phone
                <h3>{user.nok_phone}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                Email
                <h3>{user.nok_email}</h3>
              </ListItemText>
            </ListItem>
            <Divider />
          </Card>
        </div>
      </section>
      <EditProfileModal data={profile_modal} />
    </React.Fragment>
  );
}
