import Button from "@mui/material/Button";
import React, { Component, useState } from "react";
import Icon from "@mui/material/Icon";
import TemplateModal from "./TemplateModal";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { FormatListNumberedRtlSharp } from "@mui/icons-material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { count } from "console";
import * as processHtml from "../../services/processHtml";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { DefaultEditor } from "react-simple-wysiwyg";
import type {} from "@mui/x-date-pickers/themeAugmentation";
//import type {} from "@mui/x-date-pickers-pro/themeAugmentation";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}
interface Fprops {
  meta: any[];
  loading?: boolean;
}

class AutoForm extends Component<any, any> {
  formLoad: any;
  checks: any;
  decodeHtml: any;
  truncateWord: any;

  constructor(props: Fprops) {
    super(props);

    this.decodeHtml = processHtml.decodeHtml;
    this.truncateWord = processHtml.truncateWord;

    this.checks = [];
    for (let i = 0; i < props.meta.length; i++) {
      const ik = props.meta[i].key;
      const ir = props.meta[i].required ? true : false;
      const sp = props.meta[i].value ? true : false;
      this.checks[i] = { key: ik, required: ir, supplied: sp };
    }

    //console.log(this.checks);
    const payload = this.props.meta;
    //this.checks = [];
    this.formLoad = this.props.meta;
    let istate: any = {};
    for (let i = 0; i < payload.length; i++) {
      if (payload[i]["type"] === "checkbox") {
        let opts = payload[i]["options"];
        let arr = new Array();
        let sels = new Array(payload[i]["options"].length).fill(false);
        for (let x = 0; x < opts.length; x++) {
          arr.push({ [opts[x]["value"]]: opts[x]["selected"] });
        }
        istate[payload[i]["key"]] = arr;
      } else if (payload[i]["type"] === "group_text") {
        let opts = payload[i]["children"];
        let arr = new Array();
        let sels = new Array(payload[i]["children"].length).fill(false);
        for (let x = 0; x < opts.length; x++) {
          arr.push({
            [opts[x]["name"]]: [opts[x]["name"]],
            [opts[x]["value"]]: [opts[x]["value"]],
          });
        }
        istate[payload[i]["key"]] = arr;
      } else if (payload[i]["type"] === "radio") {
        istate[payload[i]["key"]] = "";
      } else if (payload[i]["type"] === "date_input") {
        istate[payload[i]["key"]] = new Date(payload[i]["value"]);
      } else {
        istate[payload[i]["key"]] = payload[i]["value"];
      }
    }
    istate.loading = props.loading ? props.loading : false;
    this.state = istate;
    console.log(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleGroupAdd = this.handleGroupAdd.bind(this);

    console.log(istate);
  } //constroctor

  componentDidMount() {
    this.setState({
      openModal: false,
      open: false,
      files: [],
      form_error: "",
    });
  }

  selected_options: any[] = [];

  handleDateChange(value: any, target: any) {
    console.log(value, target);
    this.setState({
      [target]: value,
    });
  }
  handleGroupAdd(event: any, form: any, index: number) {
    event.preventDefault();
    //this.formLoad[index]["key"];
    let childs = form.children;
    childs.push({ name: form.key, value: "" });
    console.log(form);
    /* let old = this.state[target]["children"];
    //let new old.push();*/
    this.setState({
      [form.key]: form,
    });
  }

  onHtmlChange(e: any, name: any) {
    this.setState({
      [name]: e.target.value,
    });
    this.doCheck(e.target, name);
    console.log(this.state);
  }

  handleInputChange(event: any, index: number = -1, index2: number = -1) {
    //console.log("index:: ", index);
    const target_type = event.target.type;
    console.log(target_type);
    const target = event.target;
    if (target_type === "file") {
      let fname = target.name;
      let flx = target.files[0];
      flx.input_name = fname;
      console.log(flx);
      this.setState({
        files: [...this.state.files, flx],
      });
    }

    if (target_type === "checkbox") {
      const name = this.formLoad[index]["key"];
      var targ_name = this.formLoad[index]["key"];
      const inda = this.state[name];
      const objx = this.state[name][index2];
      let val_key = Object.keys(objx)[0];
      const namex = this.state[name][index2];
      let ido = inda.indexOf(objx);
      const new_value =
        this.state[name][index2][val_key] === true ? false : true;
      if (ido !== -1) {
        inda[ido] = { [val_key]: new_value };
      }

      this.setState({
        [name]: inda,
      });
    } else {
      const value = target.value;
      var name = target.name;
      var targ_name = target.name;
      this.setState({
        [name]: value,
      });
    }

    this.doCheck(target);

    //console.log(this.checks);
    console.log(this.state);
  }

  doCheck(target: any, name: any = false) {
    var targ_name = !name ? target.name : name;
    let obj = this.checks.find((o: any, i: number) => {
      if (o.key === targ_name) {
        console.log(o, i);
        console.log(target.value.length);
        if (target.value !== "" && target.value.length !== 0) {
          this.checks[i]["supplied"] = true;
          const without_err = this.formLoad[i]["style_class"]
            ? this.formLoad[i]["style_class"].substring("err".length)
            : "";
          this.formLoad[i]["style_class"] = without_err;
        } else if (target.value.length === 0) {
          this.checks[i]["supplied"] = false;
        }
        return true; // stop searching
      }
    });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    var err_count: any[] = [];
    var err_fields: any[] = [];
    this.checks.find((o: any, i: number) => {
      if (o.required === true && o.supplied === false) {
        this.formLoad[i]["style_class"] =
          this.formLoad[i]["style_class"] + " err ";
        err_count.push(true);
        err_fields.push(this.formLoad[i]["label"]);
      }
    });
    var err_list: string = "\n\n";
    for (let i = 0; i < err_fields.length; i++) {
      const lsw = i === err_fields.length - 1 ? "" : ", ";
      err_list += "[" + err_fields[i] + "]" + lsw;
    }
    if (err_count.length === 0) {
      //console.log("Present State:: ", this.state, " Checks:: ", this.checks);
      this.props.submitHandler(this.state);
    } else {
      //console.log("Present State:: ", this.state, " Checks:: ", this.checks);

      this.setState({
        open: true,
        form_error: `[${err_count.length}] required field${
          err_count.length > 1 ? "s" : ""
        } has not been supplied.\n ${err_list} `,
      });

      return; // stop searching
    }
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <section>
          <form onSubmit={this.handleSubmit} className="autoform">
            {this.formLoad.map((form: any, index: number) => (
              <div
                key={index}
                className={form.canshow !== false ? "" : "block pb10"}
              >
                {form.type === "checkbox" && (
                  <div className="py10">
                    <div className="pb10"> {form.label}</div>
                    {form.options.map((op: any, ind: number) => (
                      <span className="pr10" key={ind}>
                        <label key={op.value}>
                          <input
                            className={
                              " form-control " +
                              this.formLoad[index]["style_class"]
                            }
                            name={this.formLoad[index]["key"]}
                            type="checkbox"
                            value={op.value}
                            onChange={(e) =>
                              this.handleInputChange(e, index, ind)
                            }
                          />
                          {" " + op.label}
                        </label>{" "}
                      </span>
                    ))}
                  </div>
                )}

                {form.type === "radio" && (
                  <div className="py10">
                    <div className="pb10"> {form.label}</div>
                    {form.options.map((op: any, ind: number) => (
                      <span className="pr10" key={ind}>
                        <label key={op.value}>
                          <input
                            className={
                              " form-control " +
                              this.formLoad[index]["style_class"]
                            }
                            name={this.formLoad[index]["key"]}
                            type="radio"
                            value={op.value}
                            onChange={(e) =>
                              this.handleInputChange(e, index, ind)
                            }
                          />
                          {" " + op.label}
                        </label>
                      </span>
                    ))}
                  </div>
                )}

                {form.type === "group_text" && (
                  <div className="py10">
                    <div className="pb10"> {form.label}</div>
                    <div>
                      <button
                        onClick={(e) => this.handleGroupAdd(e, form, index)}
                      >
                        ADD
                      </button>
                    </div>
                    {form.children.map((op: any, ind: number) => (
                      <span className="pr10" key={ind}>
                        <label key={op.value}>
                          <input
                            className={
                              " form-control " +
                              this.formLoad[index]["style_class"]
                            }
                            name={this.formLoad[index]["key"]}
                            type="text"
                            value={op.value}
                            onChange={this.handleInputChange}
                          />
                          {" " + op.label}
                        </label>
                      </span>
                    ))}
                  </div>
                )}

                {form.type === "date_input" && (
                  <div className="input">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DesktopDatePicker
                          label={form.label}
                          inputFormat="MM/dd/yyyy"
                          value={this.state[this.formLoad[index]["key"]]}
                          onChange={(e) =>
                            this.handleDateChange(
                              e,
                              this.formLoad[index]["key"]
                            )
                          }
                          renderInput={(params: any) => (
                            <TextField {...params} />
                          )}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                )}

                {form.type === "file_input" && (
                  <div className="input">
                    <label>
                      {form.label}
                      {this.formLoad[index]["required"] && (
                        <sup
                          className="boldest red"
                          title="This field is required!"
                        >
                          *
                        </sup>
                      )}
                    </label>
                    <input
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      type="file"
                      onChange={this.handleInputChange}
                    />
                  </div>
                )}
                {form.type === "text" && (
                  <div className="input">
                    <label>
                      {form.label}
                      {this.formLoad[index]["required"] && (
                        <sup
                          className="boldest red"
                          title="This field is required!"
                        >
                          *
                        </sup>
                      )}
                    </label>
                    <input
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      disabled={this.formLoad[index]["disabled"]}
                      type="text"
                      placeholder={this.formLoad[index]["placeholder"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    />
                  </div>
                )}
                {form.type === "email" && (
                  <div className="input">
                    <label>
                      {form.label}
                      {this.formLoad[index]["required"] && (
                        <sup
                          className="boldest red"
                          title="This field is required!"
                        >
                          *
                        </sup>
                      )}
                    </label>
                    <input
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      type="email"
                      placeholder={this.formLoad[index]["placeholder"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    />
                  </div>
                )}

                {form.type === "password" && (
                  <div className="input">
                    <label>{form.label}</label>
                    <input
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      type="password"
                      placeholder={this.formLoad[index]["placeholder"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    />
                  </div>
                )}
                {form.type === "hidden" && (
                  <input
                    name={this.formLoad[index]["key"]}
                    type="hidden"
                    value={this.state[this.formLoad[index]["key"]]}
                    onChange={this.handleInputChange}
                  />
                )}

                {form.type === "number" && (
                  <div className="input">
                    <label>
                      {form.label}{" "}
                      {this.formLoad[index]["required"] && (
                        <sup
                          className="boldest red"
                          title="This field is required!"
                        >
                          *
                        </sup>
                      )}
                    </label>
                    <input
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      type="number"
                      placeholder={this.formLoad[index]["placeholder"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    />
                  </div>
                )}
                {form.type === "textarea" && (
                  <div className="input">
                    <div className="spacer">
                      <label>
                        {form.label}{" "}
                        {this.formLoad[index]["required"] && (
                          <sup
                            className="boldest red"
                            title="This field is required!"
                          >
                            *
                          </sup>
                        )}
                      </label>
                      {/* 
                    <textarea
                      placeholder={this.formLoad[index]["placeholder"]}
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    ></textarea> */}

                      <DefaultEditor
                        value={this.decodeHtml(
                          this.state[this.formLoad[index]["key"]]
                        )}
                        onChange={(e) =>
                          this.onHtmlChange(e, this.formLoad[index]["key"])
                        }
                      />
                    </div>
                  </div>
                )}
                {form.type === "select" && (
                  <div className="input">
                    <label>
                      {form.label}{" "}
                      {this.formLoad[index]["required"] && (
                        <sup
                          className="boldest red"
                          title="This field is required!"
                        >
                          *
                        </sup>
                      )}
                    </label>
                    <select
                      className={
                        " form-control " + this.formLoad[index]["style_class"]
                      }
                      name={this.formLoad[index]["key"]}
                      value={this.state[this.formLoad[index]["key"]]}
                      onChange={this.handleInputChange}
                    >
                      {form.options.map((opt: any, index: number) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {form.type === "submit" && (
                  <div>
                    {/*<input type="submit" 
          value="Submit" 
                  className="form-control" />*/}
                    <div className="pb10">
                      <Button
                        onClick={this.handleSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={this.props.loading}
                        fullWidth={this.formLoad[index]["full_button"]}
                      >
                        {form.input_icon && form.input_icon !== "" && (
                          <Icon> {form.input_icon} </Icon>
                        )}{" "}
                        <span className="px10">
                          {" "}
                          {" " + form.label + " " || " Submit "}
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Snackbar
              open={this.state.open}
              onClose={this.handleClose}
              autoHideDuration={12000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              TransitionComponent={TransitionUp}
              key={""}
            >
              <Alert
                onClose={this.handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {this.state.form_error}
              </Alert>
            </Snackbar>
          </form>
        </section>
      </React.Fragment>
    );
  }
}

export default AutoForm;
