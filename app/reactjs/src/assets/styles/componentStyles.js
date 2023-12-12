import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import iconQuestionGreen from "../images/icons/icon-question-green.svg";
import { mixinIcon } from "./icons";

export const GreenColor = "#9ACA3C";
export const OrangeColor = "#e67c2e";
export const BlocFormModal = styled.div``;
export const TitelForm = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #444444;
  margin-bottom: 45px;
  text-align: center;
`;

export const FormLogin = styled(Form)`
  .form-group {
    margin-bottom: 31px;
  }
  label {
    font-size: 15px !important;
    color: #000;
    font-weight: 600;
  }
  .error-form {
    font-size: 13px;
    color: red;
    display: block;
    margin-bottom: 20px;
  }
  .form-control {
    height: 53px;
    box-shadow: none;
    border-radius: 26px;
    &::-webkit-input-placeholder {
      font-size: 16px;
    }
    &::-moz-placeholder {
      font-size: 16px;
    }
    &:-ms-input-placeholder {
      font-size: 16px;
    }
    &:-moz-placeholder {
      font-size: 16px;
    }
  }
  .pass-oublier {
    font-size: 15px;
    color: ${GreenColor};
    text-decoration: none;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 48px;
  }
  .btn-form-def {
    width: 100%;
    height: 50px;
    border-radius: 26px;
  }
`;

export const RadioButtonForm = styled(Form.Group)`
  & > label {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 14px;
    padding: 0;
    font-weight: 500;
  }
  .bloc-radios-button {
    display: flex;
    align-items: baseline;
  }
  .radio-button-form {
    display: flex;
    padding: 0;
    margin-right: 60px;
    label {
      position: relative;
      font-size: 15px;
      line-height: 21px;
      text-transform: inherit;
      margin-bottom: 0;
      padding-left: 12px;
      cursor: pointer;
    }
    & > input {
      appearance: none;
      position: relative;
      top: 1px;
      height: 20px;
      width: 20px;
      min-width: 20px;
      border: 0;
      margin: 0;
      border-radius: 50%;
      background: #ececef;
      transition: 0.2s ease-in-out;
      outline: none;
      cursor: pointer;
      &:focus {
        box-shadow: none;
      }
      &:checked {
        background: ${GreenColor};
        -webkit-box-shadow: inset 0px 0px 0px 4px #ececef;
        box-shadow: inset 0px 0px 0px 4px #ececef;
      }
      &:disabled {
        cursor: no-drop;
      }
    }
  }

  @media (max-width: 768px) {
    .radio-button-form {
      margin-right: 15px;
    }
  }
`;
export const CheckBoxForm = styled.div`
  .bloc-check-box {
  }
  .check-box-form {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-bottom: 17px;
    margin-right: 60px;
    width: 100%;
    &.form-error {
      & > input {
        box-shadow: 0 0px 8px 0 rgb(255 120 109);
      }
    }
    & > label {
      position: relative;
      font-size: 15px;
      line-height: 21px;
      text-transform: inherit;
      margin-bottom: 0;
      padding-left: 12px;
      width: calc(100% - 40px);
      cursor: pointer;
    }
    & > input {
      appearance: none;
      position: relative;
      top: 1px;
      height: 20px;
      width: 20px;
      min-width: 20px;
      border: 0;
      margin: 0;
      border-radius: 5px;
      background: #ececef;
      transition: 0.2s ease-in-out;
      outline: none;
      cursor: pointer;
      &:focus {
        box-shadow: none;
      }
      &:checked {
        background: ${GreenColor};
        -webkit-box-shadow: inset 0px 0px 0px 4px #ececef;
        box-shadow: inset 0px 0px 0px 4px #ececef;
      }
      &:disabled {
        cursor: no-drop;
      }
    }
  }
  .details-checkbox {
    padding: 20px 0 13px 32px;
    width: 100%;
  }
