import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../templates/CustomModal";
import useFetchAdvertSlots from "../../../hooks/useFetchAdvertSlots";

const AdvertsNew = (props: any) => {
  console.log("New News Renders");
  let val = props.data;

  let navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [staffs_fetched, setStaffsFetched] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [bio, setBio] = React.useState<string>("");
  const [loading_text, setText] = React.useState<string>("Save Now");
  const [new_file, setNewFile] = React.useState<any>(0);
  const [slot_settings, setSlotSettings] = React.useState<any>({});
  const { advert_slots, loading_advert_slots, loaded_advert_slots } =
    useFetchAdvertSlots();
  const onToastClose = () => {
    setToast({ onopen: false, onclose: onToastClose });
  };
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });
  const [meta, setMeta] = React.useState<any>(new FormData());

  React.useEffect(() => {}, []);

  const handleInputChange = React.useCallback(
    (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      console.log(name, value);
      if (name === "advert_slot") {
        setSlotSettings(advert_slots[value]);
        setMeta({ ...meta, slot_id: slot_settings.id });
        setPreview(null);
        setFile(null);
        console.log(slot_settings);
      } else {
        setMeta({ ...meta, [name]: value });
      }
      console.log(meta);
    },
    [meta, slot_settings]
  );

  const onHtmlChange = (e: any) => {
    setBio(e.target.value);
    console.log(bio);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", meta.title);
    formData.append("mode", "create");
    formData.append("file", file);
    formData.append("slot_id", meta.slot_id);
    formData.append("campaign_type", meta.campaign_type);
    formData.append("duration", meta.duration);
    formData.append("impressions", meta.impressions);
    setLoading(true);
    setLoaded(false);
    HttpService.postFormHeader("adverts", formData)
      .then(
        (resp) => {
          console.log(resp);
          setToast({ ...toast, onopen: true, message: resp.message });
          if (resp.status === 1) {
            setTimeout(() => {
              setToast({ ...toast, onopen: false });
              navigate(`/admin/adverts/p/${resp.uid}`);
            }, 3000);
          }
        },
        (error) => {
          setToast({ ...toast, onopen: true, message: error.message });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  const [file, setFile] = React.useState<any>(null);
  const [preview_image, setPreview] = React.useState<any>(null);
  const handleFileChange = (e: any) => {
    const formData = new FormData();
    let fname = e.target.name;
    let flx = e.target.files[0];
    formData.append("file", flx);
    console.log(e.target.files);
    console.log(flx, formData);
    setFile(flx);
    console.log(flx);
    setPreview(URL.createObjectURL(flx)); // Would see a path?
    setNewFile(1);
  };
  return (
    <>
      <div
        className="page-top-intro flex px10 py10 align-items-center 
      justify-bio-center"
      >
        <h3 className="py0 my0 px0 mx0">
          <i className="fas fa-user-tie"></i> New Advert
        </h3>
        <div className="spacer"></div>
      </div>
      <Divider />

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          padding: "10px",
          width: "100%",
        }}
      >
        <Link to="/admin/adverts">Adverts</Link>
        Create New Adverts
      </Breadcrumbs>
      <div className="px10 pb10">
        <Card sx={{ p: "0", m: "0" }}>
          <div style={{ padding: "20px" }}>
            <div className={loading ? " input iconed " : " input "}>
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={handleInputChange}
                placeholder={"Title "}
              />
              {loading && (
                <span className="input-icon">
                  <i className="fas fa-refresh fa-spin"></i>
                </span>
              )}
            </div>
            <div className="input">
              <label>Campaign Type</label>
              <select
                name="campaign_type"
                className="form-control"
                onChange={handleInputChange}
              >
                <option value="">Select Slot</option>
                <option value="impression">Impression count</option>
                <option value="fixed_duration">Fixed Duration</option>
              </select>
            </div>

            {meta.campaign_type && meta.campaign_type === "fixed_duration" && (
              <div className={loading ? " input iconed " : " input "}>
                <label>Duration (in days)</label>
                <input
                  type="number"
                  className="form-control"
                  name="duration"
                  onChange={handleInputChange}
                  placeholder={"Duration (in days)"}
                />
                {loading && (
                  <span className="input-icon">
                    <i className="fas fa-refresh fa-spin"></i>
                  </span>
                )}
              </div>
            )}

            {meta.campaign_type && meta.campaign_type === "impression" && (
              <div className={loading ? " input iconed " : " input "}>
                <label>No of Impressions</label>
                <input
                  type="number"
                  className="form-control"
                  name="impressions"
                  onChange={handleInputChange}
                  placeholder={"No of Impressions"}
                />
                {loading && (
                  <span className="input-icon">
                    <i className="fas fa-refresh fa-spin"></i>
                  </span>
                )}
              </div>
            )}

            {meta.campaign_type && meta.campaign_type !== "" && (
              <>
                <div className="input">
                  <label>Select Advert Slot</label>
                  <select
                    name="advert_slot"
                    className="form-control"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Slot</option>
                    {advert_slots.map((item: any, i: number) => (
                      <option value={i} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                {meta.slot_id && (
                  <>
                    <div className="banner-section">
                      {preview_image && (
                        <div className="image_preview">
                          <img
                            className=""
                            src={preview_image}
                            alt="preview Image"
                          />
                        </div>
                      )}
                      <div className={loading ? " input iconed " : " input "}>
                        <label>Attach AD Banner File</label>
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          onChange={handleFileChange}
                          placeholder={"Banner FIle "}
                        />
                      </div>
                    </div>
                  </>
                )}
                {file && meta.slot_id && (
                  <>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Working..." : " Create Ad"}
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </Card>
      </div>

      <CustomModal data={toast} />
    </>
  );
};

export default AdvertsNew;
