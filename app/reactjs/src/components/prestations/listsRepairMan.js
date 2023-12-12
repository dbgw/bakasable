import React from "react";
import { ButtonDef } from "../ui";
import {
  ServicesTableStyle,
  ItemPrestationStyle,
} from "../../assets/styles/adminStyle/adminGlobalStyle";
import { AddGreenIcon } from "../../assets/styles/icons";
import Table from "./table";
import noImage from "../../assets/images/noImage.png";
import * as vars from "../../vars";
import { parentCategories } from "../../helper/functions";

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
  const getPathImage = (image) => (image ? vars.pathImage + image : noImage);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTextTypeService = (row) => {
    let text = "";
    if (row.typeService !== "non défini") {
      text = `${capitalize(row.typeService)}`;
      if (row.typeService === "devis") {
        if (row.priceQuote && row.priceQuote > 0) {
          text += ` : ${parseFloat(row.priceQuote).toFixed(2)} € TTC`;
        } else {
          text += ` : gratuit`;
        }
      } else if (row.typeService === "forfait") {
        if (row.minPrice && row.minPrice > 0) {
          text += ` : ${parseFloat(row.minPrice).toFixed(2)} € TTC`;
        }
      }
    }
    return text;
  };

  const rowRender = (row) => (
    <ItemPrestationStyle key={row.id} className="col-xxl-3" xl={4} md={6}>
      <div
        className={`content-item-prestation ${
          item.id === row.id ? "active" : ""
        }`}
        onClick={() => setActiveItem(row)}
      >
        <div className="img-prestation">
          <img
            className="img-fluid"
            src={getPathImage(row.service.picture)}
            alt={row.service.name}
          />
        </div>
        <div className="detail-prestation">
          <p className="name-prestation">{row.service.name}</p>

          <p className="price-estime">{getTextTypeService(row)}</p>

          <div className="cats-prestation">
            <span>Catégories :</span>
            <div className="item-cats-prestation">
              {row.service.categories
                ? parentCategories(row.service.categories).map((cat) => (
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
              {textButtonAjoute} <AddGreenIcon />{" "}
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
