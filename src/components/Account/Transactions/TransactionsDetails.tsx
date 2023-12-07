import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HttpService from "../../../services/HttpService";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
import ReplyAll from "@mui/icons-material/ReplyAll";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import DatePipe from "../../../pipes/DatePipe";
import PlaceHolder from "../../templates/PlaceHolder";
import * as processHtml from "../../../services/processHtml";
import AuthService from "../../../services/AuthService";
interface ld {
  subject: string;
  id: number;
  pid: number;
  message: string;
  replies: any[];
  tdate: string;
}

export default function TransactionsDetails() {
  const { decodeHtml, truncateWord } = processHtml;
  const usr = AuthService.getCurrentUser();
  let params = useParams();
  let ini: ld = {
    id: 0,
    pid: 0,
    subject: "",
    message: "",
    tdate: "",
    replies: [],
  };
  const [isParam, setParam] = React.useState(false);
  const [ticket_details, setTicketDetails] = React.useState<ld>(ini);
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [show_reply, setShowReply] = React.useState(false);
  const [reply_modal_open, setReplyModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const launchReplyModal = () => {
    return navigate(`/account/tickets/r/${ticket_details.id}`);
  };
  const goHome = () => {
    return navigate(`/account/tickets`);
  };
  const replyModalClose = (data: any = false) => {
    setReplyModalOpen(false);
    if (data) {
      ticket_details.replies.unshift(data);
    }
  };

  React.useEffect(() => {
    const isParam = params.ticketId ? true : false;
    setParam(isParam);
    if (isParam) {
      fetchDetails(params.ticketId);
    }
  }, []);

  const fetchDetails = (id: any) => {
    HttpService.postHeader("tickets", { mode: "details", id: id })
      .then((response) => {
        console.log(response);
        setTicketDetails(response.data);
      })
      .catch((error) => {
        setTicketDetails(ini);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  }; //fetChdetails;

  const openReply = () => {
    setShowReply(!show_reply);
  };
  if (loaded) {
    return (
      <>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            padding: "10px",
            width: "100%",
          }}
        >
          <Link underline="hover" href="#" onClick={goHome}>
            Tickets
          </Link>

          <Link underline="none" color="text.primary" aria-current="page">
            {ticket_details?.subject}
          </Link>
        </Breadcrumbs>

        <div className="pxy10">
          <div className="main-message-content">
            <div
              className=" flex  flex-align-items-center 
      flex-justify-center"
            >
              <h3 className="pt0 mb30">{ticket_details?.subject}</h3>
              <div className="spacer"></div>
              <div>
                <Tooltip title="Reply All">
                  <IconButton onClick={launchReplyModal}>
                    <ReplyAll />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(ticket_details?.message),
              }}
            ></div>
            <Divider sx={{ margin: "10px 0px" }} />
            <div className="flex flex-row justify-content-center align-items-center">
              <span>
                <i className="fas fa-clock"></i>{" "}
                <DatePipe value={ticket_details?.tdate} />
              </span>
              <span className="spacer text-right">
                <Tooltip title="Reply All">
                  <IconButton onClick={launchReplyModal}>
                    <ReplyAll />
                  </IconButton>
                </Tooltip>
              </span>
            </div>
          </div>

          <h3 className="mb10">
            <CommentOutlined /> REPLIES [{ticket_details.replies.length}]
          </h3>
          <Divider />
          <div className="mb10"></div>
          {ticket_details.replies.map((item: any, index: number) => (
            <div className="mb10" key={index}>
              <div
                className={
                  item.staff === "" || item.staff === "0"
                    ? "me reply-content"
                    : "they reply-content"
                }
              >
                <span className="t-arrow"></span>
                <div
                  className="mb20 pb10 border-bottom  pxy10
                flex flex-row justify-content-center align-items-center"
                >
                  <div className="boldest">{"Re: " + item.subject}</div>
                  <span className="spacer"></span>
                  <span className="">
                    <DatePipe value={item.tdate} />
                  </span>
                </div>
                <p
                  className="pb10 px10"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(item?.message),
                  }}
                ></p>
              </div>
              {/*  <Divider /> */}
            </div>
          ))}
        </div>
        {/*  <ReplyTicketModal
          data={{
            pid: ticket_details?.id,
            maxwidth: "100%",
            title: ticket_details?.subject,
            onopen: reply_modal_open,
            onclose: replyModalClose,
          }}
        /> */}
      </>
    );
  } else {
    return (
      <Card sx={{ padding: "10px" }}>
        <PlaceHolder type="list" />
        <Divider />
        <PlaceHolder type="list" />
      </Card>
    );
  }
}
