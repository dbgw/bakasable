import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Select from "../ui-elements/select";
import { ItemsPrestationsStyle } from "../../assets/styles/adminStyle/adminGlobalStyle";
import FilterDefault from "../filterDefault";
import { useSelector } from "react-redux";
import * as vars from "../../vars";
import { useMediaQuery } from "react-responsive";
import { scrollTop } from "../../helper/functions";

export default function Table({ items = [], filter, setFilter, ...props }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 770px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const optionsPages = isMobile
    ? [{ value: 10, label: "10" }]
    : [
        { value: 20, label: "20" },
        { value: 40, label: "40" },
        { value: 80, label: "80" },
      ];

  const auth = useSelector((state) => state.auth);
  const [state, setState] = useState({
    pageNbr: {
      label: "Nombre de résultats par page : ",
      options: optionsPages,
      value: props.perPage ? parseInt(props.perPage) : 20,
      position: "auto",
    },
  });
  useEffect(() => {
    scrollTop("bloc-content-dashboard");
  }, [props.pageIndex]);
  const showData = () => {
    if (items === false) {
      return (
        <p className="loading-table" style={{ textAlign: "center" }}>
          Chargement...
        </p>
      );
    }
    if (items.length === 0) {
      return (
        <div
          className="no-content-loading"
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "22px",
            fontWeight: "600",
            margin: "40px 0",
          }}
        >
          Aucune donnée
        </div>
      );
    }
    return items.map(props.rowRender);
  };

  return (
    <>
      <FilterDefault
        className="services-filter"
        formItems={
          <>
            {filter?.universe ? (
              <Select
                {...filter.universe}
                onChange={(e) => {
                  const cpFilter = { ...filter };
                  cpFilter.universe.value = e.value;
                  cpFilter.activeElement = "universe";
                  setFilter(cpFilter);
                }}
              />
            ) : null}

            {filter?.category &&
            (filter.universe.value ||
              auth.roles.includes(vars.ROLES.ROLE_ADMIN)) ? (
              <Select
                {...filter.category}
                onChange={(e) => {
                  const cpFilter = { ...filter };
                  cpFilter.category.value = e.value;
                  cpFilter.activeElement = "category";
                  setFilter(cpFilter);
                }}
              />
            ) : null}

            {filter?.subCategory &&
            auth.roles.includes(vars.ROLES.ROLE_ADMIN) ? (
              <Select
                {...filter.subCategory}
                onChange={(e) => {
                  const cpFilter = { ...filter };
                  cpFilter.subCategory.value = e.value;
                  cpFilter.activeElement = "subCategory";
                  setFilter(cpFilter);
                }}
              />
            ) : null}

            {filter?.service && auth.roles.includes(vars.ROLES.ROLE_ADMIN) ? (
              <Select
                {...filter.service}
                onChange={(e) => {
                  const cpFilter = { ...filter };
                  cpFilter.service.value = e.value;
                  cpFilter.activeElement = "service";
                  setFilter(cpFilter);
                }}
              />
            ) : null}

            {filter?.repairMan && auth.roles.includes(vars.ROLES.ROLE_ADMIN) ? (
              <Select
                {...filter.repairMan}
                onChange={(e) => {
                  const cpFilter = { ...filter };
                  cpFilter.repairMan.value = e.value;
                  cpFilter.activeElement = "repairMan";
                  setFilter(cpFilter);
                }}
              />
            ) : null}
          </>
        }
      />
      <ItemsPrestationsStyle className={props.className}>
        <Row>{showData()}</Row>
      </ItemsPrestationsStyle>
      {props.pagination && props.totalItems !== 0 ? (
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
                  props.setPageIndex(0);
                }}
              />
            </div>
          )}

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(props.totalItems / props.perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(items) => {
              props.setPageIndex(items.selected);
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
    </>
  );
}
