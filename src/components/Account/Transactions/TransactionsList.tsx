import React from "react";
import { Outlet, useLocation, useParams, NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MailOutline from "@mui/icons-material/MailOutline";
import PlaceHolder from "../../templates/PlaceHolder";
import HttpService from "../../../services/HttpService";
import DatePipe from "../../../pipes/DatePipe";
import { CreditCardOutlined } from "@mui/icons-material";

const TransactionsList = (props: any) => {
  console.log(" Ticket page Renders");
  let val = props.data;
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  let params = useParams();
  const location = useLocation();
  const pageName = location.pathname;
  const [isParam, setParam] = React.useState(false);
  const [ticket_modal_open, setNewModalOpen] = React.useState(false);
  const parts = location.pathname.split("/");
  const base = "/" + parts[1] + "/";
  React.useEffect(() => {
    const isParam = params.ticketId ? true : false;
    console.log("IS PARAM::: ", isParam);
    console.log("pageName::: ", pageName);
    setParam(isParam);
    if (
      (!isParam && pageName === "/account/transactions") ||
      (!isParam && pageName === "/admin/transactions")
    ) {
      doAjax();
    }
  }, [params]); //componentDidMount

  const doAjax = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("transactions", { mode: "all" })
      .then(
        (result) => {
          console.log(result);
          if (Array.isArray(result.data)) {
            setTransactions(result.data);
          } else {
            setTransactions([]);
          }
        },
        (error) => {
          setError(error.message);
          setTransactions([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const launchNewModal = () => {
    setNewModalOpen(true);
  };

  const newModalClose = (data: any = false) => {
    setNewModalOpen(false);
    if (data) {
      transactions.unshift(data);
    }
  };

  if (!isParam) {
    return (
      <>
        {!loading && (
          <div className="pxy10">
            <Card sx={{ p: "0", m: "0" }}>
              <List
                sx={{
                  p: "0",
                  m: "0",
                  // selected and (selected + hover) states
                  "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: "red",
                    "&, & .MuiListItemIcon-root": {
                      color: "pink",
                    },
                  },
                  // hover states
                  "& .MuiListItemButton-root:hover": {
                    bgcolor: "orange",
                    "&, & .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                {transactions.map((item: any, index: number) => (
                  <ListItem
                    disablePadding
                    button
                    key={item.id}
                    divider={true}
                    component={NavLink}
                    to={`${base}transactions/p/${item.id}`}
                    secondaryAction={
                      <>
                        <span>
                          <DatePipe value={item.transaction_date * 1000} />
                        </span>
                      </>
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <CreditCardOutlined />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography component={"h2"}>
                          {item.narration}
                        </Typography>{" "}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {loaded && transactions.length === 0 && (
                <div className="result-error">
                  <span>
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <h3> No transactions found!</h3>
                </div>
              )}
            </Card>
          </div>
        )}
        {loading && (
          <>
            <div className="pxy20">
              <Card className="pxy20">
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
                <Divider />
                <PlaceHolder type="list" />
              </Card>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <Outlet />;
  }
};

export default TransactionsList;
