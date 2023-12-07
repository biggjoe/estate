import React, { useEffect, useState } from "react";
import { ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import HttpService from "../../services/HttpService";
import AuthService from "../../services/AuthService";
import makeForm from "../../services/makeForm";
import EditProfileModal from "./EditProfileModal";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: "0px",
  margin: "0px",
  color: theme.palette.text.secondary,
}));

const UserDetailTemplate = (props: any) => {
  console.log(props);
  const [user, setUser] = useState<any>({});
  const [profile_modal, setProfileModal] = useState<any>({ onopen: false });
  const [personal_details, setPersonalDetails] = useState<any[]>([]);
  const [nok_details, setNokDetails] = useState<any[]>([]);
  const [bank_details, setBankDetails] = useState<any[]>([]);
  const usr = AuthService.getCurrentUser();
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

  useEffect(() => {
    setUser(props.data);
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
        pers.push(makeForm({ key: key, type: "text", value: value }));
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
  }, []); //componentDidMount

  const steps = [
    { id: 0, title: "PROFILE DETAILS" },
    { id: 1, title: "BANKING DETAILS" },
  ];

  const editOnClose = () => {
    setProfileModal({ onopen: false });
  };
  const launchChangePart = (obj: any) => {
    let mods: any = {};
    mods.onopen = true;
    mods.onclose = editOnClose;
    mods.form_data = obj;
    mods.title = "Edit Profile";
    setProfileModal(mods);
  };
  const savePart = (obj: any) => {
    HttpService.postHeader("settings/editdetails", obj).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <>
      <div>
        <ListItem disablePadding button={false}>
          <ListItemText>
            <div className="pxy30 flex flex-row justify-content-center align-items-center">
              <div className="px30 text-center min-mobile-width">
                <>
                  <div className="profile-largest">----</div>
                  <div>
                    <span>EDIT</span>
                  </div>
                </>
              </div>

              <div className="spacer text-left">
                <>
                  <h3>PERSONAL DETAILS</h3>
                  <ul className="padded list-style-type-none mx0">
                    <li>
                      {user.firstname + " " + user.surname}
                      <span>{" (" + user.gender + ")"}</span>
                    </li>

                    <li>{user.phone}</li>
                    <li>{user.email}</li>
                  </ul>
                  <Divider />
                  <ul className="padded list-style-type-none mx0">
                    <h3>NEXT OF KIN DETAILS</h3>
                    <li>
                      <span className="bold">
                        {user.nok_firstname + " " + user.nok_surname}
                      </span>
                    </li>
                    <li>
                      <span className="bold">Relationship</span>:{" "}
                      {user.nok_relationship}
                    </li>
                    <li>
                      <span className="bold">Phone</span>: {user.nok_phone}
                    </li>
                    <li>
                      <span className="bold">Email</span>: {user.nok_email}
                    </li>
                  </ul>
                </>
              </div>

              <div className="text-right pl20"></div>
              {/*  //LAST_COL */}
            </div>
          </ListItemText>
        </ListItem>

        <EditProfileModal data={profile_modal} />
      </div>
    </>
  );
};

export default UserDetailTemplate;