`;

export const ModalPopinStyle = styled(Modal)`
  .modal-dialog {
    width: 665px;
    max-width: 90%;
    .close {
      position: absolute;
      top: 42px;
      right: 42px;
    }
    .modal-content {
      background: #ffffff;
      box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
      border-radius: 14px;
      padding: 60px 87px;
      .modal-body {
        padding: 0;
        .form-control,
        .form-control-file {
          height: 53px;
          border-radius: 26px;
        }
      }
    }
    .footer-modal {
      padding-top: 44px;
      font-size: 16px;
      line-height: 23px;
      text-align: center;
      a {
        color: ${GreenColor};
        text-decoration: none;
        font-weight: 600;
        &:hover {
          color: ${GreenColor};
          text-decoration: underline;
        }
      }
    }
    .header-modal {
      padding-bottom: 44px;
      font-size: 16px;
      line-height: 23px;
      text-align: center;
      a {
        color: ${GreenColor};
        text-decoration: none;
        font-weight: 600;
        &:hover {
          color: ${GreenColor};
          text-decoration: underline;
        }
      }
    }
    .btns-confirm {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      & > button {
        min-width: 140px;
        margin: 0 10px 5px;
      }
    }
    .form-inscrirs {
      .form-group {
        margin-bottom: 37px;
      }
      .notice-form-group {
        color: #798d97;
        font-size: 16px;
        line-height: 23px;
      }
      .btn-form-def {
        width: 100%;
        height: 50px;
      }
    }
    .checkboxs-accept {
      margin-bottom: 40px;
      label {
        font-size: 15px;
        line-height: 21px;
      }
      a {
        color: ${GreenColor};
        text-decoration: underline;
        font-weight: 600;
        &:hover {
          text-decoration: none;
        }
      }
    }
    .react-select__value-container {
      justify-content: flex-start;
      padding-left: 20px;
      text-transform: uppercase;
      .react-select__placeholder {
        text-transform: initial;
      }
    }
    .react-select__option {
      text-transform: uppercase;
    }
    .message-confirmation {
      text-align: center;
      font-size: 16px;
      line-height: 21px;
      .titre-message-confirm {
        color: #9ACA3C;
        font-weight: 600;
        font-size: 17px;
        text-transform: uppercase;
      }
    }
  }

  @media (max-width: 768px) {
    .modal-dialog {
      width: 100%;
      max-width: 100%;
      margin: 0;
      min-height: 100%;
      align-items: normal;

      .modal-content {
        padding: 25px;
        border-radius: 0;
      }

      .close {
        position: static;
        align-self: flex-end;
      }
    }
  }
`;

export const FileBox = styled.div`
  margin-bottom: 0;
  position: relative;
  label {
    font-size: 14px;
    margin-bottom: 14px;
    padding: 0;
    font-weight: 500;
  }

  .file-wrapper {
    position: relative;
    &.form-error {
      & > input {
        box-shadow: 0 0px 8px 0 rgb(255 120 109);
      }
    }
  }
  input {
    outline: none;
    padding: 15px 150px 10px 20px;
    color: #aeaeb1;
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 53px;
    background: #f5f5fa;
    box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
    border-radius: 24px;
    border: 0;
    font-size: 15px;
    font-weight: 400;
    max-width: 100%;
    &::-webkit-input-placeholder {
      font-size: 15px;
      color: #444444;
      opacity: 0.4;
    }
    &::-moz-placeholder {
      font-size: 15px;
      color: #444444;
      opacity: 0.4;
    }
    &:-ms-input-placeholder {
      font-size: 15px;
      color: #444444;
      opacity: 0.4;
    }
    &:-moz-placeholder {
      font-size: 15px;
      color: #444444;
      opacity: 0.4;
    }
    &:focus {
      border-color: 0;
      outline: 0;
      outline: none;
      box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
      background: #f5f5fa;
    }
    &::-webkit-file-upload-button {
      display: none;
    }
  }
`;
export const BtnFile = styled(Form.Label)`
  position: absolute;
  right: 5px;
  bottom: 7px;
  background-color: ${GreenColor};
  border-radius: 24px;
  height: 39px;
  width: 145px;
  min-width: 145px;
  font-weight: 300;
  transition: 0.3s ease-in-out;
  font-size: 15px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-left: auto;
  margin-bottom: 0 !important;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

