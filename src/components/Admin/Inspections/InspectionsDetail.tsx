import React from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import { Button } from "@mui/material";
import CustomModal from "../../templates/CustomModal";
import AcknowledgeInspection from "../../templates/AcknowledgeInspection";

const InspectionsDetail = (props: any) => {
  console.log(props);
  const { launchNew } = props;
  console.log(" inspections page Renders");
  let val = props.data;
  const [inspections, setInspections] = React.useState<any>({});
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const closeToast = () => setToast({ ...toast, onopen: false });
  const [toast, setToast] = React.useState<any>({
    onopen: false,
    onclose: closeToast,
  });
  let params = useParams();
  console.log(params);
  React.useEffect(() => {
    const isParam = params.eId ? true : false;
    if (isParam) {
      doAjax(params.eId);
    }
  }, [params]); //componentDidMount

  const doAjax = (id: any) => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("properties", {
      id: id,
      mode: "inspection-details",
      is_admin: true,
    })
      .then(
        (result) => {
          console.log(result);
          if (result.status === 1) {
            setInspections(result.data);
          }
        },
        (error) => {
          setInspections({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  const acknowledgeBooking = () => {
    setLoading(true);
    setLoaded(false);
    setToast({
      ...toast,
      message: "Sending...",
      onopen: true,
      onclose: closeToast,
    });
    HttpService.postHeader("properties", {
      mode: "ack-inspection",
      id: inspections.id,
    })
      .then(
        (resp) => {
          console.log(resp);
          setToast({
            ...toast,
            message: resp.message + "...",
            onopen: true,
            onclose: closeToast,
          });
        },
        (error) => {
          setToast({
            ...toast,
            message: error.message,
            onclose: closeToast,
            onopen: true,
          });
        }
      )

      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };
  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py10">
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp">
                <div className="inline-block pxy20">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/inspections">Inspections</Link>
                  </Breadcrumbs>
                  <h2>
                    <i className="fas fa-user-group"></i> Inspection for{" "}
                    {inspections.property_title}
                  </h2>
                </div>
              </div>
            </div>
            <Divider />

            <section className="home-table">
              <div className="table-cover">
                <div className="t-row">
                  <div className="feature-span">
                    <span>Property</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{inspections.property_title}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Client Name</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{inspections.name}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Client Phone</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>{inspections.phone}</div>
                  </div>
                </div>
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Inspection Date</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>
                      <DatePipe value={inspections.inspection_date * 1000} />
                    </div>
                  </div>
                </div>
                {/*row ends */}
                {/*row ends */}
                <div className="t-row">
                  <div className="feature-span">
                    <span>Booked On</span>
                  </div>
                  <div className="grader">
                    <div className="spacer"></div>
                    <div>
                      <DatePipe value={inspections.book_date * 1000} />
                    </div>
                  </div>
                </div>
                {/*row ends */}

                <div className="t-row flex flex-row">
                  <div className="spacer"></div>
                  <div className="pxy10">
                    {inspections.status === 0 && (
                      <AcknowledgeInspection
                        id={inspections.id}
                        title={"Inspection for: " + inspections.property_title}
                      />
                    )}
                    {inspections.status === 1 && (
                      <div>
                        <i className="fas fa-check-double mr5"></i> Acknowledged
                      </div>
                    )}
                  </div>
                </div>
                {/*row ends */}
              </div>
            </section>

            {loading && (
              <div className="pxy10">
                <Card sx={{ m: "0", p: "0" }}>
                  <PlaceHolder type="list" />
                </Card>
              </div>
            )}
          </Card>
        </div>
      </section>
      <CustomModal data={toast} />
    </React.Fragment>
  );
};

export default InspectionsDetail;
