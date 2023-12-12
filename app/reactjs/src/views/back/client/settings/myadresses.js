import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ButtonDef, Input, SingleCheckbox } from "../../../../components/ui";
import {
  getMsgError,
  newObject,
  scrollTop,
} from "../../../../helper/functions";
import { validForm } from "../../../../helper/form";
import connector from "../../../../connector";
import endPoints from "../../../../config/endPoints";
import { FormClearSpace } from "../../../../assets/styles/componentStyles";
import InputAddress from "../../../../components/ui-elements/inputAddress";

export default function Myadresses({ user }) {
  const initState = {
    id: { value: null, name: "id", error: false, required: false },
    firstName: {
      label: "Prénom",
      name: "firstName",
      placeholder: "Prénom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
    },
    lastName: {
      label: "Nom",
      name: "lastName",
      placeholder: "Nom",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: true,
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
      error: false,
    },
    longitude: {
      name: "longitude",
      value: "",
      error: false,
    },
    placeId: {
      name: "placeId",
      value: "",
      required: false,
    },
    placeIsSelected: {
      name: "placeIsSelected",
      value: true,
      error: false,
    },
    additionalAddress: {
      label: "Complément d’adresse",
      name: "additionalAddress",
      placeholder: "Complément d’adresse",
      value: "",
      type: "text",
      error: false,
      errorMessage: "",
      required: false,
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
    sameAsInvoice: {
      label: "Identique à l’adresse de facturation",
      name: "sameAsInvoice",
      value: false,
      error: false,
      errorMessage: "",
      required: false,
    },
  };
  const [isPending, setIsPending] = useState(false);
  const [lastCommand, setLastCommand] = useState(false);
  const [message, setMessage] = useState({ text: null, type: "" });

  const stateDelivery = () => {
    const cpState = { ...initState };
    for (const key in cpState) {
      cpState[key] = { ...cpState[key], required: false };
    }
    return {
      ...cpState,
      type: { value: "delivery", name: "type", error: false },
    };
  };

  const [state, setState] = useState({
    invoice: newObject({
      ...initState,
      type: { value: "invoice", name: "type", error: false },
    }),
    delivery: stateDelivery(),
  });

  useEffect(() => {
    connector({
      url: endPoints.COMMANDS + "/lastcommand",
      success: (response) => {
        if (response.data) {
          setLastCommand(response.data);
        }
      },
      catch: (err) => console.log(err),
    });
  }, []);

  useEffect(() => {
    if (user) {
      const invoiceAddress = user.addresses.find((a) => a.type === "invoice");
      const cpState = { ...state };
      if (invoiceAddress) {
        for (const key in invoiceAddress) {
          if (cpState.invoice[key]) {
            if (key === "id") {
              cpState.invoice[key].value = invoiceAddress["@id"];
            } else {
              cpState.invoice[key].value = invoiceAddress[key];
            }
          }
        }
      } else if (lastCommand) {
        cpState.invoice.firstName.value = lastCommand.firstName;
        cpState.invoice.lastName.value = lastCommand.lastName;
        cpState.invoice.address.value = lastCommand.address;
        cpState.invoice.additionalAddress.value = lastCommand.additionalAddress;
        cpState.invoice.postalCode.value = lastCommand.postalCode;
        cpState.invoice.city.value = lastCommand.city;
      } else {
        cpState.invoice.firstName.value = user.firstName || "";
        cpState.invoice.lastName.value = user.lastName || "";
      }

      const deliveryAddress = user.addresses.find((a) => a.type === "delivery");
      if (deliveryAddress) {
        for (const key in deliveryAddress) {
          if (cpState.delivery[key]) {
            if (key === "id") {
              cpState.delivery[key].value = deliveryAddress["@id"];
            } else {
              cpState.delivery[key].value = deliveryAddress[key];
            }
          }
        }
      } else if (lastCommand) {
        cpState.delivery.firstName.value = lastCommand.firstName;
        cpState.delivery.lastName.value = lastCommand.lastName;
        cpState.delivery.address.value = lastCommand.address;
        cpState.delivery.additionalAddress.value =
          lastCommand.additionalAddress;
        cpState.delivery.postalCode.value = lastCommand.postalCode;
        cpState.delivery.city.value = lastCommand.city;
      }
      setState(cpState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, lastCommand]);

  useEffect(() => {
    const cpState = { ...state };
    for (const key in cpState.delivery) {
      cpState.delivery[key].required = !state.invoice.sameAsInvoice.value;
      cpState.delivery[key].error = false;
    }
    cpState.delivery.id.required = false;
    cpState.delivery.latitude.required = false;
    cpState.delivery.longitude.required = false;
    cpState.delivery.placeId.required = false;
    cpState.delivery.additionalAddress.required = false;
    cpState.delivery.sameAsInvoice.required = false;
    setState(cpState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.invoice.sameAsInvoice.value]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const cpState = { ...state };
    setMessage(null);

    const formInvoice = validForm(state.invoice);
    const formDelivery = validForm(state.delivery);

    if (formInvoice.valid && formDelivery.valid) {
      const addresses = [];
      addresses.push(formInvoice.rawData);
      if (formInvoice.rawData.sameAsInvoice) {
        addresses.push({
          ...formInvoice.rawData,
          id: formDelivery.rawData.id,
          type: "delivery",
        });
      } else {
        addresses.push(formDelivery.rawData);
      }

      if (user.id) {
        setIsPending(true);
        connector({
          method: "put",
          url: `${endPoints.USER}/${user.id}/addresses`,
          data: { addresses },
          success: (response) => {
            let text = "Vos modifications ont bien été prises en compte.";
            setMessage({ text, type: "success" });
            setIsPending(false);
            scrollTop();
          },
          catch: (error) => {
            msgErrors({ msg: getMsgError(error) });
          },
        });
      } else {
        msgErrors({
          msg: "Vous devez être connecté pour effectuer cette opération",
        });
      }
    }
    cpState.invoice = formInvoice.form;
    if (!state.invoice.sameAsInvoice.value) {
      cpState.delivery = formDelivery.form;
    }
    setState(cpState);
  };

  const msgErrors = (e) => {
    if (e.msg !== undefined) setMessage({ type: "error", text: e.msg });
    scrollTop();
    setIsPending(false);
  };

  return (
    <>
      <Form className="form-horizontal-default" onSubmit={onSubmit}>
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
        <div className="bloc-form-horizontal-default">
          <div className="bloc-default-form-horizontal">
            <h2 className="titre-form-horizontal">Adresse de facturation</h2>
          </div>
        </div>
         <Input
          {...state.invoice.lastName}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.invoice.lastName.value = e.target.value;
            cpState.invoice.lastName.error = false;
            setState(cpState);
            setMessage(null);
          }}
        />
        <Input
          {...state.invoice.firstName}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.invoice.firstName.value = e.target.value;
            cpState.invoice.firstName.error = false;
            setState(cpState);
            setMessage(null);
          }}
        />
        <InputAddress
          state={state.invoice}
          setState={(obj) => {  setState({ ...state, obj })}}
          placeIsSelected={state.invoice.placeIsSelected.value}
          setPlaceIsSelected={(val) => {
            const cpState = { ...state };
            cpState.invoice.placeIsSelected.value = val;
            setState(cpState);
          }}
          message={message}
          setMessage={setMessage}
        />
        <Input
          {...state.invoice.additionalAddress}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.invoice.additionalAddress.value = e.target.value;
            cpState.invoice.additionalAddress.error = false;
            setState(cpState);
            setMessage(null);
          }}
        />
        <Input
          {...state.invoice.postalCode}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.invoice.postalCode.value = e.target.value;
            cpState.invoice.postalCode.error = false;
            setState(cpState);
            setMessage(null);
          }}
        />
        <Input
          {...state.invoice.city}
          onChange={(e) => {
            const cpState = { ...state };
            cpState.invoice.city.value = e.target.value;
            cpState.invoice.city.error = false;
            setState(cpState);
            setMessage(null);
          }}
        />
        <div className="bloc-form-horizontal-default mt-4">
          <div className="bloc-default-form-horizontal">
            <h2 className="titre-form-horizontal">Adresse de livraison</h2>
          </div>
        </div>
        <FormClearSpace>
          <SingleCheckbox
            {...state.invoice.sameAsInvoice}
            onChange={(e) => {
              const cpState = { ...state };
              cpState.invoice.sameAsInvoice.value = e.target.checked;
              cpState.invoice.sameAsInvoice.error = false;
              setState(cpState);
              setMessage(null);
            }}
          />
        </FormClearSpace>
        {!state.invoice.sameAsInvoice.value && (
          <>
            <Input
              {...state.delivery.lastName}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.delivery.lastName.value = e.target.value;
                cpState.delivery.lastName.error = false;
                setState(cpState);
                setMessage(null);
              }}
            />
            <Input
              {...state.delivery.firstName}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.delivery.firstName.value = e.target.value;
                cpState.delivery.firstName.error = false;
                setState(cpState);
                setMessage(null);
              }}
            />
            <InputAddress
              state={{ ...state.delivery }}
              setState={(obj) => setState({ ...state, obj })}
              placeIsSelected={state.delivery.placeIsSelected.value}
              setPlaceIsSelected={(val) => {
                const cpState = { ...state };
                cpState.delivery.placeIsSelected.value = val;
                setState(cpState);
              }}
              message={message}
              setMessage={setMessage}
            />
            <Input
              {...state.delivery.additionalAddress}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.delivery.additionalAddress.value = e.target.value;
                cpState.delivery.additionalAddress.error = false;
                setState(cpState);
                setMessage(null);
              }}
            />
            <Input
              {...state.delivery.postalCode}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.delivery.postalCode.value = e.target.value;
                cpState.delivery.postalCode.error = false;
                setState(cpState);
                setMessage(null);
              }}
            />
            <Input
              {...state.delivery.city}
              onChange={(e) => {
                const cpState = { ...state };
                cpState.delivery.city.value = e.target.value;
                cpState.delivery.city.error = false;
                setState(cpState);
                setMessage(null);
              }}
            />
          </>
        )}

        <div className="btns-alings">
          <ButtonDef textButton="Enregistrer" spinner={isPending} />
        </div>
      </Form>
    </>
  );
}
