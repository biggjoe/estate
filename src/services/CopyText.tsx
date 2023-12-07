import React from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import DoneAll from "@mui/icons-material/DoneAll";
import ContentCopy from "@mui/icons-material/ContentCopy";
const CopyText = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(text)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "4px 4px 4px 6px",
        display: "inline-flex",
        alignItems: "center",
        width: "auto",
      }}
    >
      <TextField id="ref-link" size="small" value={text} />
      <Tooltip title={isCopied ? "Copied!" : "Copy Link"}>
        <IconButton
          onClick={handleCopyClick}
          color="primary"
          sx={{ paddingLeft: "10px" }}
          aria-label="copy link"
        >
          {isCopied ? <DoneAll color="success" /> : <ContentCopy />}
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default React.memo(CopyText);
