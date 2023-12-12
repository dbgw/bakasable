import React, { useState } from "react";
import { Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { ListProductStyle } from "../../assets/styles/frontGlobalStyle";
import Select from "../ui-elements/select";
import ProduitItem from "./produitItem";
import Loader from "../loader";
import { useMediaQuery } from "react-responsive";

export default function ListProduits({ data = [], ...props }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const optionsPages = isDesktopOrLaptop
    ? [
        { value: 20, label: "20" },
        { value: 40, label: "40" },
        { value: 80, label: "80" },
      ]
    : [{ value: 8, label: "8" }];
  const { slugIdUniverse } = useParams();
  const [state, setState] = useState({
    pageNbr: {
      label: "Nombre de résultats par page : ",
      options: optionsPages,
      value: props.perPage ? parseInt(props.perPage) : 20,
      position: "auto",
    },
  });
  const rowRenderservices = (row) => (
    <ProduitItem key={row.id} row={row} slugIdUniverse={slugIdUniverse} />
  );
  const showData = () => {
    if (data === false)
      return (
        <p className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </p>
      );
    if (data.length === 0)
      return (
        <h3
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "22px",
            fontWeight: "600",
            margin: "40px 0",
          }}
        >
          Aucune donnée
        </h3>
      );

    return data.map(rowRenderservices);
  };

  return (
    <ListProductStyle>
      {isDesktopOrLaptop && (
        <h1 className="title-bloc-products">
          {props.totalItemsLength} service(s)
        </h1>
      )}
      <Row style={props.isLoading ? { padding: "50px 0" } : null}>
        {props.isLoading ? <Loader /> : showData()}
      </Row>
      {!props.isLoading && props.pagination && props.totalItemsLength > 0 ? (
        <div className="paginations-bloc">
          {isDesktopOrLaptop && (
            <div className="results-of-page">
              <Select
                {...state.pageNbr}
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.pageNbr.value = e.value;
                  setState(cpState);
                  props.setPerPage(e.value);
                }}
              />
            </div>
          )}

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(props.totalItemsLength / props.perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(data) => {
              props.setPageIndex(data.selected);
            }}
            containerClassName={"pagination"}
            subContainerClassName={"page-item"}
            activeLinkClassName={"active disabled"}
            pageLinkClassName={"page-link"}
            pageClassName={"page-item"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active disabled"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            forcePage={props.pageIndex ? props.pageIndex : 0}
          />
        </div>
      ) : null}
    </ListProductStyle>
  );
}
