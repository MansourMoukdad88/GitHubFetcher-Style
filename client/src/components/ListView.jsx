import React from "react";
import ListViewEntry from "./ListViewEntry.jsx";

const ListView = props => {
  return (
    <div>
      {props.repos.map(repo => (
        <ListViewEntry repo={repo} />
      ))}
    </div>
  );
};

export default ListView;
