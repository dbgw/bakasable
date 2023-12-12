import React from "react";
import { SortableElement } from "react-sortable-hoc";
import DragHandle from "./dragHandle";
import {
  SortAccordionItem,
  HeadSortItem,
} from "../../assets/styles/adminStyle/adminGlobalStyle";
import { useMediaQuery } from "react-responsive";
import { ItemSortIcon } from "../../assets/styles/icons";

const ItemSort = SortableElement(
  ({ item, id, children, onClick, onIconClick }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const keyItem = item["@type"] + "_" + item.id;
    const order = item.level === undefined ? 0 : item.level + 1;

    return (
      <SortAccordionItem
        className={`sort-item-${keyItem} ${
          item.children ? "parent-sort-cat" : ""
        }`}
        key={keyItem}
      >
        <div className={`bloc-headSort-item head-level-${order}`}>
          <HeadSortItem
            aria-expanded={item.isActivated ? "true" : "false"}
            aria-controls={`sort_content_${keyItem}`}
            data-qa="sort-item-button"
            onClick={onClick}
            className={item.isActivated ? "collapsed" : ""}
          >
            <DragHandle />
            <div className="sort-item-head">
              <span>{item.name}</span>
              {isMobile && (
                <>
                  <ItemSortIcon
                    className={`${item.isActivated ? "active" : ""}`}
                    onClick={onIconClick}
                  />
                </>
              )}
            </div>
          </HeadSortItem>
        </div>
        <div
          id={`sort_content_${keyItem}`}
          data-qa="sort_content"
          className={`sort_content  ${item.isActivated ? "show-content" : ""}`}
        >
          {children}
        </div>
      </SortAccordionItem>
    );
  }
);

export default ItemSort;
