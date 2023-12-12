import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { BtnFile, FileBox } from "../../../assets/styles/componentStyles";
import { DeleteCloseIcon, QuestionIcon } from "../../../assets/styles/icons";
import Proposition from "../../../components/proposition";
import { ButtonDef, Input } from "../../../components/ui";
import PopinModal from "../../../components/ui-elements/popinModal";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import { getMsgError, scrollTop } from "../../../helper/functions";

export default function InfosStep({
  benefit = {},
  deliveryMode = {},
  activeIndex,
  setActiveIndex,
  state,
  setState,
  message = false,
  setMessage,
  isPending = false,
  setIsPending,
  saveAddresses
}) {
  const [universe, setUniverse] = useState(false);
  const { slugIdUniverse } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    type: "",
  });

  useEffect(() => {
      getUniverse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUniverse = () => {
    const id = slugIdUniverse.split("-").pop();
    if (id) {
      connector({
        method: "get",
        url: `${endPoints.ANONYMOUS_UNIVERSE}${id}/categories`,
        success: (response) => {
          setUniverse(response.data);
          console.log(response.data);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    } 
  };

  const checkInfos = () => {
    setMessage(null);
    if (benefit.typeService === "devis" && benefit.priceQuote > 0) {
      setActiveIndex(activeIndex + 1);
      scrollTop();
    } else {
      saveAddresses(false);
    }
  };

  const importPicture = () => {
    setMessage(null);
    if (state.infos.files.value.length >= 4) {
      msgErrors({ msg: "Vous pouvez joindre jusqu'à 4 photos." });
      return;
    }
    if (state.infos.picture.file) {
      saveImage();
    } else {
      msgErrors({ picture: !state.infos.picture.file });
    }
  };

  const saveImage = () => {
    setMessage(null);
    setIsPending(true);
    const data = new FormData();
    data.append("file", state.infos.picture.file);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        const cpState = { ...state };
        cpState.infos.picture.file = null;
        cpState.infos.picture.nameFile = "";
        cpState.infos.files.value.push(response.data.contentUrl);
        document.getElementById("file-img").value = "";
        setState(cpState);
        setIsPending(false);
      },
      catch: (error) => {
        msgErrors({ msg: getMsgError(error) });
      },
    });
  };

  const removeImage = (image, index) => {
    setMessage(null);
    if (image) {
      image = image.replace("/media/", "");
      connector({
        method: "delete",
        url: `${endPoints.ANONYMOUS_DELETE_MEDIA_OBJECT}/${image}`,
        success: (response) => {
          const cpState = { ...state };
          cpState.infos.files.value.splice(index, 1);
          setState(cpState);
        },
        catch: (error) => {
          console.log(error);
        },
      });
    }
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    const cpState = { ...state };
    if (e.picture !== undefined) cpState.infos.picture.error = e.picture;
    setState(cpState);
    setIsPending(false);
    scrollTop();
  };

  return (
    <>
      <div className="left-content-detail">
        <div className="bloc-infos-step">
          {message && message.type && message.text ? (
            <span
              className={`${
                message.type === "error" ? "text-danger" : "text-success"
              } bloc-message`}
            >
              {message.text}
            </span>
          ) : (
            ""
          )}
          <h1 className="title-step-tunnel">Informations complémentaires</h1>
          <p className="sub-title-step-tunnel">
            Indiquez toute information permettant au réparateur d’effectuer son
            devis
          </p>
          <Input
            {...state.infos.description}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.infos.description.value = e.target.value;
              setState(cpState);
            }}
          />

          <FileBox>
            <div className="bloc-upload-fils">
              <div className="content-upload-file">
                <div className="form-group">
                  <label>
                    Joindre une photo (.jpg et .png autorisés, 4 Mo maximum par
                    photo)
                    {universe && <Link
                      to={"#"}
                      target="_blank"
                      className=""
                      onClick={(e) => {
                        e.preventDefault();
                        setDataModal({
                          type: "modal-save",
                          title: "Aide pour l’ajout de photos",
                        });
                        setShowModal(true);
                      }}
                    >
                      <QuestionIcon/>
                    </Link>}
                  </label>
                  <div className="bloc-wrapper-file">
                    <div
                      className={`file-wrapper ${
                        state.infos.picture.error ? "form-error" : ""
                      }`}
                    >
                      <input
                        type="file"
                        name={state.infos.picture.name}
                        id="file-img"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          if (e?.target?.files[0]?.name) {
                            const cpState = { ...state };
                            cpState.infos.picture.file = e.target.files[0];
                            cpState.infos.picture.nameFile =
                              e.target.files[0].name;
                            cpState.infos.picture.error = false;
                            //e.target.value = "";
                            setState(cpState);
                          }
                        }}
                        className="inputfile"
                      />
                      <BtnFile htmlFor="file-img">Parcourir</BtnFile>
                    </div>
                    <ButtonDef
                      className="btn-light"
                      textButton="Importer"
                      onClick={() => importPicture()}
                      spinner={isPending}
                    />
                  </div>
                </div>
              </div>
              <div className="lists-fils">
                {state.infos.files.value &&
                  state.infos.files.value.map((val, index) => (
                    <p className="item-upload" key={index}>
                      <span>{val.replace("/media/", "")}</span>
                      <button onClick={() => removeImage(val, index)}>
                        <DeleteCloseIcon />
                      </button>
                    </p>
                  ))}
              </div>
            </div>
          </FileBox>
        </div>
      </div>
      <div className="right-content-detail">
        <Proposition
          benefit={benefit}
          deliveryMode={deliveryMode}
          checkInfos={checkInfos}
          isPending={isPending}
        />
      </div>
      <PopinModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        title={dataModal.title}
      >
        {universe && parse(universe.descriptionPictures)}
      </PopinModal>
    </>
  );
}
