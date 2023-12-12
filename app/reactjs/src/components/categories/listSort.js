import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import { AddGreenIcon } from "../../assets/styles/icons";
import { BtnAccordAdd } from "../../assets/styles/adminStyle/adminGlobalStyle";
import ItemSort from "./itemSort";

const ListSort = SortableContainer(({ data, ...props }) => {
  const renderedItems = data.map((item, index) => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      props.setOrderChildren(item.children[oldIndex], oldIndex, newIndex);
    };

    const isLast = index === data.length - 1;
    const order = item.level === undefined ? 0 : item.level + 1;
    const keyItem = item["@type"] + "_" + item.id;

    return (
      <ItemSort
        item={item}
        id={index}
        index={index}
        key={keyItem}
        onClick={() => {
          props.setActiveCategory(item);
        }}
        onIconClick={(e) => {
          e.stopPropagation();
          props.setActiveCategory(item, [], false);
        }}
        isLast={isLast}
        setActiveCategory={props.setActiveCategory}
      >
        <div className="children-accordion">
          {item.children && item.children.length !== 0 ? (
            <ListSort
              data={item.children}
              useDragHandle
              onSortEnd={onSortEnd}
              setOrderChildren={props.setOrderChildren}
              setActiveCategory={props.setActiveCategory}
              newItem={props.newItem}
              savePosition={props.savePosition}
            />
          ) : null}

          {item["@type"] !== "Category" || item.level !== 1 ? (
            <BtnAccordAdd
              className={`default-btn-add level-btn-${order}`}
              onClick={() => props.newItem(item, data)}
            >
              <AddGreenIcon />{" "}
              {item["@type"] === "Universe"
                ? "Ajouter une catégorie"
                : "Ajouter une sous-catégorie"}
            </BtnAccordAdd>
          ) : null}
        </div>
      </ItemSort>
    );
  });

  return (
    <div className="accordionSorts">
      <div className="sort-lists">{data.length ? renderedItems : ""}</div>
    </div>
  );
});

export default ListSort;
