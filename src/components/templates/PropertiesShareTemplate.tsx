import React from "react";
import IconButton from "@mui/material/IconButton";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Share from "@mui/icons-material/Share";
import HttpService from "../../services/HttpService";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const PropertiesShareTemplate = (props: any) => {
  const { properties, position } = props;
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [shares, setShares] = React.useState(properties.share_num);
  const [dislikes, setDislikes] = React.useState(properties.dislike_num);
  const [info, setInfo] = React.useState({});

  const sendShare = (platform: string) => {
    setLoading(true);
    setLoaded(false);
    const load = {
      platform: platform,
      property_id: properties.id,
      mode: "save_property_share",
    };
    console.log(load);
    HttpService.postHeader("properties", load)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setShares(shares + 1);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    setOpen(false);
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
    setAnchorEl(null);
  };

  const afterShare = (platform: string) => {
    sendShare(platform);
  };

  const shareUrl = process.env.REACT_APP_SERVER_DOMAIN + properties.url;
  return (
    <React.Fragment>
      <span>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  paddingTop: "7px",
                  backgroundColor: "#dfdfdf",
                  borderRadius: "7px",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:before": position ? paper[`${position}`] : paper["top"],
                }}
              >
                <Tooltip title="Share on Twitter">
                  <span className="px5">
                    <TwitterShareButton
                      url={shareUrl}
                      title={properties.title}
                      className="Demo__some-network__share-button"
                      onShareWindowClose={() => afterShare("twitter")}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </span>
                </Tooltip>
                <Tooltip title="Share on Facebook">
                  <span className="px5">
                    <FacebookShareButton
                      url={shareUrl}
                      hashtag={"#properties"}
                      quote={properties.title}
                      title={properties.title}
                      className="Demo__some-network__share-button"
                      onShareWindowClose={() => afterShare("facebook")}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </span>
                </Tooltip>
                <Tooltip title="Share on Whatsapp">
                  <span className="px5">
                    <WhatsappShareButton
                      url={shareUrl}
                      title={properties.title}
                      className="Demo__some-network__share-button"
                      onShareWindowClose={() => afterShare("whatsapp")}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </span>
                </Tooltip>
                <Tooltip title="Share on Linkedin">
                  <span className="px5">
                    <LinkedinShareButton
                      url={shareUrl}
                      title={properties.title}
                      className="Demo__some-network__share-button"
                      onShareWindowClose={() => afterShare("linkedin")}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </span>
                </Tooltip>
              </Paper>
            </Fade>
          )}
        </Popper>
        <IconButton onClick={handleClick(position)}>
          <Share />
        </IconButton>
        {shares}
      </span>
    </React.Fragment>
  );
};

const paper: any = {
  top: {
    content: '""',
    display: "block",
    position: "absolute",
    top: "calc(100% - 5px)",
    right: "45%",
    width: 12,
    height: 12,
    bgcolor: "#ddd",
    transform: "translateY(-5%) rotate(45deg)",
    zIndex: 0,
  },
  bottom: {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: "calc(100% - 5px)",
    right: "45%",
    width: 12,
    height: 12,
    bgcolor: "#ddd",
    transform: "translateY(-5%) rotate(45deg)",
    zIndex: 0,
  },
};

export default React.memo(PropertiesShareTemplate);
