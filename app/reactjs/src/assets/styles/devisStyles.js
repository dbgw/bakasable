import styled from "styled-components";

export const IconCardStyle = styled.div`
  padding: 25px;
  background: white;
  box-shadow: 0 2px 41px 0 rgb(182 172 251 / 42%);
  text-align: center;
  border-radius: 15px;
  height: 100%;

  .card-icon {
    margin-bottom: 9px;
  }

  p {
    color: #a0afb6;
    font-size: 15px;
    font-weight: 400;
    margin: 0 0 5px 0;
  }

  h3 {
    font-size: 28px;
    line-height: 39px;
    font-weight: 500;
    color: #363636;
    margin: 0;
  }
`;

export const LabelStatusStyle = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  &:not(:last-of-type) {
    margin: 0 30px 0 0;
  }

  p {
    font-size: 15px;
    color: #444;
    margin: 0 0 0 10px;

    &.hide {
      display: none;
    }
  }
`;

export const DevisSideDetailStyle = styled.div`
  .bloc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 0;

    .bloc-title {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: #9ACA3C;
    }
  }

  .bloc-body {
    padding: 15px 0;
    .bloc-service-name {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #e67c2e;
    }

    h3 {
      font-size: 16px;
      font-weight: 500;
      color: #444;
      margin: 0;
    }

    span {
      font-size: 14px;
      font-weight: normal;
      color: #748993;
    }

    h5 {
      font-size: 16px;
      font-weight: 400;
      color: #9ACA3C;
      margin: 0 0 8px 0;
    }

    p {
      font-size: 14px;
      font-weight: normal;
      color: #363636;
      margin: 0;
    }

    .d-block {
      padding-bottom: 15px;
      border-bottom: 1px solid #f6f6f6;

      h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        font-weight: 500;
        color: #9ACA3C;
      }

      h4 {
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: 500;
        color: #e67c2e;
      }

      p {
        font-size: 14px;
        font-weight: 400;
        color: #363636;
        margin: 0 0 5px 0;
      }

      a {
        font-size: 14px;
        font-weight: 400;
        color: #888888;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
export const DsdHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 15px 0;
  @media (max-width: 768px) {
    padding-top: 20px;
  }
  .bloc-title {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #9ACA3C;
  }
`;

export const DsdContentStyle = styled.div`
  padding: 15px 0;
  & > a {
    text-decoration: none;
  }
  .content-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #e67c2e;
  }
  .admin-switch-commande {
    font-size: 14px;
    font-weight: 400;
    color: #888888;
    padding-top: 10px;
    a {
      color: #888888;
      -webkit-text-decoration: underline;
      text-decoration: underline;
      cursor: pointer;
      margin: 0 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #444;
    margin: 0;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: #748993;
  }

  h5 {
    font-size: 16px;
    font-weight: 400;
    color: #9ACA3C;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    font-weight: normal;
    color: #363636;
    margin: 0;
  }

  .d-block {
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;

    h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: 500;
      color: #9ACA3C;
    }

    h4 {
      margin: 0 0 10px 0;
      font-size: 16px;
      font-weight: 500;
      color: #e67c2e;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #363636;
      margin: 0 0 5px 0;
    }

    a {
      font-size: 14px;
      font-weight: 400;
      color: #888888;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const DsdActionsStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0;

  button {
    margin: 0 5px;
    font-weight: 500;
    width: 226px;
  }
`;

export const BlocAuthStyle = styled.div`
  .auth-bloc {
    display: flex;
    align-items: center;
    margin-top: 25px;

    .bloc-img {
      width: 53px;
      height: 53px;
      border-radius: 8px;
      margin-right: 10px;
      background: #eeecfd;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    p {
      font-size: 16px;
      font-weight: 400;
      color: #444;
      margin: 0;
    }

    span {
      font-size: 14px;
      font-weight: normal;
      color: #748993;
    }
    &.sm {
      margin-top: 0;
      .bloc-img {
        width: 25px;
        height: 25px;
        border-radius: 5px;
      }

      p {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
`;

export const BlocInfoStyle = styled.div`
  margin-top: 25px;

  &.w-b {
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    color: #444;
    margin: 0 0 8px 0;
    &.w-lg {
      font-weight: 500;
    }

    &.warning-style {
      color: #e67c2e;
    }

    &.success-style {
      color: #9ACA3C;
    }
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    color: #444;
    margin: 0 0 8px 0;

    &.warning-style {
      color: #e67c2e;
    }

    &.success-style {
      color: #9ACA3C;
    }

    &.w-lg {
      font-weight: 500;
    }
  }

  .dwn-file-commande {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #636363;
    margin: 0 0 8px 0;
    display: inline-block;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: #748993;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    font-weight: normal;
    color: #363636;
    margin: 0;
  }
  .desc-devis {
    white-space: pre-line;
    font-size: 14px;
    line-height: 22px;
    font-weight: normal;
    color: #363636;
  }
  a {
    font-size: 14px;
    font-weight: 400;
    color: #888888;
    text-decoration: underline;
    cursor: pointer;
    &:not([href]):not([class]) {
      text-decoration: underline;
    }
  }
`;

export const BlocImagesStyle = styled.div`
  margin-top: 25px;

  h3 {
    font-size: 16px;
    font-weight: 400;
    color: #e67c2e;
    margin: 0 0 10px 0;
  }

  .bloc-images {
    margin: 0 -10px;
    display: flex;
    flex-wrap: wrap;
    .img {
      display: inline-block;
      width: 25%;
      height: 133px;
      overflow: hidden;
      padding: 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    @media (max-width: 1400px) and (min-width: 994px) {
      .img {
        height: 100px;
      }
    }
    @media (max-width: 575px) {
      .img {
        width: 33.33337%;
        height: 100px;
      }
    }
  }
`;

export const SimpleTableStyle = styled.div`
  .dev-table {
    display: table;
    width: 100%;
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 30px;

    .table-row {
      display: table-row;
    }

    .table-cell {
      display: table-cell;
      text-align: left;
      vertical-align: middle;

      font-size: 14px;
      font-weight: 500;
      color: #363636;

      padding: 0 15px 20px 15px;

      &:first-of-type {
        padding-left: 0;
      }

      &:last-of-type {
        padding-right: 0;
      }

      > .form-group {
        margin: 0;
        &.tva-devis,
        &.qte-devis {
          input {
            min-width: 70px;
          }
        }
      }
    }

    .table-header {
      display: table-header-group;
      .table-cell {
        white-space: nowrap;
        padding: 15px;
        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }
    }

    .table-body {
      display: table-row-group;
    }
  }

  @media (max-width: 768px) {
    .dev-table {
      display: block;

      .table-row {
        display: block;
        padding: 15px;
        background: white;
        box-shadow: 0 2px 41px 0 rgb(182 172 251 / 42%);
        border-radius: 15px;
        &:not(:last-of-type) {
          margin-bottom: 15px;
        }
      }

      .table-cell {
        display: block;

        padding: 15px;
        width: 100% !important;

        &:first-of-type {
          padding-left: 15px;
        }

        &:last-of-type {
          padding-right: 15px;
        }

        .m-full {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .w-full {
          width: 100%;
        }
      }

      .table-header {
        display: none;
      }

      .table-body {
        display: block;
      }
    }
  }
`;

export const InlineInputStyle = styled.div`
  display: flex;
  align-items: center;

  label {
    margin: 0 15px 0 0;
  }

  .react-date-picker {
    margin: 0;
  }
  .form-group {
    display: flex;
    align-items: center;
    min-width: 300px;
  }

  .input-full {
    width: 100%;
    .form-group {
      width: 50%;
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    label {
      margin: 0 0 15px 0;
    }
    .form-group {
      display: block;
      align-items: center;
      min-width: 300px;
      width: 100%;
    }

    .input-full {
      width: 100%;
      .form-group {
        width: 100%;
      }
    }
  }
`;

export const DashCardsStyle = styled.div`
  .row {
    & > div {
      margin-bottom: 25px;
    }
  }
  &.report-commande {
    margin-bottom: 30px;
  }
  @media (max-width: 768px) {
    .row {
      display: block;
      white-space: nowrap;
      padding-top: 30px;
      margin-top: -30px;
      overflow-x: auto;

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      > div {
        display: inline-block;
        width: 90%;
      }
    }
  }
`;
