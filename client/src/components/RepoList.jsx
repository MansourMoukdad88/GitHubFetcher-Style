import React from "react";

const RepoList = props => (
  <div className="reposListNum">
    <h4> Repo List : </h4>
    <strong>There are {props.repos.length} repos.</strong>
    <br />
  </div>
);

export default RepoList;
