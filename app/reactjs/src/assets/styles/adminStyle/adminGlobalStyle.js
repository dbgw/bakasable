import { Col, Dropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import { CloseButtonStyle, GreenColor, OrangeColor } from "../componentStyles";
import iconMotifClient from "../../images/icons/motif-client.svg";
import iconMotifSupport from "../../images/icons/motif-support.svg";
import iconArrowGray from "../../images/icons/arrow-gray.svg";
import iconDownload from "../../images/icons/download-icon.svg";
import { mixinIcon } from "../icons";

export const ButtonDefault = styled.button`
  background-color: ${GreenColor};
  box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42);
  border-radius: 20px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  border: 1px solid ${GreenColor};
  padding: 11px 20px;
  transition: 0.5s ease-in-out;
  outline: none;
  font-size: 14px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  &.btn-center {
    margin: auto;
  }
  .spinner-grow {
    margin-right: 5px;
    min-width: 1rem;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover,
  &:focus {
    color: ${GreenColor};
    background-color: transparent;
  }
  &:disabled {
    background-color: #9d9da0;
    color: #fff;
    border-color: #9d9da0;
  }
  &.btn-orange {
    background-color: transparent;
    color: #e67c2e;
    font-weight: 600;
    border: 1px solid #e67c2e;
    font-size: 14px;
    i {
      margin-left: 17px;
    }
    &.m-r {
      i {
        margin-left: 0;
        margin-right: 15px;
      }
    }
    &:hover {
      color: #fff;
      background-color: #e67c2e;
    }
    &:active {
      transform: scale(0.8);
      color: #fff;
      background-color: #e67c2e;
    }
  }
  &.btn-add {
    background-color: transparent;
    color: #000;
    font-weight: 600;
    border: 0;
    padding: 0;
    box-shadow: none;
    font-size: 14px;
    i {
      margin-left: 17px;
    }
    &.m-r {
      i {
        margin-left: 0;
        margin-right: 15px;
      }
    }
    &:hover {
      color: ${GreenColor};
      background-color: transparent;
    }
    &:active {
      transform: scale(0.8);
      color: ${GreenColor};
      background-color: transparent;
    }
  }
  &.btn-light {
    color: ${GreenColor};
    border-color: ${GreenColor};
    background-color: transparent;
    &:hover,
    &:focus {
      border-color: ${GreenColor};
      background-color: ${GreenColor};
      color: #fff;
    }
    .full-spinner {
      .ldio {
        & > div {
          &:nth-child(1) {
            border-color: ${GreenColor};
          }
        }
      }
    }
  }
  .full-spinner {
    position: relative;
    left: -10px;
    width: auto;
    .ldio {
      & > div {
        &:nth-child(1) {
          border-color: #fff;
        }
      }
    }
  }

  &.warning-style {
    border: 1px solid ${OrangeColor};
    background: ${OrangeColor};

    &.btn-light {
      border: 1px solid ${OrangeColor};
      color: ${OrangeColor};
      background-color: transparent;

      &:hover,
      &:focus {
        border-color: ${OrangeColor};
        background-color: ${OrangeColor};
        color: #fff;
      }
    }
  }
`;

export const DropMenu = styled(Dropdown.Menu)``;

export const WysiwygDefault = styled.div`
  label {
    font-size: 14px;
    margin-bottom: 14px;
    padding: 0;
    font-weight: 500;
  }
`;

export const InputGroup = styled(Form.Control)`
  height: 40px;
  padding: 6px 20px;
  background: #f5f5fa;
  box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
  border-radius: 15px;
  border: 0;
  font-size: 15px;
  font-weight: 400;
  &.input-num{
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
  }
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
`;
export const NoData = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 40px 0px;
`;
export const GroupInput = styled(Form.Group)`
  margin-bottom: 30px;
  .bloc-password {
    position: relative;
    svg {
      position: absolute;
      top: 17px;
      right: 20px;
      font-size: 22px;
      transition: .3s all;
      &.fa-eye{
        color: #838383;
      }
    }
  } 
  label {
    font-size: 14px;
    margin-bottom: 14px;
    padding: 0;
    font-weight: 500;
    .info-label {
      display: block;
      font-size: 13px;
      line-height: 19px;
      color: #748993;
      margin-top: 11px;
      font-weight: 400;
    }
  }
  textarea {
    width: 100%;
    height: 137px;
  }
  .error-message {
    text-align: center;
    font-size: 13px;
    color: red;
    display: block;
    margin-top: 6px;
  }
  &.form-error {
    ${InputGroup}, .input-address {
      box-shadow: 0 0px 8px 0 rgb(255 120 109);
    }

    label {
      i {
        color: red;
      }
    }
    .react-select__control {
      box-shadow: 0 0px 8px 0 rgb(255 120 109);
    }
    .react-date-picker {
      box-shadow: 0 0px 8px 0 rgb(255 120 109);
      border-radius: 15px;
    }
  }
  &.select-uppercase {
    position: relative;
    input {
      text-transform: uppercase;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: 15px;
      right: 20px;
      ${mixinIcon({ urlIcon: iconArrowGray, width: 12, height: 6 })};
    }
  }
  .notice-form-group {
    font-size: 13px;
    line-height: 22px;
    display: block;
    margin-top: 16px;
    margin-bottom: 0;
  }

  .c-select-option {
    position: relative;
    .input-select__icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .input-address {
    height: 40px;
    padding: 6px 20px;
    background: #f5f5fa;
    box-shadow: 0 2px 9px 0 rgb(182 172 251 / 42%);
    border-radius: 15px;
    border: 0;
    font-size: 15px;
    font-weight: 400;
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
  }
`;

export const TitlePage = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;
  color: ${GreenColor};
`;

export const MainAdmin = styled.div``;
export const MainPageAdmin = styled.div`
.link-download-btn{
  padding: 0;
  border: 0;
  text-decoration: underline;
  background-color: transparent;
  box-shadow: none;
  color: #363636;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  &:hover{
    text-decoration: none;
  }
}
  .message-infobulle {
    position: absolute;
    left: 30px;
    bottom: 76px;
    background-color: #fff;
    box-shadow: 0 3px 50px 0 rgb(182 172 251 / 39%);
    font-size: 12px;
    line-height: 16px;
    max-width: 90% !important;
    padding: 10px 14px;
    border-radius: 10px;
    z-index: 2;
    @media (max-width: 993px) {
      bottom: 70px;
    }
    &:before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      bottom: -16px;
      left: 73px;
      box-sizing: border-box;
      border: 8px solid white;
      border-color: #ffffff #ffffff transparent transparent;
      transform-origin: 0 0;
      transform: rotate(-45deg);
      border-radius: 2px;
      z-index: 0;
      background: #ffffff;
      box-shadow: 0 3px 51px 0 rgb(182 172 251 / 42%);
    }
  }
  .no-content-loading {
    width: 100%;
    flex: 0 0 100%;
    display: block;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  .quill {
    background: #f5f5fa;
    box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
    border-radius: 15px;
    border: 0;
    margin-bottom: 30px;
    .ql-toolbar {
      border: 0;
      border-bottom: 1px solid #e7e7e7;
    }
    .ql-container {
      border: 0;
      min-height: 150px;
    }
    .ql-editor {
      font-size: 15px;
      &::before {
        color: #b7b7ba;
        font-style: normal;
        font-size: 15px;
      }
    }
  }
  .text-danger,
  .text-success {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
    display: block;
  }
  .option-select-check {
    display: flex;
    align-items: flex-start;
    background-color: transparent !important;
    color: #000;
    padding: 6px 0px;
    label {
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
    }
    input {
      display: inline-block;
      border: 1px solid #ececef;
      appearance: none;
      height: 20px;
      width: 20px;
      min-width: 20px;
      border-radius: 4px;
      margin-right: 9px;
      background: #ececef;
      cursor: pointer !important;
      transition: 0.2s all;
      &:checked {
        background: ${GreenColor};
        border-color: #ececef;
        box-shadow: inset 0px 0px 0px 2px #ececef;
      }
    }
  }
  .btns-alings {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 35px 0 33px;
    &.service-btns-action {
      padding-top: 15px;
    }
    ${ButtonDefault} {
      font-size: 14px;
      line-height: 16px;
      width: calc(50% - 16px);
      margin: 0 8px;
      &.btn-delete {
        color: #e67c2e;
        background-color: transparent;
        border-color: #e67c2e;
        &:hover {
          background-color: #e67c2e;
          color: #fff;
        }
      }
    }
  }
  .paginations-bloc {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 -15px;
    flex-wrap: wrap;
    @media (max-width: 993px) {
      justify-content: center;
      align-items: center;
      padding: 28px 0;
    }
    .results-of-page {
      padding: 0 15px;
      .form-group {
        display: flex;
        align-items: baseline;
        label {
          font-size: 13px;
          margin-right: 12px;
          white-space: nowrap;
        }
        & > div {
          min-width: 65px;
        }
        .active-position {
          .react-select__control {
            border-radius: 20px !important;
          }
          .react-select__menu {
            margin-bottom: 4px;
            border-radius: 15px !important;
          }
          .react-select__option {
            text-align: center !important;
          }
        }
      }
    }
    .pagination {
      padding: 0 15px;
      .page-item {
        margin: 0 5px;
        &:first-child {
          &.disabled {
            opacity: 0;
            display: none;
          }
          .page-link {
            background-color: transparent;
            border-color: #dddddd;
            &:hover {
              background-color: ${GreenColor};
              color: #fff;
              border-color: ${GreenColor};
            }
          }
        }
        &:last-child {
          &.disabled {
            opacity: 0;
            display: none;
          }
          .page-link {
            border-color: #dddddd;
            background-color: transparent;
            &:hover {
              background-color: ${GreenColor};
              color: #fff;
              border-color: ${GreenColor};
            }
          }
        }
      }
      .page-link {
        position: relative;
        border: 1px solid transparent;
        width: 31px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50% !important;
        font-size: 13px;
        line-height: inherit;
        font-weight: 500;
        color: #9b9b9b;
        background-color: #efefef;
        transition: 0.4s all;
        &.active {
          background-color: ${GreenColor};
          color: #fff;
          border-color: ${GreenColor};
        }
        &:hover {
          background-color: ${GreenColor};
          color: #fff;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
    }
  }
  .devis-actions {
    display: inline-flex;
    flex-wrap: wrap;
    width: 83%;
    max-width: 100%;
    @media (max-width: 575px) {
      & > label {
        width: 50%;
        width: 50%;
        justify-content: flex-start;
        margin: 0 0 15px;
        white-space: nowrap;
      }
    }
  }
  .image-service {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    margin: 20px 0;
    border-radius: 15px;
    width: 100%;
    height: 235px;
    background-color: #f5f5fa;
    box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
    &.form-error {
      box-shadow: 0 0px 8px 0 rgb(255 120 109);
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 15px;
    }
    input[type="file"] {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      opacity: 0;
      z-index: 1;
      width: 100%;
      cursor: pointer;
      display: none;
    }
    .btns-file {
      position: absolute;
      bottom: 14px;
      right: 14px;
      display: flex;
      align-items: center;
      .edit-image {
        background-color: #e8f9c5;
        color: #88a154;
        z-index: 1;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
        border: 0;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        margin: 0 !important;
        transition: 0.3s all;
        &:active {
          transform: scale(0.8);
        }
      }
      button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
        border: 0;
        margin-left: 8px;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s all;
        &:active {
          transform: scale(0.8);
        }
        &.delete-image {
          background-color: #ffd1af;
          color: #e57c2f;
          position: relative;
          z-index: 2;
        }
      }
    }
  }
  .select-multi-values {
    & > div {
      width: 100%;
    }
    .react-select__value-container {
      height: 100%;

      & > .react-select__single-value {
        margin: 0;
      }
      .react-select__multi-value {
        font-size: 14px;
        & > div {
          font-size: 100%;
        }
      }
      .show-count-select {
        display: none;
        .count-select {
          background-color: ${GreenColor};
          color: #fff;
          font-weight: 600;
          border-radius: 4px;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        &:first-child {
          display: flex;
          align-items: center;
        }
      }
      & > .react-select__placeholder {
        color: #748993;
        font-size: 14px;
        font-weight: 400;
        margin: 0;
      }
    }
  }
  &.vitrine-page {
    .select-multi-values {
      .react-select__menu-list {
        max-height: 216px;
      }
    }
    .vitrine-rating{
      label{
        margin: 0 !important;
        padding: 0 !important;
      }
      & > div{
        margin: 0 !important;
      }
    }
  }

  /* @media (max-width: 768px) {
    .paginations-bloc {
      .pagination {
        .page-item {
          &:first-child.disabled {
            opacity: 1;
          }
        }
      }
    }
  } */
`;
export const ContentAdmin = styled.div`
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 66px);
  &.has-scroll {
    overflow: scroll;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    z-index: 111;
    transition: 0.5s ease-in-out;
    opacity: 0;
    pointer-events: none;
  }
  &.toggled {
    &::before {
      opacity: 0.4;
      pointer-events: all;
    }
  }

`;
export const BlocAdminContent = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  background-color: #f7f7f7;
  .side-content-dashboard {
    width: 0;
    overflow-y: scroll;
    transition: 0.4s all;
    background: #ffffff;
    box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
    padding: 0px 30px 45px;
    &.reparateur-side {
      .form-group {
        margin-bottom: 30px;
      }
      .radio-button-form {
        label {
          white-space: nowrap;
        }
      }
      .bloc-file-form {
        label {
          font-size: 14px;
          margin-bottom: 14px;
          padding: 0;
          font-weight: 500;
        }
        .image-service {
          margin-bottom: 30px;
          margin-top: 0;
        }
      }
      .btns-alings {
        &.service-btns-action {
          margin: 50px 0 40px;
        }
      }
      .date-create {
        margin-bottom: 30px;
        font-size: 14px;
        color: #636363;
        font-weight: 500;
        opacity: 0.8;
        text-align: center;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
    &.active-side {
      width: 24px;
      min-width: 38%;
      @media (min-width: 1460px) {
        min-width: 590px;
      }
    }
    &.side-message {
      min-width: 480px;
      padding: 20px 50px 45px;
    }
    .symbol {
      font-weight: 600;
      font-size: 15px;
    }
    .form-label-title{
      font-size: 14px;
      margin-bottom: 14px;
      padding: 0;
      font-weight: 500;
      margin-top: 30px;
    }
    .title-side-dashboard {
      font-size: 18px;
      line-height: 25px;
      color: ${GreenColor};
      padding-top: 38px;
      padding-bottom: 22px;
      margin: 0 -4px 0;
      font-weight: 500;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 11;
    }
    .link-voir {
      text-align: center;
      a {
        font-size: 14px;
        color: #636363;
        font-weight: 600;
        position: relative;
        transition: 0.3s ease-in-out;
        text-decoration: none;
        padding-bottom: 2px;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #707070;
          transition: 0.5s ease-in-out;
        }
        &:hover {
          color: ${GreenColor};
          &::before {
            width: 0;
            background-color: ${GreenColor};
          }
        }
      }
    }
    .link-voir-0 {
      text-align: center;
      a {
        font-size: 14px;
        color: #636363;
        font-weight: 600;
        position: relative;
        transition: 0.3s ease-in-out;
        text-decoration: none;
        padding-bottom: 2px;
        cursor: default;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #707070;
          transition: 0.5s ease-in-out;
        }
      }
    }
    .form-parent-cat {
      ${ButtonDefault} {
        min-width: 225px;
        margin: auto;
      }
    }
    .forchette-prix {
      label {
        font-size: 14px;
        margin-bottom: 14px;
        padding: 0;
        display: block;
        font-weight: 500;
      }
      .range-price-service {
        display: flex;
        justify-content: space-between;
        ${GroupInput} {
          max-width: 140px;
        }
      }
    }
    &.prestations-side {
      .bloc-name-societe {
        padding-top: 34px;
        margin-bottom: 0px;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 23px;
        img {
          width: 43px;
          height: 43px;
          min-width: 43px;
          object-fit: contain;
          margin-right: 16px;
        }
      }
      .title-side-dashboard {
        padding-top: 36px;
        color: #e67c2e;
        font-weight: 600;
      }
      .form-prestations {
        .image-service-prestation {
          margin: 10px 0 20px;
          height: 160px;
          img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .desc-service-prestation {
          font-size: 14px;
          line-height: 23px;
          margin-bottom: 20px;
        }
        .cats-service-prestation {
          font-size: 14px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          & > span {
            display: block;
            white-space: nowrap;
            margin-right: 5px;
            margin-bottom: 6px;
          }
          .item-cats-prestation {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            p {
              margin-bottom: 7px;
              margin-right: 10px;
            }
            span {
              font-weight: 500;
              font-size: 14px;
              line-height: 19px;
              display: inline-block;
              background-color: #9ACA3C;
              padding: 5px 10px;
              border-radius: 2px;
              color: #fff;
            }
          }
        }
        .delivrance-content {
          .form-group {
            & > label {
              font-weight: 600;
              font-size: 15px;
            }
          }
          .distance-input {
            padding-top: 10px;
            input {
              width: 100px !important;
              max-width: 100%;
            }
          }
        }
        .notice-bloc {
          display: flex;
          align-items: flex-start;
          color: ${GreenColor};
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
          margin-bottom: 30px;
          .notice-icon {
            background-color: ${GreenColor};
            width: 19px;
            height: 19px;
            min-width: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 5px;
          }
          .item-notice {
            & > span {
              display: block;
            }
          }
        }
        .bloc-button-prestation {
          margin-top: 40px;
          ${ButtonDefault} {
            margin: auto;
          }
        }
        ${ButtonDefault} {
          padding: 11px 45px;
          font-weight: 600;
        }
        .price-delivrance,
        .distance-delivrance {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .form-group {
            margin: 0;
            display: flex;
            align-items: center;
            & > label {
              margin-bottom: 0;
              margin-right: 15px;
            }
            ${InputGroup} {
              width: 100px;
              text-align: right;
              padding: 6px 12px;
              margin-right: 10px;
            }
          }
        }
        .type-modes-prestation {
          .radio-button-form {
            width: 50%;
            margin-right: 15px;
          }
        }
        .type-prestation,
        .bloc-mode-delivrance {
          margin-bottom: 30px;
          & > div {
            & > label {
              color: #e67c2e;
              margin-bottom: 20px;
              font-weight: 600;
              font-size: 16px;
              line-height: 23px;
            }
          }
        }
        .devis-detail {
          margin-top: 17px;
          .price-devis {
            display: flex;
            align-items: center;
            padding-left: 32px;
            margin-bottom: 20px;
            label {
              display: flex;
              font-weight: 600;
              font-size: 15px;
            }
            .form-group {
              margin-bottom: 0.5rem;
            }
            ${InputGroup} {
              width: 70px;
              text-align: right;
              padding-left: 0;
              margin-right: 10px;
            }
            .info-tooltip {
              position: relative;
              i {
                cursor: pointer;
                margin: 0 14px 0 5px;
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
          textarea {
            font-size: 15px;
            &::-webkit-input-placeholder {
              font-size: 15px;
              color: #748993;
              opacity: 0.8;
            }
            &::-moz-placeholder {
              font-size: 15px;
              color: #748993;
              opacity: 0.8;
            }
            &:-ms-input-placeholder {
              font-size: 15px;
              color: #748993;
              opacity: 0.8;
            }
            &:-moz-placeholder {
              font-size: 15px;
              color: #748993;
              opacity: 0.8;
            }
            &:focus {
              border-color: 0;
              outline: 0;
              outline: none;
              box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
            }
          }
        }
        &.reparateur-form-prestation {
          .cats-service-prestation {
            margin-bottom: 30px;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .side-content-dashboard {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1000;

      &.active-side {
        width: 100%;
      }

      .title-side-dashboard {
        padding-top: 15px;
        position: static;
      }

      &.prestations-side {
        .title-side-dashboard {
          padding-top: 15px;
        }
      }

      &.side-message {
        position: absolute;
        min-width: auto;
        padding: 15px;
        z-index: 555;
      }
    }
  }
`;

export const SettingTabs = styled.div`
  .nav {
    .nav-item {
      margin-right: 58px;
      &:last-child {
        margin-right: 0px;
      }
      .nav-link {
        background-color: transparent;
        color: #748993;
        font-weight: 600;
        font-size: 16px;
        line-height: 23px;
        padding: 0 0 10px;
        position: relative;
        &.active {
          color: #e67c2e;
          &:before {
            width: 100%;
          }
        }
        &:hover {
          color: #e67c2e;
        }
        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #e67c2e;
          transition: 0.4s ease-in-out;
        }
      }
    }
  }
  .tab-pane {
    padding: 50px 0 30px;
  }

  @media (max-width: 768px) {
    .nav {
      .nav-item {
        margin-right: 15px;
        flex: 1 1 0px;
        text-align: center;
        .nav-link {
          font-weight: 500;
          padding: 0 15px 10px 15px;

          &::before {
            height: 2px;
          }
        }
      }
    }
    .tab-pane {
      padding: 25px 0 25px;
    }
  }
`;
export const ContainePageSimple = styled.div`
  width: 880px;
  max-width: 100%;
  margin: auto;
  padding: 30px 15px;
  .bloc-title-page {
    margin-bottom: 50px;
    width: 660px;
    max-width: 100%;
    ${TitlePage} {
      margin-bottom: 6px;
    }
    p {
      color: #5d5d5d;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .bloc-default-form-horizontal {
    margin-bottom: 35px;
    .titre-form-horizontal {
      font-size: 15px;
      line-height: 21px;
      font-weight: 500;
      color: ${GreenColor};
      padding-bottom: 15px;
      margin-bottom: 0px;
    }
    p {
      color: #5d5d5d;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0;
      padding-bottom: 15px;
    }
  }
  .form-horizontal-default {
    margin-bottom: 55px;
    .form-group {
      display: flex;
      align-items: flex-start;
      margin-bottom: 40px;
      & > label {
        width: 245px;
        min-width: 245px;
        margin-bottom: 14px;
        padding-top: 10px;
        padding-right: 15px;
        font-size: 15px;
        line-height: 21px;
        font-weight: 600;
      }
      ${InputGroup}:not(textarea), .input-address {
        height: 45px;
      }
      & > .react-select__container {
        width: 100%;
        & > .react-select__control {
          min-height: 45px;
        }
      }
      .select-uppercase {
        .react-select__single-value {
          text-transform: uppercase;
        }
      }
      textarea {
        height: 190px;
      }
      &.password-input {
        flex-wrap: wrap;
        .bloc-password {
          width: calc(100% - 245px);
          svg{
            top: 12px;
          }
          @media(max-width: 993px){
            width: 100%;
          }
        }
        .notice-form-group {
          margin-top: 0;
          padding-left: 233px;
          color: #5d5d5d;
          font-size: 12px;
          line-height: 17px;
          opacity: 0.8;
        }
      }
    }
    .bloc-file-form {
      display: flex;
      align-items: flex-start;
      margin-bottom: 40px;
      & > label {
        width: 245px;
        min-width: 245px;
        margin-bottom: 14px;
        padding-top: 10px;
        padding-right: 15px;
        font-weight: 600;
        font-size: 15px;
        line-height: 21px;
        .info-label {
          display: block;
          font-size: 13px;
          line-height: 19px;
          color: #748993;
          margin-top: 11px;
          font-weight: 400;
        }
      }
      .image-service {
        margin: 0;
        width: 298px;
        max-width: 100%;
        height: 153px;
      }
      .loop-fils-upload {
        margin: 0 -10px;
        width: 625px;
        & > div {
          padding: 0 10px;
          margin-bottom: 20px;
        }
        .add-more-fils {
          height: 153px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed ${GreenColor};
          border-radius: 15px;
          cursor: pointer;
          i {
            transition: 0.3s ease-in-out;
          }
          &:hover,
          &.active {
            i {
              transform: scale(0.9);
            }
          }
        }
      }
      @media (max-width: 993px) {
        .loop-fils-upload {
          width: auto;
        }
      }
      @media (max-width: 575px) {
        & > label {
          width: 100%;
          padding-right: 0;
        }
      }
    }
  }
  .btns-alings {
    padding-top: 15px;
    ${ButtonDefault} {
      width: 225px;
      max-width: 100%;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    .bloc-title-page {
      margin-bottom: 15px;
    }
    .bloc-default-form-horizontal {
      margin-bottom: 0;
    }

    .form-horizontal-default {
      margin-bottom: 0;
      .form-group {
        margin-bottom: 25px;
        flex-direction: column;
        &.password-input {
          flex-wrap: wrap;
          ${InputGroup} {
            width: 100%;
          }
          .notice-form-group {
            margin-top: 15px;
            padding-left: 0;
          }
        }
      }
      .bloc-file-form {
        flex-direction: column;
        margin-bottom: 25px;
        label {
          margin-bottom: 0;
        }
        .image-service {
          width: 100%;
          height: 175px;
        }
        .loop-fils-upload {
          & > div {
            margin-bottom: 0;
            margin-top: 15px;
          }
          & > div + div {
            margin-top: 15px;
          }
          .add-more-fils {
            height: 175px;
            margin: 0;
          }
        }
      }
    }

    .btns-alings {
      padding: 0;
      margin: 35px 0;
    }
  }
`;

export const ItemsPrestationsStyle = styled.div`
  .row {
    margin: 0 -8px 20px;
    padding-top: 20px;
  }
`;
export const ItemPrestationStyle = styled(Col)`
  margin-bottom: 16px;
  padding: 0 8px;
  @media (min-width: 1260px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (min-width: 1600px) {
    flex: 0 0 20%;
    max-width: 20%;
  }
  .content-item-prestation {
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 2px 41px 0 rgba(182, 172, 251, 0.42);
    border-radius: 18px;
    height: 100%;
    cursor: pointer;
    &.active {
      box-shadow: 0 0px 14px 0 rgb(154 202 59);
    }
  }
  .img-prestation {
    height: 180px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .detail-prestation {
    padding: 20px 16px 65px;
    @media(max-width: 767px){
      padding: 20px 16px;
    }
    .name-prestation {
      color: #e67c2e;
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      min-height: 46px;
      margin-bottom: 10px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      @media(max-width: 767px){
      min-height: auto;
    }
    }
    .price-estime {
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      color: ${GreenColor};
      margin-bottom: 13px;
      min-height: 21px;
    }
    .cats-prestation {
      font-size: 14px;
      & > span {
        display: block;
        white-space: nowrap;
        margin-right: 5px;
        margin-bottom: 10px;
      }
      .item-cats-prestation {
        display: flex;
        flex-wrap: wrap;
        .item-cats-prestation {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        p {
          margin-bottom: 7px;
          margin-right: 10px;
        }
        span {
          font-weight: 500;
          font-size: 13px;
          line-height: 19px;
          display: inline-block;
          background-color: ${GreenColor};
          padding: 5px 10px;
          border-radius: 2px;
          color: #fff;
        }
      }
    }
    .bloc-societe {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #000;
      position: absolute;
      bottom: 20px;
      img {
        margin-right: 11px;
        height: 37px;
      }
      @media(max-width: 767px){
        position: static;
      }
    }
  }
`;
export const ToggleFilter = styled.div`
  background: #ffffff;
  box-shadow: 0 2px 41px 0 rgba(182, 172, 251, 0.42);
  border-radius: 11.25px;
  width: 37px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  margin-left: auto;
`;
export const ContentDashboard = styled.div`
  overflow-y: scroll;
  width: 100%;
  padding: 30px 25px 0px;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  &.side-is-opened {
    ${ItemPrestationStyle} {
      @media (min-width: 1200px) {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        .img-prestation {
          height: 140px;
        }
      }
      @media (min-width: 1600px) {
        flex: 0 0 25%;
        max-width: 25%;
        .img-prestation {
          height: 150px;
        }
      }
    }
  }
  &.services-page {
    ${ToggleFilter} {
      position: absolute;
      right: 0;
      bottom: -46px;
    }
  }
  &.messagerie-content {
    .content-dashboard {
      height: calc(100% - 70px);
    }
  }
`;
//Accordion

export const HeadSortItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 200;
  color: #5d5d5d;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 18px 19px;
  position: relative;
`;

export const SortAccordionItem = styled.div`
  ${HeadSortItem} {
    &.collapsed {
      background-color: ${GreenColor};
      color: #fff;
      font-weight: 300;
      .handle-sort {
        span {
          background-color: #fff;
        }
      }
    }
  }
  .handle-sort {
    margin-right: 13px;
    cursor: move;
    &:focus,
    &:hover {
      cursor: move;
    }
    span {
      display: block;
      width: 6px;
      height: 6px;
      background-color: #d8d8d8;
      border-radius: 50%;
      margin: 2px 0;
    }
  }
  .sort-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span {
      display: block;
    }
    .service-attachment {
      margin-left: 70px;
    }
  }
  .children-accordion {
    padding-left: 10%;
  }
  .sort_content {
    height: auto;
    max-height: 0;
    overflow: hidden;
    transition: 0.2s ease-in-out;
    &.show-content {
      max-height: 30000px;
      overflow: inherit;
    }
  }
  .bloc-headSort-item {
    position: relative;

    ${HeadSortItem} {
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    &.head-level-1 {
      ${HeadSortItem} {
        padding: 14px 19px;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        &.collapsed {
          color: #fff;
        }
      }
      ${ButtonDefault} {
        i {
          min-width: 27px;
          width: 27px;
          height: 27px;
        }
      }
    }
    &.head-level-2 {
      ${HeadSortItem} {
        padding: 12px 19px;
        font-size: 13px;
        font-weight: 500;
        color: #000;
        &.collapsed {
          color: #fff;
        }
      }
      ${ButtonDefault} {
        i {
          min-width: 24px;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
export const BtnAccordAdd = styled.div`
  background-color: transparent !important;
  color: #5d5d5d;
  width: 100%;
  justify-content: flex-start;
  height: 54px;
  border: 1px dashed ${GreenColor};
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 15px;
  box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42);
  font-family: "Poppins", sans-serif;
  padding: 11px 20px;
  transition: 0.5s ease-in-out;
  outline: none;
  display: flex;
  align-items: center;
  position: relative;
  white-space: nowrap;
  background-color: #fff;
  i {
    margin-right: 12px;
  }
  &.level-btn-0 {
    cursor: pointer;
    font-weight: 600;
    height: 45px;
    font-size: 14px;
    i {
      min-width: 27px;
      width: 27px;
      height: 27px;
    }
  }
  &.level-btn-1 {
    cursor: pointer;
    font-weight: 600;
    height: 40px;
    font-size: 13px;
    border-radius: 14px;
    i {
      min-width: 24px;
      width: 24px;
      height: 24px;
    }
  }
  &.level-btn {
    cursor: pointer;
  }
`;

export const BlocAccordions = styled.div`
  & > .accordionSorts {
    & > .sort-lists {
      & > ${SortAccordionItem} {
        & > ${HeadSortItem} {
          font-size: 14px;
        }
      }
    }
  }
`;

export const ServicesTableStyle = styled.div`
  .btn-add {
    position: absolute;
    top: 25px;
    right: 22px;
    z-index: 1;
  }
  .table-responsive {
    padding-bottom: 36px;
    position: relative;
    overflow-x: visible;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 36px;
      background: -moz-linear-gradient(
        top,
        rgba(247, 246, 254, 1) 0%,
        rgba(255, 255, 255, 0.2) 65%
      );
      background: -webkit-linear-gradient(
        top,
        rgba(247, 246, 254, 1) 0%,
        rgba(255, 255, 255, 0.2) 65%
      );
      background: linear-gradient(
        to bottom,
        rgba(247, 246, 254, 1) 0%,
        rgba(255, 255, 255, 0.2) 65%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f6fe', endColorstr='#33ffffff',GradientType=0 );
    }
  }
  .table {
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 0;
    th {
      font-weight: 600;
      padding: 20px 10px;
      &:first-child {
        padding-left: 24px;
      }
      .head-table-sort {
        display: flex;
        align-items: center;
        span {
          cursor: pointer;
          margin-left: 5px;
        }
      }
    }
    thead {
      tr {
        background: rgb(247, 246, 254);
        background: linear-gradient(
          0deg,
          rgba(247, 246, 254, 1) 0%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
    tbody {
      tr {
        cursor: pointer;
        transition: 0.5s all;
        border-bottom: 10px solid #f7f6fe;
        &.active {
          overflow: hidden;
          transform: scale(1.04);
          color: #fff;
          background-color: #9aca3b;
          position: sticky;
          td {
            background-color: #9aca3b;
            color: #fff;
          }
        }
      }
      td {
        padding: 15px 12px;
        &:first-child {
          padding-left: 24px;
        }
      }
    }
  }
  .divTable {
    display: table;
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    margin: 0 auto 30px;
    color: #5d5d5d;
    .no-content-table {
      padding: 20px 0;
      font-size: 22px;
      font-weight: 600;
      width: 100%;
      text-align: center;
    }
    .divTableRow {
      display: table-row;
    }
    .divTableHeading {
      display: table-header-group;
      .divTableHead {
        display: table-cell;
        font-weight: 600;
        padding: 20px 10px;
        background: rgb(247, 246, 254);
        background: linear-gradient(
          0deg,
          rgba(247, 246, 254, 1) 0%,
          rgba(255, 255, 255, 1) 100%
        );
        text-align: center;
        &:first-child {
          padding-left: 24px;
          text-align: left;
          border-radius: 15px 0 0 15px;
          .head-table-sort {
            justify-content: flex-start;
          }
        }
        &:last-child {
          border-radius: 0 15px 15px 0;
        }
        .head-table-sort {
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            margin: 0;
            cursor: pointer;
            display: flex;
            white-space: nowrap;
          }
          span {
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
    }
    .divTableCell {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: -1px;
        bottom: 10px;
        background: #fff;
        z-index: 1;
      }
      &:first-child {
        text-align: left;
        &::before {
          border-radius: 15px 0 0 15px;
        }
        & > div {
          padding-left: 24px;
        }
      }
      &:last-child {
        &::before {
          border-radius: 0 15px 15px 0;
        }
      }
      & > div {
        padding: 15px 12px;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
        min-height: 48px;
        &.name-commande {
          min-width: 220px;
        }
        &.no-wrap {
          white-space: nowrap;
        }
      }
    }
    .divTableHeading {
      background-color: #eee;
      display: table-header-group;
      font-weight: bold;
    }
    .divTableFoot {
      background-color: #eee;
      display: table-footer-group;
      font-weight: bold;
    }
    .divTableBody {
      display: table-row-group;
      .divTableRow {
        cursor: pointer;
        transition: 0.5s all;
        &:last-child {
        }
        &.active {
          transform: scale(1.02);
          .divTableCell {
            &:before {
              background: #9aca3b;
            }
            & > div {
              padding-left: 6px;
              color: #fff;
            }
            &:first-child {
              & > div {
                padding-left: 38px;
              }
            }
          }
        }
      }
    }

    &.align-left {
      .divTableCell {
        text-align: left;
      }

      .divTableHeading .divTableHead .head-table-sort {
        justify-content: left;
      }

      .no-content-table {
        text-align: center;
      }
    }
  }

  @media (max-width: 768px) {
    .divTable {
      margin-bottom: 10px;
      display: block;
      .divTableHeading {
        display: none;
      }

      .divTableBody {
        display: block;
        .divTableRow {
          display: block;
          background: white;
          border-radius: 15px;
          padding: 15px;
          margin: 15px 0;
          &:last-child {
            margin-bottom: 0;
          }
          .divTableCell {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            > div {
              margin: 0;
              min-height: auto;
              padding: 7px 12px;
              text-align: right;
            }
            > label {
              position: relative;
              z-index: 1;
              margin: 0;
              padding: 7px 8px;
              font-weight: 600;
            }

            &:first-child > div {
              border-radius: 15px 15px 0 15px;
            }

            &.m-action {
              justify-content: center;
              padding: 10px 0;
              > div {
                width: 90%;
                button {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DefaultFilter = styled.div`
  position: relative;
`;
export const FilterBlocs = styled.div`
  &.services-filter {
    .form-filter {
      margin: 0 -13px;
      .form-group {
        width: 50%;
        padding: 10px 13px;
      }
    }
  }
  .form-filter {
    display: flex;
    .react-select__menu {
      margin: 0;
      left: 50%;
      transform: translateX(-50%);
      & > .react-select__menu-list {
        max-height: 250px;
      }
    }
    .react-select__option {
      text-align: left;
    }
  }
  .form-group {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    &.services-filter {
      .form-filter {
        .form-group {
          width: 100%;
        }
      }
    }
    .form-filter {
      flex-direction: column;
    }
  }
`;

export const BackLinkStyle = styled.div`
  a {
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    color: #b6c1c6;
    margin-bottom: 10px;
    text-decoration: none;
  }
`;

export const DatePickerStyle = styled.div`
  label {
    font-size: 14px;
    margin-bottom: 14px;
    padding: 0;
    font-weight: 500;
    .info-label {
      display: block;
      font-size: 13px;
      line-height: 19px;
      color: #748993;
      margin-top: 11px;
      font-weight: 400;
    }
  }

  .react-date-picker {
    margin-bottom: 20px;
    display: flex;
    min-width: 200px;

    &:before {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;

      border-bottom: 8px solid white;

      position: absolute;
      bottom: -15px;
      right: 18px;
      z-index: 100;
    }

    .react-calendar {
      border: none;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 2px 9px 0 rgb(182 172 251 / 42%);
      margin-top: 15px;

      .react-calendar__navigation {
        margin: 0;
        border-bottom: 1px solid #f3f3f3;
        .react-calendar__navigation__arrow {
          color: #c9c9c9;
        }
        .react-calendar__navigation__label__labelText {
          &.react-calendar__navigation__label__labelText--from {
            color: #9ACA3C;
          }
        }

        button[disabled] {
          background: none;
          cursor: not-allowed;
          opacity: 0.5;
        }
      }

      .react-calendar__month-view__weekdays {
        padding: 7px 0;
        border-bottom: 1px solid #f3f3f3;
        color: #999999;
        font-size: 13px;
        font-weight: normal;
        abbr {
          text-decoration: none;
        }
      }

      .react-calendar__month-view__days__day {
        color: #000000;
        font-size: 13px;
        padding: 5px;

        abbr {
          padding: 5px;
          display: block;
          //background: red;
          border-radius: 5px;
        }
      }

      .react-calendar__month-view__days__day--weekend {
        color: #000000;
      }

      .react-calendar__month-view__days__day--neighboringMonth {
        color: #999999;
      }

      .react-calendar__tile {
        &:disabled {
          background: none;
          &.react-calendar__month-view__days__day {
            color: #999999;
            cursor: not-allowed;
            opacity: 0.5;
          }
        }

        &:enabled:hover,
        &:enabled:focus {
          background: none;
          abbr {
            background: #e6e6e6;
          }
        }

        &.react-calendar__tile--now {
          background: none;
        }

        &.react-calendar__tile--active {
          &,
          &:hover,
          &:focus {
            background: none;
            abbr {
              background: rgba(154, 202, 60, 0.19);
              color: #9ACA3C;
            }
          }
        }
      }
    }
    .react-date-picker__calendar {
      z-index: 50;
    }
    .react-date-picker__wrapper {
      height: 40px;
      padding: 6px 45px 6px 20px;
      background: #f5f5fa;
      box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
      border-radius: 15px;
      border: 0;
      font-size: 15px;
      font-weight: 400;
      position: relative;
      overflow: hidden;

      .react-date-picker__calendar-button.react-date-picker__button {
        position: absolute;
        top: 5px;
        right: 5px;
        height: 30px;
        background: #9ACA3C;

        border-radius: 25px;

        width: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .react-date-picker__inputGroup__input {
        color: #495057;
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

        &:focus,
        &:invalid {
          background: none;
          outline: none;
        }
      }

      .react-date-picker__inputGroup__divider {
        color: #444444;
        opacity: 0.4;
      }
    }
  }

  .react-date-picker--disabled {
    background: none;
  }

  @media (max-width: 768px) {
    .react-date-picker__calendar {
      width: 100%;
    }
    .react-calendar {
      width: 100%;
    }
  }
`;

export const ListeMessagesItems = styled.div``;
export const ItemMessage = styled.div`
  background: #ffffff;
  box-shadow: 0 3px 51px 0 rgb(182 172 251 / 42%);
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 30px 25px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &.active,
  &:hover {
    transform: scale(1.08);
    margin: 20px 0 30px;
  }
  .bloc-info-message {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    .img-profil {
      height: 55px;
      width: 55px;
      min-width: 55px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f1f1f1;
      border-radius: 50%;
      color: #607078; 
      font-weight: 500;
      text-transform: uppercase;
      &.en-ligne {
        &::before {
          content: "";
          position: absolute;
          top: 1px;
          right: -5px;
          background-color: #80d796;
          height: 17px;
          width: 17px;
          border: 2px solid #fff;
          border-radius: 50%;
        }
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .name-profil {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      line-height: 20px;
      padding-left: 10px;
    }
    .date-profil-message {
      margin-left: auto;
      padding-left: 15px;
      color: #636363;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.8;
    }
  }
  .last-profil-message {
    font-size: 13px;
    line-height: 17px;
    color: #5d5d5d;
    opacity: 0.8;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .cout-no-read-message {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 12px;
    line-height: 16px;
    color: #e67c2e;
    font-weight: 500;
    margin-top: 10px;
    span {
      display: inline-block;
      border: 1px solid #d2d2d2;
      border-radius: 20px;
      padding: 3px 10px;
    }
  }
  @media (max-width: 768px) {
    padding: 22px 15px;
    .bloc-info-message {
      .date-profil-message {
        font-size: 12px;
        line-height: 15px;
        padding-left: 10px;
      }
    }
  }
`;
export const LoadingMessage = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  padding-top: 4px;
  @keyframes ani {
    0%,
    40%,
    100% {
      transform: scale(0.5);
    }
    20% {
      transform: scale(0.9);
    }
  }
  li {
    list-style: none;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    animation: ani 0.8s linear infinite;
    &:nth-child(1) {
      animation-delay: -1.3s;
      background: #afabab;
    }
    &:nth-child(2) {
      animation-delay: -1.2s;
      background: #afabab;
    }
    &:nth-child(3) {
      animation-delay: -1s;
      background: #6d6d6d;
    }
  }
`;
export const ChatSpace = styled.div`
  background: #ffffff;
  box-shadow: 0 3px 51px 0 rgb(182 172 251 / 42%);
  border-radius: 20px;
  width: 95%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .head-space-chat {
    background-color: #fafafa;
    border-bottom: 1px solid #e9e9e9;
    text-align: center;
    padding: 18px 15px 15px;
    line-height: 20px;
    ${CloseButtonStyle} {
      position: absolute;
      right: 0;
      margin: auto;
      top: 8px;
      background-color: #fafafa;
    }
    .name-chat-space {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 4px;
    }
    span {
      font-size: 15px;
      &.online {
        color: #80d796;
      }
      &.offline {
        color: #636363;
        opacity: 0.5;
      }
    }
  }
  .is-teyping {
    position: sticky;
    bottom: 0;
    margin-bottom: 10px !important;
    z-index: 1;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      width: 1000px;
      height: 100%;
      background-color: #fff;
      z-index: -1;
    }
    .msg_cotainer {
      max-width: 100%;
      .content-msg {
        padding: 5px 20px;
      }
    }
  }
  .content-space-chat {
    flex: 1 1 auto;
    padding: 1.25rem 1.25rem 0;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 260px);
    position: relative;
    @media (max-width: 768px) {
      height: calc(100% - 244px);
    }
  }
  .img_cont_msg {
    margin-top: 15px;
    height: 50px;
    width: 50px;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    color: #607078;
    font-weight: 500;
    text-transform: uppercase;
    .user_img_msg {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .msg_cotainer {
    word-wrap: break-word;
    white-space: pre-wrap;
    max-width: 50%;
    position: relative;
    .content-msg {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 20px;
      border-radius: 50px;
      background-color: #eeeeee;
      padding: 10px 30px 15px;
      position: relative;
      color: #636363;
      font-size: 13px;
      line-height: 19px;
      .name-msg {
        display: block;
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
        margin-bottom: 3px;
        color: #000;
        opacity: 0.8;
      }
      & > div {
        a {
          display: block;
          color: ${GreenColor};
          margin-top: 8px;
          position: relative;
          padding-left: 20px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0px;
            ${mixinIcon({ urlIcon: iconDownload, width: 17, height: 17 })};
          }
        }
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        ${mixinIcon({ urlIcon: iconMotifClient, width: 32, height: 19 })};
      }
    }
    .msg_time {
      position: absolute;
      left: 22px;
      bottom: -22px;
      color: #636363;
      opacity: 0.5;
      font-size: 12px;
      white-space: nowrap;
    }
    &.support-cotainer {
      .content-msg {
        background-color: #e9f9c9;
        .name-msg {
          text-align: right;
        }
        &:before {
          right: 0;
          bottom: 0;
          left: auto;
          ${mixinIcon({ urlIcon: iconMotifSupport, width: 32, height: 19 })};
        }
      }
      .msg_time {
        left: auto;
        right: 5px;
      }
    }
  }
  .keyboard-chat {
    background-color: #fff;
    padding: 15px;
    border-top: 1px solid #e9e9e9;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .bloc-keyboard {
      position: relative;
      width: 85%;
      max-width: 100%;
      margin: auto;
      vertical-align: middle;
    }
    .form-group {
      margin-bottom: 0;
      label {
        font-size: 16px;
      }
      textarea {
        height: 50px;
        min-height: 50px;
        max-height: 76px;
        border-radius: 50px;
        padding-top: 12px;
        padding-right: 78px;
        padding-left: 30px;
        color: #636363;
        font-size: 14px;
        line-height: 19px;
      }
    }
    .option-chat {
      position: relative;
    }
    .btn-action-keyboard {
      position: absolute;
      top: 8px;
      right: 10px;
      display: flex;
      align-items: center;
      button {
        margin-left: 10px;
        padding: 0;
      }
      .btn-clip {
        background-color: transparent;
        border: 0;
        margin-bottom: 0;
      }
      .btn-send {
        background-color: ${GreenColor};
        border: 1px solid ${GreenColor};
        width: 37px;
        height: 37px;
        min-width: 37px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s all;
        &:active {
          transform: scale(0.9);
        }
      }
    }
    .chat-files {
      width: 85%;
      max-width: 100%;
      margin: auto;
      .name-file-chat{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 40px);
      }
      @media (max-width: 757px) {
        width: 100%;
      }
      .lds-dual-ring {
        display: inline-block;
        width: 20px;
        height: 20px;
        opacity: .7;
        margin-right: 10px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid ${GreenColor};
        border-color: ${GreenColor} transparent ${GreenColor} transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .error-upload{
        position: relative;
        margin-right: 10px;
        cursor: pointer;
        &:hover{
          span{
            opacity: 1;
          }
        }
        span{
          position: absolute;
          top: -16px;
          background-color: #000;
          color: #FFF;
          font-size: 12px;
          line-height: 18px;
          border-radius: 12px;
          display: inline-block;
          padding: 5px 10px;
          opacity: 0;
          width: 270px;
          margin-left: 10px;
        }
      }
      & > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        p {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 0;
          width: calc(100% - 26px);
          svg {
            width: 25px;
            min-width: 25px;
            margin-right: 10px;
          }
        }
        button {
          margin-left: auto;
          background-color: transparent;
          border: 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 6666;
    .keyboard-chat {
      .form-group {
        label {
          margin-bottom: 5px;
        }
      }
    }
    .dev-close-btn {
      position: absolute;
      top: 0;
      right: 15px;
    }

    .msg_cotainer {
      max-width: 100%;
    }
  }
  @media (max-width: 575px) {
    .head-space-chat {
      span {
        font-size: 13px;
      }
    }
    .keyboard-chat {
      .bloc-keyboard {
        width: 100%;
      }
    }
  }
`;
