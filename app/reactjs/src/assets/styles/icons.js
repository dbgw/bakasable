import styled from "styled-components";
import iconHome from "../images/iconMenu/icon-home.svg";
import iconVitrine from "../images/iconMenu/icon-vitrine.svg";
import iconChat from "../images/iconMenu/icon-chat.svg";
import iconForum from "../images/iconMenu/icon-forum.svg";
import iconDocument from "../images/iconMenu/icon-document.svg";
import iconPrestations from "../images/iconMenu/icon-prestations.svg";
import iconCommandes from "../images/iconMenu/icon-commande.svg";
import iconSettings from "../images/iconMenu/icon-settings.svg";
import iconLogout from "../images/iconMenu/icon-logout.svg";
import iconAddGreen from "../images/icons/icon-add-green.svg";
import iconSortUp from "../images/icons/sort-up.svg";
import iconSortDown from "../images/icons/sort-down.svg";
import iconSort from "../images/icons/sort-icon.svg";
import iconFilter from "../images/icons/icon-filter.svg";
import iconEdit from "../images/icons/icon-edit.svg";
import iconDelete from "../images/icons/icon-delete.svg";
import iconRemove from "../images/icons/icon-remove.svg";
import iconNotice from "../images/icons/icon-notice.svg";
import iconQuestion from "../images/icons/icon-question.svg";
import iconGps from "../images/icons/icon-gps.svg";
import iconSearch from "../images/icons/icon-search.svg";
import iconBack from "../images/icons/icon-back.svg";
import iconClose from "../images/icons/icon-close.svg";
import iconDeleteClose from "../images/icons/delete-icon.svg";
import iconCheck from "../images/icons/icon-check-green.svg";
import iconSend from "../images/icons/icon-send.svg";
import iconClip from "../images/icons/icon-clip.svg";

import iconFacebook from "../images/icons/icon-facebook.svg";
import iconInstagram from "../images/icons/icon-instagram.svg";
import iconTwitter from "../images/icons/icon-twitter.svg";
import iconLinkedin from "../images/icons/icon-linkedin.svg";

import iconFacebookColor from "../images/icons/icon-facebook-color.svg";
import iconInstagramColor from "../images/icons/icon-instagram-color.svg";
import iconTwitterColor from "../images/icons/icon-twitter-color.svg";
import iconLinkedinColor from "../images/icons/icon-linkedin-color.svg";
import iconYoutubeColor from "../images/icons/icon-youtube-color.svg";
import iconAdresse from "../images/icons/icon-adresse.svg";
import iconWeb from "../images/icons/icon-web.svg";
import iconChatOrange from "../images/icons/chatIcon.svg";

// devis icons
import iconCardPeople from "../images/icons/card-people.svg";
import iconCardCheck from "../images/icons/card-check.svg";
import iconCardWaiting from "../images/icons/card-waiting.svg";
import iconStatusAccepted from "../images/icons/icon-status-accepted.svg";
import iconStatusAcceptedWhite from "../images/icons/icon-status-accepted-white.svg";
import iconStatusRejected from "../images/icons/icon-status-rejected.svg";
import iconStatusRejectedWhite from "../images/icons/icon-status-rejected-white.svg";
import iconStatusWaiting from "../images/icons/icon-status-waiting.svg";
import iconStatusWaitingWhite from "../images/icons/icon-status-waiting-white.svg";
import iconStatusNew from "../images/icons/icon-status-new.svg";
import iconStatusNewWhite from "../images/icons/icon-status-new-white.svg";

import iconCalendarWhite from "../images/icons/icon-calendar-white.svg";
import iconBtnReparateur from "../images/icons/icon-btn-reparateur.svg";
import iconBtnClient from "../images/icons/icon-btn-client.svg";

import iconAngleUp from "../images/icons/angle-up.svg";
import iconAngleDown from "../images/icons/angle-down.svg";
import iconPDF from "../images/icons/icon-pdf.svg";
import iconError from "../images/icons/icon-error.svg";

