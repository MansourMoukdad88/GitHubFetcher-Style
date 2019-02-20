import React from "react";

const RepoList = props => (
  <div className="reposListNum">
    There are <strong>{props.repos.length}</strong> Repos.
    <br />
  </div>
);

export default RepoList;
