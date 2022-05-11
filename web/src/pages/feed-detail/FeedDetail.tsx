import React from 'react';
import { useParams } from "react-router";

function FeedDetail() {
const { id } = useParams();
  return (
    <div>FeedDetail: {id}</div>
  );
}

export default FeedDetail;