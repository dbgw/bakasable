import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import {
  ContainePageSimple,
  TitlePage,
} from "../../../assets/styles/adminStyle/adminGlobalStyle";
import AdminBase from "../../../theme/back/adminBase";
import * as vars from "../../../vars";
import noImage from "../../../assets/images/noImage.png";
import {
  AddGreenIcon,
  DeleteIcon,
  EditIcon,
} from "../../../assets/styles/icons";
import { ButtonDef, Input } from "../../../components/ui";
import SelectCat from "../../../components/categories/selectCat";
import endPoints from "../../../config/endPoints";
import connector from "../../../connector";
import { clearErrors, validForm } from "../../../helper/form";
import { REFRESH_TOKEN, SET_USER } from "../../../store/functions/actionTypes";
import InputAddress from "../../../components/ui-elements/inputAddress";
import { getMsgError, isValidHttpUrl } from "../../../helper/functions";
import RatingBox from "../../../components/ui-elements/ratingBox";

export default function Vitrine({ ...props }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [message, setMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState({
    enterprise: {
      label: "Nom de la société",
      name: "enterprise",
      placeholder: "Nom de la société",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    picture: { name: "picture", value: "", file: null, required: false },
    achievements: {
      name: "achievements",
      value: [],
      file: [],
      required: false,
    },
    address: {
      label: "Adresse",
      name: "address",
      placeholder: "Adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      autoComplete: "false",
    },
    latitude: {
      name: "latitude",
      value: "",
    },
    longitude: {
      name: "longitude",
      value: "",
    },
    placeId: {
      name: "placeId",
      value: "",
    },
    googleRating: {
      name: "googleRating",
      value: "",
    },
    additionalAddress: {
      label: "Complément d’adresse",
      name: "additionalAddress",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
    },
    postalCode: {
      label: "Code postal",
      name: "postalCode",
      placeholder: "Code postal",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
      empty: true,
      size: 5,
      isNumber: true,
    },
    city: {
      label: "Ville",
      name: "city",
      placeholder: "Ville",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
      disabled: true,
      editable: true,
    },
    description: {
      name: "description",
      label: "Description",
      placeholder:
        "La description de votre activité à rentrer dans ce champ est une opportunité pour mettre en valeur votre savoir-faire, vos compétences, votre expérience, votre positionnement et vos réalisations.",
      value: "",
      error: false,
      errorMessage: "",
      required: false,
      as: "textarea",
    },
    showcases: {
      name: "showcases",
      label: "Univers",
      infoLabel:
        "Les univers chez Fingz correspondent à vos secteurs d’activité",
      placeholder: "Choisir",
      required: true,
      options: [],
      value: [],
    },
    website: {
      label: "Site web",
      name: "website",
      placeholder: "Site web",
      value: "",
      type: "url",
    },
    twitter: {
      label: "Page Twitter",
      name: "twitter",
      placeholder: "Page Twitter",
      value: "",
      type: "url",
    },
    facebook: {
      label: "Page Facebook",
      name: "facebook",
      placeholder: "Page Facebook",
      value: "",
      type: "url",
    },
    instagram: {
      label: "Page Instagram",
      name: "instagram",
      placeholder: "Page Instagram",
      value: "",
      type: "url",
    },
    linkedIn: {
      label: "Page LinkedIn",
      name: "linkedIn",
      placeholder: "Page LinkedIn",
      value: "",
      type: "url",
    },
    youTube: {
      label: "Page Youtube",
      name: "youTube",
      placeholder: "Page Youtube",
      value: "",
      type: "url",
    },
  });
  const [placeIsSelected, setPlaceIsSelected] = useState(false);

  useEffect(() => {
    getUniverses();
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUniverses = () => {
    connector({
      method: "get",
      url: endPoints.ANONYMOUS_UNIVERSES,
      success: (response) => {
        const arrayObj = response.data["hydra:member"] || [];
        let cpState = { ...state };
        cpState.showcases.options = [];

        for (let i = 0; i < arrayObj.length; i++) {
          let o = arrayObj[i];
          cpState.showcases.options.push({ label: o.name, value: o.id });
        }
        setState(cpState);
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getUser = () => {
    connector({
      method: "get",
      url: `${endPoints.USER}/${auth.user.id}/repairman`,
      success: (response) => {
        const cpState = { ...state };
        for (const key in response.data) {
          if (key === "showcases") {
            cpState.showcases.value = [];
            for (let i = 0; i < response.data[key].length; i++) {
              cpState.showcases.value.push({
                label: response.data[key][i].name,
                value: response.data[key][i].id,
              });
            }
          } else if (key === "achievements") {
            cpState.achievements.value = response.data[key]
              ? response.data[key]
              : [];
            cpState.achievements.file = response.data[key]
              ? new Array(response.data[key].length)
              : [];
          } else if (cpState[key]) {
            cpState[key].value = response.data[key];
          }
        }
        setState(cpState);
        if (cpState.address.value) {
          setPlaceIsSelected(true);
        }
      },
      catch: (error) => {
        console.log(error);
      },
    });
  };

  const getPathImage = (image) =>
    image.file
      ? URL.createObjectURL(image.file)
      : image.value
      ? vars.pathImage + image.value
      : noImage;

  const saveUser = () => {
    if (!isPending) {
      setIsPending(true);
      setMessage(null);
      setState(clearErrors(state));
      const validation = validForm(state);
      if (!placeIsSelected) {
        msgErrors({
          address: true,
          msg: "Veuillez sélectionner une adresse dans la liste.",
        });
        return;
      } else if (
        validation.form.address.error ||
        validation.form.postalCode.error ||
        validation.form.city.error
      ) {
        setState(validation.form);
        msgErrors({
          msg: "Veuillez sélectionner une adresse valide dans la liste.",
        });
        return;
      }
      if (state.website.value && !isValidHttpUrl(state.website.value)) {
        validation.form.website.error = true;
        msgErrors({
          msg: "L'url du site n'est pas valide",
        });
        return;
      }
      if (state.twitter.value && !isValidHttpUrl(state.twitter.value)) {
        validation.form.twitter.error = true;
        msgErrors({
          msg: "L'url twitter n'est pas valide",
        });
        return;
      }
      if (state.facebook.value && !isValidHttpUrl(state.facebook.value)) {
        validation.form.facebook.error = true;
        msgErrors({
          msg: "L'url facebook n'est pas valide",
        });
        return;
      }
      if (state.instagram.value && !isValidHttpUrl(state.instagram.value)) {
        validation.form.instagram.error = true;
        msgErrors({
          msg: "L'url instagram n'est pas valide",
        });
        return;
      }
      if (state.linkedIn.value && !isValidHttpUrl(state.linkedIn.value)) {
        validation.form.linkedIn.error = true;
        msgErrors({
          msg: "L'url LinkedIn n'est pas valide",
        });
        return;
      }
      if (state.youTube.value && !isValidHttpUrl(state.youTube.value)) {
        validation.form.youTube.error = true;
        msgErrors({
          msg: "L'url YouTube n'est pas valide",
        });
        return;
      }

      if (validation.valid && state.showcases.value.length) {
        const files = state.achievements.file.filter(
          (f) => f !== "" && f !== null
        );

        if (state.picture.file) {
          saveImage(validation);
        } else if (files.length) {
          savePictures(validation);
        } else {
          submitUser(validation);
        }
      } else {
        msgErrors({
          msg: "Vérifier si les champs obligatoires sont remplis.",
          showcases: !state.showcases.value.length,
        });
        setState(validation.form);
      }
    }
  };

  const saveImage = (validation) => {
    const data = new FormData();
    data.append("file", state.picture.file);
    connector({
      method: "post",
      url: endPoints.ANONYMOUS_MEDIA_OBJECT,
      data,
      success: (response) => {
        const cpState = { ...state };
        cpState.picture.file = null;
        cpState.picture.value = response.data.contentUrl;
        setState(cpState);
        validation.rawData.picture = response.data.contentUrl;
        savePictures(validation);
      },
      catch: (error) => {
        setIsPending(false);
        msgErrors({ msg: getMsgError(error).replace("file: ", "") });
      },
    });
  };

  const savePictures = (validation) => {
    const files = state.achievements.file.filter((f) => f !== "" && f !== null);
    if (files.length) {
      const data = new FormData();
      data.append("file", files[0]);

      connector({
        method: "post",
        url: endPoints.ANONYMOUS_MEDIA_OBJECT,
        data,
        success: (response) => {
          const cpState = { ...state };
          var index = state.achievements.file.indexOf(files[0]);
          if (index !== -1) {
            cpState.achievements.file[index] = "";
            cpState.achievements.value[index] = response.data.contentUrl;
            validation.rawData.achievements[index] = response.data.contentUrl;
          }
          setState(cpState);
          savePictures(validation);
        },
        catch: (error) => {
          setIsPending(false);
          msgErrors({ msg: getMsgError(error).replace("file: ", "") });
        },
      });
    } else {
      submitUser(validation);
    }
  };

  const submitUser = (validation) => {
    validation.rawData.showcases = [];
    for (let i = 0; i < state.showcases.value.length; i++) {
      validation.rawData.showcases.push(
        `${endPoints.ANONYMOUS_UNIVERSE}${state.showcases.value[i].value}`
      );
    }
    connector({
      method: "put",
      url: `${endPoints.USER}/${auth.user.id}/repairman`,
      data: validation.rawData,
      success: (response) => {
        setIsPending(false);
        msgSuccess("Vos modifications ont bien été prises en compte.");

        if (
          response.data.payload.token &&
          response.data.payload.refresh_token
        ) {
          dispatch({
            type: REFRESH_TOKEN,
            token: response.data.payload.token,
            refresh_token: response.data.payload.refresh_token,
          });
        }
      },
      catch: (error) => {
        setIsPending(false);
        msgErrors({ msg: getMsgError(error) });
      },
    });
  };

  const msgErrors = (e) => {
    const cpState = { ...state };
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    if (e.address !== undefined) cpState.address.error = e.address;
    if (e.showcases !== undefined) cpState.showcases.error = e.showcases;
    setState(cpState);
    setIsPending(false);
    scrollTop();
  };

  const msgSuccess = (text) => {
    scrollTop();
    setIsPending(false);
    if (text !== undefined) setMessage({ type: "success", text });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const scrollTop = (text) => {
    document.querySelector(".has-scroll-bar").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPathImageAchievements = (index) =>
    state.achievements.file[index]
      ? URL.createObjectURL(state.achievements.file[index])
      : state.achievements.value[index]
      ? vars.pathImage + state.achievements.value[index]
      : noImage;

  return (
    <AdminBase className="vitrine-page" noSide={true}>
      <ContainePageSimple>
        <div className="bloc-title-page">
          <TitlePage>Ma vitrine</TitlePage>
          <p>
            L’ensemble de ces informations apparaîtront sur vos prestations afin d’aiguiller l’utilisateur dans son choix.
          </p>
        </div>
        <Form className="form-horizontal-default">
          {message && message.type && message.text ? (
            <span
              className={
                message.type === "error" ? "text-danger" : "text-success"
              }
            >
              {message.text}
            </span>
          ) : (
            ""
          )}

          <Input
            {...state.enterprise}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.enterprise.value = e.target.value;
              cpState.enterprise.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <div className="bloc-file-form">
            <label>Photo de la société</label>
            <div className="image-service">
              <img src={getPathImage(state.picture)} alt="" />
              <input
                type="file"
                name="file"
                id="uploadImage"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const cpState = { ...state };
                  cpState.picture.file = e.target.files[0];
                  e.target.value = "";
                  setState(cpState);
                }}
              />
              <div className="btns-file">
                <label htmlFor="uploadImage" className="edit-image">
                  <EditIcon />
                </label>
                {state.picture.value || state.picture.file ? (
                  <button
                    className="delete-image"
                    onClick={(e) => {
                      e.preventDefault();
                      const cpState = { ...state };
                      cpState.picture.value = "";
                      cpState.picture.file = null;
                      cpState.picture.error = false;
                      setState(cpState);
                      setMessage(null);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {state?.googleRating?.value && (
            <div className="form-group vitrine-rating">
              <label>Note Google</label>
              <RatingBox value={state.googleRating.value} showValue={true} />
            </div>
          )}

          <InputAddress
            state={state}
            setState={setState}
            placeIsSelected={placeIsSelected}
            setPlaceIsSelected={setPlaceIsSelected}
            message={message}
            setMessage={setMessage}
          />

          <Input
            {...state.additionalAddress}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.additionalAddress.value = e.target.value;
              cpState.additionalAddress.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.postalCode}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.postalCode.value = e.target.value;
              cpState.postalCode.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.city}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.city.value = e.target.value;
              cpState.city.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.description}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.description.value = e.target.value;
              cpState.description.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <SelectCat
            {...state.showcases}
            onChangeCallback={(response) => {
              const cpState = { ...state };
              cpState.showcases.value = response;
              cpState.showcases.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <div className="bloc-file-form">
            <label>
              Réalisations
              <span className="info-label">
                Formats acceptés : jpg, jpeg, png 4 Mo maximum par photo 6
                photos maximum
              </span>
            </label>
            <Row className="loop-fils-upload">
              {state.achievements.value && state.achievements.value.length
                ? state.achievements.value.map((picture, index) => (
                    <Col sm={6} key={index}>
                      <div className="image-service">
                        <img src={getPathImageAchievements(index)} alt="" />
                        <input
                          type="file"
                          name="file"
                          id={`uploadImage_${index}`}
                          accept="image/png, image/jpeg"
                          onChange={(e) => {
                            const cpState = { ...state };
                            cpState.achievements.file[index] =
                              e.target.files[0];
                            e.target.value = "";
                            setState(cpState);
                            setMessage(null);
                          }}
                        />
                        <div className="btns-file">
                          <label
                            htmlFor={`uploadImage_${index}`}
                            className="edit-image"
                          >
                            <EditIcon />
                          </label>
                          <button
                            className="delete-image"
                            onClick={(e) => {
                              e.preventDefault();
                              const cpState = { ...state };
                              cpState.achievements.value.splice(index, 1);
                              cpState.achievements.file.splice(index, 1);
                              setState(cpState);
                              setMessage(null);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))
                : ""}
              {!state.achievements.value ||
              (state.achievements.value &&
                state.achievements.value.length < 6) ? (
                <Col sm={6}>
                  <label className="add-more-fils" htmlFor="add-more-fils">
                    <AddGreenIcon />
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    id="add-more-fils"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const cpState = { ...state };
                      cpState.achievements.file.push(e.target.files[0]);
                      cpState.achievements.value.push("");
                      e.target.value = "";
                      setState(cpState);
                      setMessage(null);
                    }}
                  />
                </Col>
              ) : (
                ""
              )}
            </Row>
          </div>
          <Input
            {...state.website}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.website.value = e.target.value;
              cpState.website.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.twitter}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.twitter.value = e.target.value;
              cpState.twitter.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.facebook}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.facebook.value = e.target.value;
              cpState.facebook.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.instagram}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.instagram.value = e.target.value;
              cpState.instagram.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.linkedIn}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.linkedIn.value = e.target.value;
              cpState.linkedIn.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <Input
            {...state.youTube}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.youTube.value = e.target.value;
              cpState.youTube.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
          <div className="btns-alings">
            <ButtonDef
              textButton="Enregistrer"
              spinner={isPending}
              onClick={(e) => {
                e.preventDefault();
                saveUser();
              }}
            />
          </div>
        </Form>
      </ContainePageSimple>
    </AdminBase>
  );
}