export const RangePrice = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  min-height: 34px;
  .noUi-target {
    height: 6px;
    width: 330px;
    max-width: calc(100% - 20px);
    margin: auto;
    background: #e9e9e9;
    border-radius: 4px;
    border: 0;
  }
  .noUi-connect {
    background: ${GreenColor};
  }
  .noUi-handle {
    border: 0;
    border-radius: 50%;
    background: ${GreenColor};
    height: 28px !important;
    width: 28px !important;
    box-shadow: none;
    top: -11px !important;
    cursor: pointer;
    &::after,
    &:before {
      content: none;
    }
  }
  .noUi-tooltip {
    bottom: auto;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
  }
`;
export const GalerieSlideStyle = styled.div`
  margin: 0 -15px;
  .slick-track {
    display: inline-block;
  }
  .item-realisation {
    padding: 0 15px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .slick-list {
    padding-left: 0 !important;
  }
  @media (max-width: 767px) {
    margin: 0 -18px;
  }
  @media (min-width: 994px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const BlocTabStep = styled.div`
  .nav-step-mobile {
    margin-bottom: 30px;
    .number-step {
      font-weight: 700;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${GreenColor};
      box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
      color: #fff;
      border-radius: 50%;
      font-size: 14px;
      margin-right: 10px;
    }
    .titre-step-mobile {
      font-size: 19px;
      line-height: 26px;
      font-weight: 600;
      margin-bottom: 13px;
      display: flex;
      align-items: center;
    }
    .range-step {
      height: 20px;
      background-color: #f2f2f2;
      display: flex;
      overflow: hidden;
      & > div {
        transition: 0.5s all;
        height: 100%;
        border-radius: 0 10px 10px 0;
        position: relative;
        z-index: 1;
        margin-left: -8px;
        &.active {
          background-color: ${GreenColor};
        }
        &.encour {
          background-color: #d9ecb1;
          margin-left: -8px;
          z-index: 0;
        }
        &:last-child {
          border-radius: 0;
        }
      }
    }
  }
  .nav-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 40px;
    padding: 0;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      height: 1px;
      background-color: #d5d5d5;
    }
    .item-nav-step {
      font-size: 22px;
      font-weight: 400;
      line-height: 31px;
      position: relative;
      z-index: 1;
      background-color: #fff;
      padding: 0 24px;
      transition: 0.5s ease-in-out;
      color: #748993;
      display: flex;
      align-items: center;
      &.active {
        opacity: 1;
        color: #000;
        font-weight: 500;
        .number-step {
          background-color: ${GreenColor};
          color: #fff;
        }
      }
      &::before {
        content: none;
      }
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
      .number-step {
        font-weight: 700;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
        color: #3e3c3c;
        border-radius: 50%;
        font-size: 14px;
        margin-right: 16px;
      }
    }
  }
  .content-detail-step {
    display: flex;
    .left-content-detail {
      width: 100%;
      padding-right: 30px;
      .bloc-message {
        padding-bottom: 20px;
        display: block;
        font-size: 14px;
        font-weight: 500;
      }
      .title-step-tunnel {
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 7px;
        line-height: 25px;
        margin: 0;
      }
      .sub-title-step-tunnel {
        color: #748993;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 30px;
        margin-top: 8px;
      }
      .row {
        margin: 34px -15px 10px;
      }
      .form-group {
        margin-bottom: 30px;
        .form-control {
          height: 43px;
          border-radius: 24px;
        }
      }
      .identique-check {
        margin-top: 7px;
        & > label {
          color: #748993;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 15px;
        }
        .bloc-check-box {
          label {
            color: #3f474b;
            font-size: 15px;
            line-height: 21px;
            font-weight: 500;
          }
        }
      }
      ${FileBox} {
        margin-bottom: 30px;
        @media (min-width: 1200px) {
          max-width: 100%;
          width: 632px;
        }
        .bloc-upload-fils {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          margin-bottom: 28px;
          .content-upload-file {
            position: relative;
            .bloc-wrapper-file {
              display: flex;
              .file-wrapper {
                width: 100%;
              }
              @media (max-width: 320px) {
                flex-wrap: wrap;
                justify-content: center;
                .file-wrapper {
                  margin-bottom: 20px;
                }
              }
            }
            .form-group {
              margin: 0;
            }
          }
          .btn-light {
            margin-left: 23px;
            height: 43px;
            width: 136px;
            min-width: 136px;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            box-shadow: none;
            @media (max-width: 767px) {
              margin-left: 8px;
            }
          }
        }
        .lists-fils {
          width: 100%;
          margin: 28px 0 0;
          .item-upload {
            margin-bottom: 17px;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            &:last-child {
              margin-bottom: 0;
            }
            @media (max-width: 993px) {
              margin-bottom: 12px;
            }
          }
          button {
            border: 0;
            background-color: transparent;
            margin-left: 20px;
          }
        }
        .form-group {
          & > label {
            font-weight: 400;
            margin-bottom: 28px;
            display: flex;
            @media (max-width: 993px) {
              margin-bottom: 13px;
            }
            & > a {
              display: inline;
              margin-left: 10px;
              i {
                width: 24px;
                min-width: 24px;
                height: 24px;
                transition: 0.5s all;
              }
              &:hover {
                i {
                  ${mixinIcon({
                    urlIcon: iconQuestionGreen,
                    width: 24,
                    height: 24,
                  })};
                }
              }
            }
            .info-tooltip {
              position: relative;
              display: inline;
              i {
                cursor: pointer;
                margin: 0 0px 0 5px;
              }
              &:hover {
                & > span {
                  opacity: 1;
                  top: 30px;
                }
              }
              & > span {
                position: absolute;
                left: 50%;
                top: 50px;
                transform: translateX(-50%);
                font-size: 13px;
                line-height: 19px;
                background: #ffffff;
                box-shadow: 0 2px 41px 0 rgba(182, 172, 251, 0.42);
                display: block;
                padding: 10px 20px;
                border-radius: 8px;
                width: 173px;
                transition: 0.4s all;
                opacity: 0;
                pointer-events: none;
                z-index: 1;
                text-align: center;
                font-weight: 400;
                &:before {
                  content: "";
                  position: absolute;
                  width: 0;
                  height: 0;
                  top: 1px;
                  left: 73px;
                  box-sizing: border-box;
                  border: 6px solid white;
                  border-color: #ffffff #ffffff transparent transparent;
                  transform-origin: 0 0;
                  transform: rotate(-45deg);
                  z-index: -1;
                  border-radius: 2px;
                  background: #ffffff;
                  box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
                }
              }
            }
          }
          input {
            height: 43px;
            border-radius: 24px;
            padding: 11px 132px 10px 20px;
            width: 100%;
          }
        }
      }
      ${BtnFile} {
        bottom: 5px;
        height: 34px;
        width: 127px;
        min-width: 127px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
      }
      .bloc-payment-step {
        .payment-conditions-commerciale {
          padding-left: 5px;
        }
        textarea {
          background-color: #e8f9c5;
          padding: 23px 30px;
          height: 175px;
        }
        .info-pay {
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 30px;
        }
        .payment-note {
          background-color: #e8f9c5;
          padding: 23px 30px;
          height: 175px;
          width: 100%;
          box-shadow: 0 2px 9px 0 rgb(182 172 251 / 42%);
          border-radius: 15px;
          margin-bottom: 30px;
          color: #758f3e;
        }
        .payment-bloc {
          display: flex;
          align-items: flex-end;
          margin: 0 -15px;
          & > div {
            width: 25%;
            padding: 0 15px;
            &.number-cart-payment {
              width: 50%;
              min-width: 50%;
            }
          }
          .input-cart-payment {
            padding: 13px 20px;
            background: #f5f5fa;
            box-shadow: 0 2px 9px 0 rgb(182 172 251 / 42%);
            border: 0;
            font-size: 15px;
            font-weight: 400;
          }
          .form-error{
            .input-cart-payment {
              box-shadow: 0 0px 8px 0 rgb(255 120 109);
            }
          }
          .text-right-to-cancel {
            font-size: 15px;
          }
          .experation-bloc {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            position: relative;
            width: 100%;
            padding-top: 35px;
            label {
              position: absolute;
              top: 0;
            }
            & > div {
              width: calc(50% - 15px);
            }
            .bloc-cvc-cart {
              position: relative;
            }
            .info-cvc {
              position: absolute;
              right: 42px;
              top: 9px;
            }
          }
          @media (max-width: 575px) {
            display: block;
            & > div {
              &.number-cart-payment {
                width: 100%;
              }
            padding: 0 0px 13px 16px;
            }
          }
        }
        .checkboxs-accept {
          font-size: 15px;
          line-height: 21px;
          margin-bottom: 30px;
          label {
            font-size: 15px;
          }
          a {
            color: ${GreenColor};
            font-weight: 500;
            text-decoration: underline;
            &:hover {
              text-decoration: none;
            }
          }
        }
      }
      .bloc-confirme-step {
        margin-bottom: 100px;
        .message-confirme-tunnel {
          padding: 22px 17px;
          background-color: #f1fbdc;
          border-radius: 15px;
          display: flex;
          align-items: flex-start;
          font-size: 16px;
          line-height: 23px;
          color: ${GreenColor};
          font-weight: 500;
          margin-bottom: 40px;
          i {
            margin-right: 14px;
          }
        }
        ${TitelForm} {
          text-align: left;
          margin-bottom: 40px;
        }
        .row {
          justify-content: center;
          & > div {
            margin-bottom: 30px;
          }
        }
        .content-faire-confirme {
          background: #ffffff;
          box-shadow: 0 3px 50px 0 rgb(182 172 251 / 42%);
          border-radius: 8px;
          padding: 40px 10px;
          text-align: center;
          color: #000;
          font-size: 17px;
          line-height: 23px;
          font-weight: 600;
          height: 100%;
          .img-faire-confirme {
            margin-bottom: 30px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-height: 100%;
            }
          }
          p {
            margin-bottom: 26px;
          }
          a {
            text-decoration: none;
          }
          button {
            display: inline-flex;
            width: 227px;
            max-width: 100%;
            font-weight: 400;
          }
        }
        @media (max-width: 1200px) {
          margin-bottom: 0;
          .message-confirme-tunnel {
            margin-bottom: 30px;
          }
        }
        @media (max-width: 993px) {
          ${TitelForm} {
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 20px;
          }
          .content-faire-confirme {
            padding: 40px 35px;
          }
        }
      }
    }
    .right-content-detail {
      min-width: 434px;
      width: 434px;
      .titre-proposition {
        margin-bottom: 11px;
      }
      .sub-titre-proposition {
        font-size: 18px;
        line-height: 25px;
        font-weight: 500;
      }
      .info-societe {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        border-top: 1px solid #e4e4e4;
        padding: 34px 0 0;
        .logo-societe {
          overflow: hidden;
          margin-right: 19px;
          min-width: 71px;
          width: 71px;
          img {
            width: 100%;
          }
        }
        .detail-info-societe {
          .name-societe {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 16px;
            line-height: 23px;
            margin-bottom: 6px;
          }
          .fonction-societe {
            font-size: 15px;
            line-height: 21px;
            color: #748993;
            margin-bottom: 0px;
          }
        }
      }
      .mode-delivrance {
        border-top: 1px solid #e4e4e4;
        padding: 26px 0 24px;
        font-size: 15px;
        line-height: 21px;
        color: #748993;
        .title-mode-deflivrance {
          font-size: 24px;
          line-height: 33px;
          font-weight: 500;
          letter-spacing: -1px;
          color: ${GreenColor};
          margin-bottom: 11px;
        }
        .mode-choix {
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  @media (max-width: 993px) {
    .content-detail-step {
      display: block;
      .left-content-detail {
        padding-right: 0;
        .content-upload-file {
          width: 100% !important;
        }
        .row {
          margin: 13px -15px 10px;
        }
      }
      .right-content-detail {
        min-width: initial;
        width: auto;
        & > div {
          margin: auto;
        }
      }
    }
  }
`;

export const PageMaintenanceStyle = styled.div`
  padding: 86px 0 20vmin;
  text-align: center;
  img {
    margin-bottom: 30px;
  }
  h1 {
    color: #444444;
    font-size: 24px;
    font-weight: 600;
    line-height: 33px;
    margin-bottom: 28px;
  }
  a {
    text-decoration: none;
    button {
      display: inline-flex;
      min-width: 227px;
      max-width: 100%;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

export const FormClearSpace = styled.div`
  padding-left: 245px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const CloseButtonStyle = styled.div`
  .dev-close-btn {
    display: flex;
    justify-content: flex-end;
  }
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 15px 25px;
  z-index: 11;
  margin: 0px -30px;
`;
