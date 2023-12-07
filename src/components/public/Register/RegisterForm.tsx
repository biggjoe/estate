import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import HttpService from "../../../services/HttpService";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AuthService from "../../../services/AuthService";
import CustomModal from "../../templates/CustomModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  padding: "40px",
  margin: "0 auto",
  textAlign: "center",
  bgcolor: "background.paper",
  minWidth: "280px",
  border: "1px solid #eee",
  borderRadius: "8px",
  transition: "0.3s ease-in-out",
  boxShadow: 24,
  p: 4,
};

const RegisterForm = (props: any) => {
  console.log("Register Form rerenders....");
  const usr = AuthService.getCurrentUser();
  console.log("USER::: ", usr);
  let { ref_data } = props;
  console.log(":::", ref_data);
  const [load, setLoad] = React.useState<any>({
    is_ref: "0",
    action: "register",
  });

  React.useEffect(() => {
    if (ref_data.is_ref) {
      setLoad({ ...load, is_ref: "1", ref_id: ref_data.username });
    }
  }, [ref_data]);
  const [cur_page, setPage] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const closeToast = () => setToast({ ...toast, onopen: false });
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: closeToast,
  });

  let navigate = useNavigate();

  const handleInputChange = (event: any, index: number = -1) => {
    const target = event.target;
    const value = target.value;
    var targ_name = target.name;
    console.log("required:", target.required);
    setLoad((prevState: any) => ({
      ...prevState,
      [targ_name]: value,
    }));
  };
  const stages: any[] = [
    "Hello, Welcome",
    "Personal Details",
    "Next of Kin Details",
    "Banking Details",
    "Login Details",
    "Preview & Submit",
  ];

  let preview: any = [];

  function capStr(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  for (let key in load) {
    let val = load[key];
    const ko = key;
    if (key === "password") {
      val = "**********";
    } else if (key === "is_ref" && load[key] === "1") {
      val = "Yes";
    } else if (key === "is_ref" && load[key] === "0") {
      val = "No";
    }
    key = key === "is_ref" ? "Were you referred?" : key;
    key = key === "ref_id" ? "Referral Code" : key;
    key = key.replace(/nok/g, "next of kin");
    const spl = key.split("_");
    const ky = capStr(spl.join(" "));
    const op = `<div class="flex flex-row"><span class="bolder">
    ${ky}</span> <span class="spacer"></span> <span>${val}
    </span></div>`;
    if (ko !== "password2" && ko !== "action") {
      preview.push(op);
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleRegister(load);
  };

  const handleRegister = (data: any) => {
    setLoading(true);
    setLoaded(false);
    setToast({
      ...toast,
      message: "Creating Account..",
      onopen: true,
      onclose: closeToast,
    });
    HttpService.postForm("register", data)
      .then(
        (response) => {
          console.log(response);
          setToast({
            ...toast,
            message: response.message,
            onopen: true,
            onclose: closeToast,
          });

          if (response.status === 1) {
            setTimeout(() => {
              console.log("Redirecting now...");
              return navigate("/login");
            }, 2000);
          }
        },
        (error) => {
          console.log(error);
          setToast({
            ...toast,
            message: error.message,
            onopen: true,
            onclose: closeToast,
          });
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  }; ///reg
  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="autoform">
          <div className="stage-header">{stages[cur_page]}</div>

          <section className={cur_page === 0 ? "show" : "hidden"}>
            {ref_data.is_ref !== true && (
              <>
                <div className="input-radio py20 mb20  STAGE00000">
                  <div className="mb10 pb10 txt-lg bold">
                    <h4>{"Were you referred?"}</h4>
                  </div>
                  <div className="flex flex-row">
                    <span className="pr10 spacer">
                      <label
                        className={`${
                          load.is_ref === "1" ? "active" : ""
                        } rounder-option block`}
                      >
                        <input
                          className={" form-control "}
                          name="is_ref"
                          type="radio"
                          checked={load.is_ref === "1"}
                          value={"1"}
                          onChange={handleInputChange}
                        />
                        {"Yes "}
                      </label>
                    </span>
                    <span className="spacer">
                      <label
                        className={`${
                          load.is_ref === "0" ? "active" : ""
                        } rounder-option block`}
                      >
                        <input
                          className={" form-control "}
                          name="is_ref"
                          type="radio"
                          value={"0"}
                          disabled={load.is_ref === "0"}
                          onChange={handleInputChange}
                        />
                        {"No "}
                      </label>
                    </span>
                  </div>
                </div>

                {load.is_ref === "1" && (
                  <Slide direction="up" in={load.is_ref === "1"}>
                    <div className="input">
                      <label>{"Referral Code"}</label>
                      <input
                        className={" form-control "}
                        name={"ref_id"}
                        type="text"
                        required
                        value={ref_data.username}
                        placeholder="Enter Referral Code"
                        onChange={handleInputChange}
                      />
                    </div>
                  </Slide>
                )}
              </>
            )}
            {/* IF REF NOT SUPPPLIED AUTO */}

            {ref_data.is_ref && (
              <div className="py10">
                <div className="boldest mb10 txt-lg">
                  Your were referred by:
                </div>
                <h2 className="">
                  {ref_data.firstname + " " + ref_data.surname}
                </h2>
              </div>
            )}
          </section>
          {/**Stage 1 Ends */}
          <section className={cur_page === 1 ? "show" : "hidden"}>
            <Slide direction="up" in={cur_page === 1}>
              <div className="pb10  pt30 STAGE111">
                <div className="input">
                  <label>
                    {"Firstname"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"firstname"}
                    type="text"
                    required
                    placeholder="Firstname"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Surname"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"surname"}
                    type="text"
                    required
                    placeholder="Surname"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>{"Othernames"}</label>
                  <input
                    className={" form-control "}
                    name={"othernames"}
                    type="text"
                    required
                    placeholder="Othernames"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Phone"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"phone"}
                    type="text"
                    required
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Email"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"email"}
                    type="text"
                    required
                    placeholder="Email Address"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>{"Gender"}</label>
                  <select
                    className={" form-control "}
                    name={"gender"}
                    placeholder="Gender"
                    onChange={handleInputChange}
                  >
                    <option value={""}>Select Gender</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>

                <div className="input">
                  <label>{"Marital Status"}</label>
                  <select
                    className={" form-control "}
                    name={"marital_status"}
                    placeholder="Marital Status"
                    onChange={handleInputChange}
                  >
                    <option value={""}>Select Marital Status</option>
                    <option value={"Married"}>Married</option>
                    <option value={"Single"}>Single</option>
                    <option value={"Divorced"}>Divorced</option>
                    <option value={"Separated"}>Separated</option>
                  </select>
                </div>
              </div>
            </Slide>
          </section>
          {/**Stage 2 Ends */}
          <section className={cur_page === 2 ? "show" : "hidden"}>
            <Slide direction="up" in={cur_page === 2}>
              <div className="pb10  pt30 STAGE222">
                <div className="input">
                  <label>
                    {"Next of Kin Firstname"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"nok_firstname"}
                    type="text"
                    required
                    placeholder="Next of Kin Firstname"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Next of Kin Surname"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"nok_surname"}
                    type="text"
                    required
                    placeholder="Next of Kin Surname"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>{"Next of Kin Relationship"}</label>
                  <select
                    className={" form-control "}
                    name={"nok_relationship"}
                    required
                    placeholder="Next of Kin Relationship"
                    onChange={handleInputChange}
                  >
                    <option value={""}>Select Relationship</option>
                    <option value={"Parent"}>Parent</option>
                    <option value={"Spouse"}>Spouse</option>
                    <option value={"Sibling"}>Sibling</option>
                    <option value={"Neice"}>Neice</option>
                    <option value={"Nephew"}>Nephew</option>
                    <option value={"Friend"}>Friend</option>
                  </select>
                </div>

                <div className="input">
                  <label>
                    {"Next of Kin phone"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"nok_phone"}
                    type="text"
                    required
                    placeholder="Next of Kin Phone Number"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Next of Kin Email Address"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"nok_email"}
                    type="text"
                    placeholder="Next of Kin Email Address"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Slide>
          </section>
          {/**Stage 3 Ends */}
          <section className={cur_page === 3 ? "show" : "hidden"}>
            <Slide direction="up" in={cur_page === 3}>
              <div className="pb10  pt30 STAGE555">
                <div className="input">
                  <label>
                    {"Bank Name"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"bank_name"}
                    type="text"
                    required
                    placeholder="Bank Name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Account Name"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"account_name"}
                    type="text"
                    required
                    placeholder="Account Name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Account Number"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"account_number"}
                    type="text"
                    required
                    placeholder="Account Number"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <label>{"Accoun Type"}</label>
                  <select
                    className={" form-control "}
                    name={"account_type"}
                    required
                    placeholder="Account type"
                    onChange={handleInputChange}
                  >
                    <option value={""}>Select Account Type</option>
                    <option value={"Savings"}>Savings</option>
                    <option value={"Current"}>Current</option>
                  </select>
                </div>
              </div>
            </Slide>
          </section>
          {/**Stage 4 Ends */}
          <section className={cur_page === 4 ? "show" : "hidden"}>
            <Slide direction="up" in={cur_page === 4}>
              <div className="pb10  pt30 STAGE333">
                <div className="input">
                  <label>{"Email Address"}</label>
                  <div
                    className={" form-control boldest "}
                    aria-disabled="true"
                  >
                    {load.email}
                  </div>
                </div>
                <div className="input">
                  <label>{"Phone Number"}</label>
                  <div
                    className={" form-control boldest "}
                    aria-disabled="true"
                  >
                    {load.phone}
                  </div>
                </div>
                <div className="input">
                  <label>
                    {"Password"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"password"}
                    type="password"
                    required
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input">
                  <label>
                    {"Confirm Password"}
                    <sup
                      className="boldest red"
                      title="This field is required!"
                    >
                      *
                    </sup>
                  </label>
                  <input
                    className={" form-control "}
                    name={"password2"}
                    type="password"
                    required
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Slide>
          </section>
          {/**Stage 4 Ends */}
          <section className={cur_page === 5 ? "show" : "hidden"}>
            <Slide direction="up" in={cur_page === 5}>
              <div className="pb10  pt0 STAGE333">
                <div className="py20">
                  {preview.map((item: any, index: number) => (
                    <div
                      className="prev-line"
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item }}
                    ></div>
                  ))}
                </div>
                <div className="pb20">
                  <label>
                    <input
                      type={"checkbox"}
                      onClick={handleInputChange}
                      name="agree"
                    />{" "}
                    Agree to our
                    <a href="/terms"> Terms & conditions</a>
                  </label>
                </div>
                <div className="">
                  <Button
                    disabled={loading || load.agree !== "on"}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    <span>{loading && <CircularProgress size={"25px"} />}</span>
                    <span className="px10">
                      {loading ? "Working..." : "Submit"}
                    </span>
                  </Button>
                </div>
              </div>
            </Slide>
          </section>
          {/**ALL FORM ENDS */}
          <div className="flex flex-row py10">
            <span>
              {cur_page > 0 && (
                <Button
                  disabled={loading}
                  onClick={() => setPage(cur_page - 1)}
                >
                  <i className="fas fa-chevron-left"></i> Back
                </Button>
              )}
            </span>
            <span className="spacer"></span>
            <span>
              {cur_page < 5 && (
                <Button
                  disabled={loading}
                  onClick={() => setPage(cur_page + 1)}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </Button>
              )}
            </span>
          </div>
        </form>
        {/* 
        <Modal
          open={open}
          onClose={setModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              className=""
              dangerouslySetInnerHTML={createMarkup(response_text)}
            />

            <div className="text-center mt30">
              <Button size="small" onClick={() => setOpen(false)}>
                Ok
              </Button>
            </div>
          </Box>
        </Modal> */}
        <CustomModal data={toast} />
      </section>
    </>
  );
};

export default RegisterForm;
