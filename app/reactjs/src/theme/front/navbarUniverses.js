import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  NavCategories,
  BlocMenuCats,
} from "../../assets/styles/frontGlobalStyle";
import { getAllUniverses } from "../../store/functions/universeActions";
import { useOutsideAlerter } from "../../helper/events";
import { useMediaQuery } from "react-responsive";
import { trimChar } from "../../helper/functions";

export default function NavbarUniverses({ ...props }) {
  const { slugIdUniverse } = useParams();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1199px)" });
  const [more, setMore] = useState(false);
  const toggle = () => setMore(!more);
  const ref = useRef(null);
  useOutsideAlerter(ref, () => setMore(false));
  const [maxItems, setMaxItems] = useState(false);
  const dispatch = useDispatch();
  const universe = useSelector((state) => state.universe);
  const [activeUniverse, setActiveUniverse] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (universe.allUniverses === false) {
      dispatch(getAllUniverses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      slugIdUniverse &&
      universe.allUniverses &&
      universe.allUniverses.length
    ) {
      const id = slugIdUniverse.split("-").pop();
      if (id) {
        let key = -1;
        const universeData = universe.allUniverses.find((u, index) => {
          key = index;
          return parseInt(u.id) === parseInt(id);
        });
        if (universeData) {
          setActiveUniverse({ ...universeData, index: key });
        }
      }
    }
  }, [slugIdUniverse, universe.allUniverses]);

  const checkSearchEngine = (row) => {
    let url = window.location.pathname.trim();
    url = trimChar(url, '/');
    console.log(row)
    const isHome = url === '';
    if (isHome) {
      document.dispatchEvent(
        new CustomEvent("BannerHome", {
          detail: { url: `/univers/${row.slug}-${row.id}`, id: row.id, isHome },
        })
      );
    } else {
      
      document.dispatchEvent(
       
        new CustomEvent("Universe", {
         
          detail: { url: `/univers/${row.slug}-${row.id}`, id: row.id },
        })
      );
      history.push(`/univers/${row.slug}-${row.id}`);
    }
  };

  useEffect(() => {
    setMaxItems(isTabletOrMobile ? universe.allUniverses.length : 10);
  }, [isTabletOrMobile, universe.allUniverses]);

  const showLink = (row) => {
    return (
      <a
        className={`${
          activeUniverse && activeUniverse?.id === row.id ? "active" : ""
        }`}
        key={row.id}
        href="#"
        onClick={() => {
          if(activeUniverse && activeUniverse.id!=row.id){
            //on change universe clear InputSearch
          }
          setActiveUniverse(row);
          checkSearchEngine(row);
          props.setNav(false);
        }}
      >
        <span>{row.name}</span>
      </a>
    );
  };

  return (
    <NavCategories>
      <Container>
        
        {universe.allUniverses && universe.allUniverses.length ? (
          <BlocMenuCats>
            {maxItems &&
              universe.allUniverses
                .slice(0, maxItems)
                .map((row, index) => showLink({ ...row, index }))}
            {maxItems && universe.allUniverses.length > maxItems && (
              <div
                className={`autre-nav ${
                  more || activeUniverse.index >= maxItems ? "active" : ""
                }`}
                onClick={toggle}
                ref={ref}
              >
                <span>Autres</span>
                <div className={`sub-menu-nav ${more ? "open" : ""}`}>
                  {universe.allUniverses
                    .slice(maxItems, universe.allUniverses.length)
                    .map((row, index) =>
                      showLink({ ...row, index: index + maxItems })
                    )}
                </div>
              </div>
            )}
          </BlocMenuCats>
        ) : (
          ""
        )}
        
        
      </Container>
    </NavCategories>
  );
}
