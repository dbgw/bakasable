import React from "react";
import { sortableHandle } from "react-sortable-hoc";
const DragHandle = sortableHandle(() => (
  <div className="handle-sort">
    <span></span>
    <span></span>
  </div>
));

export default DragHandle;
