import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import CommentsList from "./CommentsList";
import CommentsDetails from "./CommentsDetails";
import CommentsEdit from "./CommentsEdit";

const Comments = (props: any) => {
  const navigate = useNavigate();

  const launchNew = () => {
    return navigate(`/admin/comments/a/new`);
  };
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<CommentsList launchNew={launchNew} />} />
        <Route path="/" element={<CommentsList launchNew={launchNew} />} />
        <Route path="/p/:newsUrl" element={<CommentsDetails />} />
        <Route
          path="/e/:cId"
          element={<CommentsEdit launchNew={launchNew} />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default Comments;
