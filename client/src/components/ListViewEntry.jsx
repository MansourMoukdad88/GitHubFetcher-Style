import React from "react";

const ListViewEntry = props => {
  return (
    <div className="ListViewEntrey">
      <a href={props.repo.html_url} target="_blank" rel="noopener noreferrer">
        {props.repo.name}
      </a>
    </div>
  );
};

export default ListViewEntry;
