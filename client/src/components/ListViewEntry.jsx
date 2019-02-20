import React from "react";

const ListViewEntry = props => {
  return (
    <div className="ListViewEntrey">
      <a href={props.repo.html_url} target="_blank">
        {props.repo.name}
      </a>
    </div>
  );
};

export default ListViewEntry;
