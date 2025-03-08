// src/pages/PostDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1); // Navigate back to the feed

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <h1>Post Detail - {id}</h1>
      <p>This is a detailed view for post {id}.</p>
    </div>
  );
};

export default PostDetail;