export const mixinIcon = ({ urlIcon, width, height, important = false }) => `
  width: ${width}px;
  min-width: ${width}px;
  height: ${height}px;
  background: url(${urlIcon}) ${important ? "!important" : ""};
  display: inline-block;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const HomeIcon = styled.i`
  ${mixinIcon({ urlIcon: iconHome, width: 15, height: 15 })};
`;
export const VitrineIcon = styled.i`
  ${mixinIcon({ urlIcon: iconVitrine, width: 17, height: 16 })};
`;
export const ChatIcon = styled.i`
  ${mixinIcon({ urlIcon: iconChat, width: 19, height: 14 })};
`;
export const ForumIcon = styled.i`
  ${mixinIcon({ urlIcon: iconForum, width: 17, height: 17 })};
`;
export const DocumentIcon = styled.i`
  ${mixinIcon({ urlIcon: iconDocument, width: 12, height: 16 })};
`;
export const SettingsIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSettings, width: 18, height: 18 })};
`;
export const LogoutIcon = styled.i`
  ${mixinIcon({ urlIcon: iconLogout, width: 19, height: 18 })};
`;
export const PrestationsIcon = styled.i`
  ${mixinIcon({ urlIcon: iconPrestations, width: 17, height: 17 })};
`;
export const CommandesIcon = styled.i`
  ${mixinIcon({ urlIcon: iconCommandes, width: 14, height: 14 })};
`;
export const SortUpIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSortUp, width: 8, height: 7 })};
`;
export const SortDowIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSortDown, width: 8, height: 7 })};
`;
export const SortIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSort, width: 8, height: 12 })};
`;
export const FilterIcon = styled.i`
  ${mixinIcon({ urlIcon: iconFilter, width: 14, height: 14 })};
`;
export const EditIcon = styled.i`
  ${mixinIcon({ urlIcon: iconEdit, width: 17, height: 17 })};
`;
export const DeleteIcon = styled.i`
  ${mixinIcon({ urlIcon: iconDelete, width: 15, height: 18 })};
`;
export const NoticeIcon = styled.i`
  ${mixinIcon({ urlIcon: iconNotice, width: 4, height: 13 })};
`;
export const QuestionIcon = styled.i`
  ${mixinIcon({ urlIcon: iconQuestion, width: 18, height: 18 })};
`;
export const GPSIcon = styled.i`
  ${mixinIcon({ urlIcon: iconGps, width: 17, height: 17 })};
`;
export const SearchIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSearch, width: 19, height: 19 })};
`;
export const BackIcon = styled.i`
  ${mixinIcon({ urlIcon: iconBack, width: 14, height: 12 })};
`;

export const FacebookIcon = styled.i`
  ${mixinIcon({ urlIcon: iconFacebook, width: 28, height: 28 })};
`;
export const InstagramIcon = styled.i`
  ${mixinIcon({ urlIcon: iconInstagram, width: 28, height: 28 })};
`;
export const TwitterIcon = styled.i`
  ${mixinIcon({ urlIcon: iconTwitter, width: 28, height: 28 })};
`;
export const LinkedinIcon = styled.i`
  ${mixinIcon({ urlIcon: iconLinkedin, width: 28, height: 28 })};
`;
export const FacebookColorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconFacebookColor, width: 28, height: 28 })};
`;
export const InstagramColorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconInstagramColor, width: 28, height: 28 })};
`;
export const TwitterColorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconTwitterColor, width: 28, height: 28 })};
`;
export const LinkedinColorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconLinkedinColor, width: 28, height: 28 })};
`;
export const YoutubeColorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconYoutubeColor, width: 28, height: 28 })};
`;

export const CloseIcon = styled.i`
  ${mixinIcon({ urlIcon: iconClose, width: 28, height: 28 })};
