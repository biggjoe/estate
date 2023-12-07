import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const PlaceHolder = (props?: any) => {
  console.log(" PlaceHolder Renders");
  const vals = props.type;
  return (
    <>
      {vals === "list" && (
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
            marginTop: "5px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ flexGrow: 0 }}>
            <>
              <Skeleton variant="circular" width={40} height={40} />
            </>
          </Box>
          <Box sx={{ flexGrow: 1, marginLeft: "5px" }}>
            <>
              {" "}
              <Skeleton variant="text" sx={{ fontSize: "1.4rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} />
            </>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "6px" }}>
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "40px" }}
              />
            </>
          </Box>
        </Box>
      )}

      {vals === "gallery-content" && (
        <Box
          sx={{
            display: "flex",
            margin: "20px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton
            sx={{ borderRadius: "4px", marginBottom: "7px" }}
            variant="rectangular"
            width={"100%"}
            height={25}
          />
          <Skeleton
            sx={{ borderRadius: "4px", marginBottom: "15px" }}
            variant="rectangular"
            width={"100%"}
            height={14}
          />

          <Skeleton
            sx={{ borderRadius: "4px" }}
            variant="rectangular"
            width={"100%"}
            height={320}
          />
        </Box>
      )}

      {vals === "profile" && (
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
            padding: "30px",
            marginTop: "5px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ flexGrow: 0, marginRight: "20px" }}>
            <>
              <div style={{ marginBottom: "20px" }}>
                <Skeleton variant="circular" width={170} height={170} />
              </div>
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
            </>
          </Box>
          <Box sx={{ flexGrow: 1, paddingLeft: "35px" }}>
            <div style={{ padding: "20px" }}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.1rem", marginBottom: "10px" }}
              />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <div className="py30"></div>
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.1rem", marginBottom: "10px" }}
              />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1.1rem" }} />
            </div>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "6px" }}></Box>
        </Box>
      )}
      {vals === "articles" && (
        <div className="pxy20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={220}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={220}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={220}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {vals === "feature-news" && (
        <div className="py5">
          <Skeleton
            sx={{ borderRadius: "4px", display: "block" }}
            variant="rectangular"
            height={70}
          />
        </div>
      )}
      {vals === "article-detail" && (
        <>
          <div
            className="py5"
            style={{
              backgroundColor: "#efefef",
            }}
          >
            <div
              className="container"
              style={{
                height: "60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Skeleton
                sx={{
                  borderRadius: "4px",
                  display: "block",
                }}
                variant="rectangular"
                height={20}
              />
            </div>
          </div>
          <div className="container pt10 flex flex-row-resp">
            <Skeleton
              sx={{
                borderRadius: "6px",
                mr: "10px",
                width: "65%",
                display: "block",
              }}
              variant="rectangular"
              height={450}
            />
            <Skeleton
              sx={{ borderRadius: "6px", width: "35%", display: "block" }}
              variant="rectangular"
              height={450}
            />
          </div>
        </>
      )}

      {vals === "users" && (
        <div className="pxy20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={90}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={90}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={90}
              />
            </Grid>
          </Grid>
        </div>
      )}

      {vals === "property-detail" && (
        <div className="pxy20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.6rem", marginBottom: "10px" }}
              />
              <Skeleton
                sx={{ borderRadius: "4px" }}
                variant="rectangular"
                width={"100%"}
                height={400}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", marginBottom: "5px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", marginBottom: "5px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", marginBottom: "5px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", marginBottom: "5px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", marginBottom: "5px" }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default React.memo(PlaceHolder);
