import React, { useRef, useState } from "react";
import parse from "html-react-parser";
import InputSearch from "./inputSearch";
import endPoints from "../../config/endPoints";
import connector from "../../connector";
import { useOutsideAlerter } from "../../helper/events";

export default function InputSearchKeyword({
  universe = false,
  filter,
  setFilter,
  ...props
}) {
  const [more, setMore] = useState(true);
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setMore(false));

  const setActiveResult = (id, by, index, value) => {
    const cpFilter = { ...filter };
    cpFilter.keyword.active = { id, by, index };
    cpFilter.keyword.value = value;
    localStorage.setItem(
      "keywordId",
      cpFilter.keyword.active.id ? cpFilter.keyword.active.id : ""
    );
    localStorage.setItem(
      "keywordBy",
      cpFilter.keyword.active.by ? cpFilter.keyword.active.by : ""
    );
    localStorage.setItem("keywordVal", cpFilter.keyword.value);
    setFilter(cpFilter);
  };

  const isActive = (id, by, i) =>
    filter.keyword.active.id &&
    filter.keyword.active.id === id &&
    filter.keyword.active.by === by &&
    filter.keyword.active.index === i
      ? "active"
      : "";

  const replaceAll = (str) => {
    const keyword = filter.keyword.value;
    const arrayKeyword = keyword.split(" ");
    for (let i = 0; i < arrayKeyword.length; i++) {
      if (arrayKeyword[i]) {
        str = str.replace(
          new RegExp(arrayKeyword[i], "gi"),
          `<#>${arrayKeyword[i]}</#>`
        );
      }
    }
    str = str.replace(new RegExp("<#>", "gi"), `<span>`);
    str = str.replace(new RegExp("</#>", "gi"), `</span>`);
    return str;
  };

  const indexOfValue = (str) => {
    const arrayKeyword = filter.keyword.value.split(" ");
    if (str) {
      for (let i = 0; i < arrayKeyword.length; i++) {
        if (
          arrayKeyword[i] &&
          str.toLowerCase().indexOf(arrayKeyword[i].toLowerCase()) > -1
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const searchKeyword = (keyword) => {
    if (keyword && keyword.length > 2) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_SERVICE_SEARCH}?q=${keyword}&u=${universe?universe.id:""}`,
        success: (response) => {
          const cpFilter = { ...filter };
          cpFilter.keyword.options = response.data.hits.hits || [];
          setFilter(cpFilter);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } else {
      const cpFilter = { ...filter };
      cpFilter.keyword.options = [];
      setFilter(cpFilter);
    }
  };

  return (
    <InputSearch
      {...filter.keyword}
      onChange={(e) => {
        const cpFilter = { ...filter };
        cpFilter.keyword.value = e.target.value;
        cpFilter.keyword.active = { id: "", by: "", index: 0 };
        cpFilter.keyword.options = [];
        localStorage.setItem("keywordVal", cpFilter.keyword.value);
        localStorage.setItem("keywordBy", "");
        localStorage.setItem("keywordId", "");
        setFilter(cpFilter);
        searchKeyword(cpFilter.keyword.value);
      }}
      onClick={() => {
        setMore(true);
      }}
      children={
        filter.keyword.options.length && more ? (
          <div ref={ref} className="liste-search">
            {filter.keyword.options.map((row, index) => (
              <div className="item-search-rep-quoi" key={index}>
                {indexOfValue(row["_source"].name) ? (
                  <p
                    className={`name-result-search ${isActive(
                      row["_id"],
                      "name",
                      0
                    )}`}
                    onClick={() => {
                      setActiveResult(
                        row["_id"],
                        "name",
                        0,
                        row["_source"].name
                      );
                      setMore(false);
                    }}
                  >
                    {parse(replaceAll(row["_source"].name))}
                  </p>
                ) : (
                  ""
                )}

                {row["_source"].categories.map((val, i) => (
                  <div key={i}>
                    {indexOfValue(val.parent.name) ? (
                      <p
                        className={`parent-cats ${isActive(
                          row["_id"],
                          "categories.parent.name",
                          i
                        )}`}
                        onClick={() => {
                          setActiveResult(
                            row["_id"],
                            "categories.parent.name",
                            i,
                            val.parent.name
                          );
                          setMore(false);
                        }}
                      >
                        {parse(replaceAll(val.parent.name))}
                      </p>
                    ) : (
                      ""
                    )}
                    {indexOfValue(val.name) ? (
                      <p
                        className={`cat ${isActive(
                          row["_id"],
                          "categories.name",
                          i
                        )}`}
                        onClick={() => {
                          setActiveResult(
                            row["_id"],
                            "categories.name",
                            i,
                            val.name
                          );

                          setMore(false);
                        }}
                      >
                        {parse(replaceAll(val.name))}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                {indexOfValue(row["_source"].description) ? (
                  <p
                    className={`desc-result-search ${isActive(
                      row["_id"],
                      "description"
                    )}`}
                    onClick={() => {
                      setActiveResult(
                        row["_id"],
                        "description",
                        0,
                        row["_source"].description
                      );

                      setMore(false);
                    }}
                  >
                    {parse(replaceAll(row["_source"].description))}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : null
      }
    />
  );
}
