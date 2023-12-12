import React from "react";
import { ButtonDef } from "../ui";
import {
  ServicesTableStyle,
  ItemPrestationStyle,
} from "../../assets/styles/adminStyle/adminGlobalStyle";
import { AddGreenIcon } from "../../assets/styles/icons";
import Table from "./table";
import { useMediaQuery } from "react-responsive";
import { parentCategories, getPathImage } from "../../helper/functions";

export default function ListsRepairMan({
  setActiveItem,
  item,
  items,
  textButtonAjoute,
  filter,
  setFilter,
  totalItems,
  perPage,
  setPerPage,
  pageIndex,
  setPageIndex,
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const rowRender = (row) => (
    <ItemPrestationStyle key={row.id} className="col-xxl-3" xl={4}>
      <div
        className={`content-item-prestation ${
          item.id === row.id ? "active" : ""
        }`}
        onClick={() => item.id === row.id ? setActiveItem(false) : setActiveItem(row)}
      >
        <div className="img-prestation">
          <img
            className="img-fluid"
            src={getPathImage(row.picture)}
            alt={row.name}
          />
        </div>
        <div className="detail-prestation">
          <p className="name-prestation">{row.name}</p>

          <p className="price-estime">
            {row.averagePrice && row.averagePrice > 0
              ? `Prix moyen ${parseFloat(row.averagePrice).toFixed(0)} € TTC`
              : ""}
          </p>

          <div className="cats-prestation">
            <span>Catégories :</span>
            <div className="item-cats-prestation">
              {row.categories
                ? parentCategories(row.categories).map((cat) => (
                    <p key={cat.id}>
                      <span>{cat.name}</span>
                    </p>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </ItemPrestationStyle>
  );

  return (
    <ServicesTableStyle>
      {textButtonAjoute ? (
        <ButtonDef
          onClick={() => setActiveItem("new")}
          textButton={
            <>
              {!isMobile && textButtonAjoute} <AddGreenIcon />{" "}
            </>
          }
          className="btn-add"
        />
      ) : null}

      <Table
        pagination={true}
        totalItems={totalItems}
        items={items}
        rowRender={rowRender}
        filter={filter}
        setFilter={setFilter}
        perPage={perPage}
        setPerPage={setPerPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </ServicesTableStyle>
  );
}