`;
export const DeleteCloseIcon = styled.i`
  ${mixinIcon({ urlIcon: iconDeleteClose, width: 15, height: 15 })};
`;
export const AdresseIcon = styled.i`
  ${mixinIcon({ urlIcon: iconAdresse, width: 13, height: 17 })};
`;
export const WebIcon = styled.i`
  ${mixinIcon({ urlIcon: iconWeb, width: 16, height: 16 })};
`;
export const CheckGreenIcon = styled.i`
  ${mixinIcon({ urlIcon: iconCheck, width: 24, height: 24 })};
`;

export const IconCalendarWhite = styled.i`
  ${mixinIcon({ urlIcon: iconCalendarWhite, width: 16, height: 16 })};
`;
export const ChatIconOrange = styled.i`
  ${mixinIcon({ urlIcon: iconChatOrange, width: 11, height: 11 })};
`;

export const AddGreenIcon = styled.i`
  ${mixinIcon({ urlIcon: iconAddGreen, width: 40, height: 40 })};
  border-radius: 50%;
  box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42);
`;

export const IconCardPeople = styled.i`
  ${mixinIcon({ urlIcon: iconCardPeople, width: 39, height: 39 })};
`;

export const IconCardCheck = styled.i`
  ${mixinIcon({ urlIcon: iconCardCheck, width: 39, height: 39 })};
`;

export const IconCardWating = styled.i`
  ${mixinIcon({ urlIcon: iconCardWaiting, width: 39, height: 39 })};
`;

export const IconStatusAccepted = styled.i`
  ${mixinIcon({ urlIcon: iconStatusAccepted, width: 15, height: 15 })};
  &.active {
    ${mixinIcon({ urlIcon: iconStatusAcceptedWhite, width: 15, height: 15 })};
  }
`;

export const IconStatusNew = styled.i`
  ${mixinIcon({ urlIcon: iconStatusNew, width: 15, height: 15 })};
  &.active {
    ${mixinIcon({ urlIcon: iconStatusNewWhite, width: 15, height: 15 })};
  }
`;

export const IconStatusRejected = styled.i`
  ${mixinIcon({ urlIcon: iconStatusRejected, width: 15, height: 15 })};
  &.active {
    ${mixinIcon({ urlIcon: iconStatusRejectedWhite, width: 15, height: 15 })};
  }
`;

export const IconStatusWaiting = styled.i`
  ${mixinIcon({ urlIcon: iconStatusWaiting, width: 15, height: 15 })};
  &.active {
    ${mixinIcon({ urlIcon: iconStatusWaitingWhite, width: 15, height: 15 })};
  }
`;

export const IconRemove = styled.i`
  ${mixinIcon({ urlIcon: iconRemove, width: 17, height: 17 })};
  cursor: pointer;
`;
export const SendIcon = styled.i`
  ${mixinIcon({ urlIcon: iconSend, width: 17, height: 17 })};
`;
export const ClipIcon = styled.i`
  ${mixinIcon({ urlIcon: iconClip, width: 23, height: 26 })};
`;
export const ReparateurIcon = styled.i`
  ${mixinIcon({ urlIcon: iconBtnReparateur, width: 28, height: 28 })};
`;
export const ClientIcon = styled.i`
  ${mixinIcon({ urlIcon: iconBtnClient, width: 27, height: 27 })};
`;
export const PDFIcon = styled.i`
  ${mixinIcon({ urlIcon: iconPDF, width: 20, height: 25 })};
`;
export const ErrorIcon = styled.i`
  ${mixinIcon({ urlIcon: iconError, width: 18, height: 18 })};
`;

export const ItemSortIcon = styled.i`
  ${mixinIcon({ urlIcon: iconAngleDown, width: 15, height: 10 })};
  &.active {
    ${mixinIcon({ urlIcon: iconAngleUp, width: 15, height: 10 })};
  }
`;
