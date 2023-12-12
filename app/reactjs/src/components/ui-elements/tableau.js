import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { SortDowIcon, SortIcon, SortUpIcon } from "../../assets/styles/icons";
import Select from "./select";
import { useMediaQuery } from "react-responsive";
import { scrollTop } from "../../helper/functions";

export default function Tableau({
  columns = [],
  data = [],
  rowClick,
  className = "",
  ...props
}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 994px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const optionsPages = isMobile
    ? [{ value: 8, label: "8" }]
    : [
        { value: 20, label: "20" },
        { value: 40, label: "40" },
        { value: 80, label: "80" },
      ];
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
    if (data === false)
      return (
        <div
          className="divTableRow"
          style={{ position: "relative", padding: "20px 0", height: "70px" }}
        >
          <div
            className="no-content-table"
            style={{ textAlign: "center", position: "absolute", top: "10px" }}
          >
            Chargement...
          </div>
        </div>
      );
    if (data.length === 0)
      return (
        <div
          className="divTableRow"
          style={{ position: "relative", padding: "20px 0", height: "70px" }}
        >
          <div
            className="no-content-table"
            style={{ textAlign: "center", position: "absolute", top: "10px" }}
          >
            Aucune donnée
          </div>
        </div>
      );

    return data.map(($item, $index) => props.rowRender($item));
  };

  return (
    <>
      <div className={`divTable ${className}`}>
        {columns ? (
          <div className="divTableHeading">
            <div className="divTableRow">
              {columns.map(($val) => (
                <div className="divTableHead" key={`head-${$val.key}`}>
                  <div className="head-table-sort">
                    <p
                      onClick={(e) => {
                        if ($val.sort) {
                          props.setActiveSort($val.key);
                          props.setSwitshSort(!props.switshSort);
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      {$val.text}
                      {$val.sort ? (
                        <span>
                          {props.activeSort === $val.key ? (
                            props.switshSort ? (
                              <SortUpIcon />
                            ) : (
                              <SortDowIcon />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="divTableBody">{showData()}</div>
      </div>
      {props.pagination && props.totalItemsLength !== 0 ? (
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
            pageCount={Math.ceil(props.totalItemsLength / state.pageNbr.value)}
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
    </>
  );
}
