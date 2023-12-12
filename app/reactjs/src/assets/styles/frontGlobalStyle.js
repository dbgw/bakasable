import { Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GalerieSlideStyle, GreenColor, OrangeColor, RadioButtonForm, RangePrice } from './componentStyles';
import iconSearch from '../images/icons/icon-search-green.svg';
import { ButtonDefault, InputGroup } from './adminStyle/adminGlobalStyle';
import { SearchIcon, mixinIcon, GPSIcon } from './icons';
import { BlocTopSide, NavMenu, SideNavBar } from './adminStyle/sideNavStyle';
import iconArrowGray from '../images/icons/arrow-gray.svg';
import iconGpsBlanc from '../images/icons/icon-gps-blanc.svg';

export const BlocFilterStyle = styled.div `
	display: flex;
	align-items: center;
	width: 1130px;
	max-width: 100%;
	margin: auto;
	background: #ffffff;
	box-shadow: 0 3px 50px 0 rgba(182, 172, 251, 0.39);
	border-radius: 80.5px;
	color: #000;
	padding: 19px 0px 0px;
	text-align: left;
	position: relative;
	&.filter-universe{
		margin-bottom: 30px;
	}
	.liste-search {
		position: absolute;
		top: 48px;
		border-radius: 10px;
		background-color: #fff;
		padding: 10px 5px;
		max-height: 300px;
		overflow: scroll;
		box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
		width: calc(100% - 60px);
		z-index: 11;
		.item-search-rep-quoi {
			line-height: 20px;
			font-size: 14px;
			p {
				border-bottom: 1px solid #f5f5f5;
				padding: 5px 15px;
				margin-bottom: 0;
				font-weight: 400;
				cursor: pointer;
				transition: 0.5s all;
				&:hover,
				&.active {
					background-color: ${GreenColor};
					color: #fff;
					span {
						color: #444444;
					}
				}
				span {
					font-weight: 500;
					color: ${GreenColor};
				}
			}
			.name-result-search {
				font-size: 14px;
				line-height: 20px;
			}
			.desc-result-search {
				line-height: 17px;
			}
		}
	}
	.react-select__menu,
	.react-select__menu {
		position: absolute;
		top: 48px;
		border-radius: 10px;
		margin: 0;
		z-index: 11;
	}
	& > div {
		width: calc(100% - 47px);
		min-width: calc(25% - 47px);
		position: relative;
		padding: 0 30px;
		@media (max-width: 1199px) {
			padding: 0 25px;
		}
		&::before {
			content: "";
			position: absolute;
			top: -10px;
			left: 0;
			width: 1px;
			height: 100%;
			background-color: #eaeaec;
		}
		&:first-child,
		&:last-child {
			&::before {
				content: none;
			}
		}
		&.btn-filter-banner {
			width: auto;
			padding: 0 10px 0 0;
			min-width: 57px;
			margin-left: auto;
			position: relative;
			top: -9px;
			.btn-search-filter {
				background-color: ${GreenColor};
				border: 1px solid ${GreenColor};
				width: 47px;
				height: 47px;
				min-width: 47px;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: 0.3s all;
				margin-left: auto;
				&:hover {
					background-color: transparent;
					${SearchIcon} {
						${mixinIcon({ urlIcon: iconSearch, width: 19, height: 19 })};
					}
				}
				&:active {
					transform: scale(0.9);
				}
			}
		}
		.post-code {
			display: flex;
			align-items: center;
			.btn-gps {
				background-color: transparent;
				border: 0;
				transition: 0.3s all;
				padding: 0;
				margin-right: 10px;
				&:active {
					transform: scale(0.9);
				}
			}
			& > div {
				margin: 0;
				width: 100%;
				&.form-error {
					& > label {
						color: red;
					}
					& > .form-control {
						&::-webkit-input-placeholder {
							color: red;
							opacity: 0.6;
						}
						&::-moz-placeholder {
							color: red;
							opacity: 0.6;
						}
						&:-ms-input-placeholder {
							color: red;
							opacity: 0.6;
						}
						&:-moz-placeholder {
							color: red;
							opacity: 0.6;
						}
					}
				}
				& > label {
					font-size: 13px;
					font-weight: 600;
					margin: 0;
					position: absolute;
					top: -18px;
					left: 30px;
					z-index: 2;
					@media (max-width: 1199px) {
						left: 25px;
					}
					i {
						display: none;
					}
				}
			}
		}
		& > div {
			margin: 0;
			& > label {
				font-size: 13px;
				font-weight: 600;
				margin: 0;
				position: absolute;
				top: -15px;
				z-index: 2;
			}
		}
		.form-error {
			& > label {
				color: red;
			}
			.react-select__control {
				box-shadow: none;
				@media (max-width: 993px) {
					box-shadow: 0 0px 8px 0 rgb(255 120 109);
				}
				.react-select__value-container {
					.react-select__placeholder {
						color: rgb(255, 120, 109);
					}
				}
			}
		}
		.react-select__control {
			min-height: 20px;
			height: 36px;
			box-shadow: none;
			border-radius: 0;
			background-color: #fff;
			align-items: center;
			.react-select__value-container {
				flex-wrap: nowrap;
			}
			& > .react-select__indicators {
				& > span.react-select__indicator-separator,
				.clear-indicators {
					display: none;
				}
				& > .react-select__dropdown-indicator {
					padding: 0;
				}
			}
			& > .react-select__value-container {
				padding-left: 0;
				height: 100%;

				& > .react-select__single-value {
					margin: 0;
				}
				.react-select__multi-value {
					font-size: 14px;
					margin: 0 8px 0 0;
					max-width: 150px;
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

		${InputGroup}, .form-control {
			height: 36px;
			padding: 0;
			box-shadow: none;
			border-radius: 0;
			background-color: #fff;
			border: 0;
			font-size: 15px;
			font-weight: 400;
			text-overflow: ellipsis;
			white-space: nowrap;
			&::-webkit-input-placeholder {
				font-size: 14px;
				color: #748993;
				opacity: 1;
			}
			&::-moz-placeholder {
				font-size: 14px;
				color: #748993;
				opacity: 1;
			}
			&:-ms-input-placeholder {
				font-size: 14px;
				color: #748993;
				opacity: 1;
			}
			&:-moz-placeholder {
				font-size: 14px;
				color: #748993;
				opacity: 1;
			}
		}
	}
	@media (max-width: 993px) {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 111;
		border-radius: 0;
		display: block;
		padding: 90px 27px 10px;
		transition: 0.2s ease-in-out;
		pointer-events: ${({ open }) =>

    open ? 'auto' :
      'none'};
		opacity: ${({ open }) =>

    open ? 1 :
      0};
		overflow-y: scroll;
		&:before {
			content: "";
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 70px;
			background-color: #fff;
			z-index: 9;
		}
		.menu-burger {
			position: fixed;
			top: 27px;
			right: 27px;
			margin: 0 !important;
			z-index: 11;
		}
		.item-filter {
			width: 360px;
			max-width: 100%;
			margin: 0 auto 30px;
			padding: 0;
			&:before {
				content: none;
			}
		}
		.liste-search {
			top: 95px;
			width: 100%;
		}
		& > div {
			&.btn-filter-banner {
				position: static;
				width: 360px;
				max-width: 100%;
				margin: 0 auto 80px;
				padding: 10px 0 0;
				.btn-search-filter {
					width: 100%;
					height: 58px;
					border-radius: 26px;
					font-weight: 500;
					color: #fff;
					&:hover {
						background-color: ${GreenColor} !important;
					}
				}
			}
			.react-select__control {
				background-color: #f5f5fa;
				box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
				border-radius: 26px;
				height: 53px;
				& > .react-select__value-container {
					padding-left: 20px;
				}
				.react-select__indicators {
					& > .react-select__dropdown-indicator {
						padding: 10px;
					}
				}
			}
			.post-code {
				.btn-gps {
					position: absolute;
					right: 0;
					bottom: 5px;
					width: 43px;
					height: 43px;
					min-width: 43px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: ${GreenColor};
					${GPSIcon} {
						${mixinIcon({ urlIcon: iconGpsBlanc, width: 17, height: 17 })};
					}
				}
				& > div {
					& > label {
						position: static;
						font-size: 15px;
						line-height: 21px;
						margin-bottom: 15px;
						display: block;
					}
					.form-control {
						padding-right: 60px;
					}
				}
				@media (max-width: 993px) {
					.form-error {
						.form-control {
							box-shadow: 0 0px 8px 0 rgb(255 120 109);
						}
					}
				}
			}
			${InputGroup}, .form-control {
				background-color: #f5f5fa;
				box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
				border-radius: 26px;
				height: 53px;
				padding: 6px 20px;
			}
			& > div {
				& > label {
					position: static;
					font-size: 15px;
					line-height: 21px;
					margin-bottom: 15px;
					display: block;
				}
			}
		}
	}
`;

export const ContentPage = styled.div `
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
		z-index: 9;
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
`;
export const MainPage = styled.div `
	.menu-burger {
		background-color: transparent;
		border: 0;
		width: 26px;
		min-width: 26px;
		outline: none;
		box-shadow: none;
		padding: 0;
		margin-right: 16px;
		order: 1;
		&.is-opened {
			width: 32px;
			span {
				background-color: #8d8d8d;
				&:nth-child(1) {
					transform: translateY(8px) rotate(45deg);
				}
				&:nth-child(2) {
					opacity: 0;
				}
				&:nth-child(3) {
					transform: translateY(-6px) rotate(-45deg);
				}
			}
		}
		&:focus {
			outline: none;
			box-shadow: none;
		}
		span {
			display: block;
			width: 100%;
			margin-bottom: 5px;
			height: 2px;
			background-color: #444444;
			border-radius: 0px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.btn-toggle-filter {
		width: 361px;
		max-width: 100%;
		margin: auto;
		background: #ffffff;
		box-shadow: 0 3px 50px 0 rgb(182 172 251 / 39%);
		border-radius: 27px;
		color: #000;
		padding: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		line-height: 21px;
		font-weight: 600;
		position: relative;
		&.toggel-filter-universe{
			margin-bottom: 30px;
		}
		${SearchIcon} {
			margin-right: 14px;
			${mixinIcon({ urlIcon: iconSearch, width: 22, height: 22 })};
		}
	}
	.container {
		@media (min-width: 1240px) {
			max-width: 1280px;
		}
		@media (min-width: 1400px) {
			max-width: 1360px;
			padding: 0;
		}
		@media (max-width: 1200px) {
			max-width: 100%;
			padding: 0 26px;
		}
		@media (max-width: 575px) {
			padding: 0 18px;
		}
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

	.paginations-bloc {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 0 -15px;
		flex-wrap: wrap;
		padding-top: 10px;
		@media (max-width: 993px) {
			justify-content: center;
			padding-top: 28px;
		}
		.results-of-page {
			padding: 0 15px;
			.form-group {
				display: flex;
				align-items: baseline;
				label {
					font-size: 13px;
					margin-right: 12px;
				}
				& > div {
					min-width: 65px;
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
	&.fiche-service-page {
		${BlocFilterStyle} {
			display: flex;
			margin: 0 auto 40px;
			border: 1px solid ${GreenColor};
			@media (max-width: 993px) {
				display: block;
				margin-bottom: 0;
				${RangePrice} {
					display: block;
					.noUi-target {
						margin: 14px auto;
					}
				}
			}
		}
		@media (max-width: 993px) {
			${ContentPage} {
				& > div {
					padding-bottom: 0;
				}
			}
		}
	}
	&.fiche-prestation-page {
		.container {
			position: relative;
			.proposition-bloc {
				position: absolute;
				top: 0;
				right: 0px;
				height: 100%;
				padding: 0;
				@media (max-width: 1280px) {
					right: 15px;
				}
				@media (max-width: 993px) {
					position: static;
					padding: 0 15px;
					margin-bottom: 30px;
					display: flex;
    				flex-wrap: wrap;
				}
			}
		}
	}
	.titre-bloc-prestation {
		font-weight: 600;
		line-height: 25px;
		font-size: 18px;
		color: #37454c;
		margin-bottom: 24px;
	}
	.content-proposition {
		.form-group {
			label {
				display: flex;
				justify-content: space-between;
				span {
					min-width: 107px;
				}
			}
			.radio-button-form {
				width: 100%;
				margin-right: 0;
			}
		}
	}
`;
export const HeaderDefault = styled.div ``;
export const HeaderTop = styled.div `
	padding: 20px 0;
	@media (max-width: 1199px) {
		background: #ffffff;
		box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.14);
	}
	@media (max-width: 993px) {
		padding: 12px 0;
	}
`;
export const LogoHeader = styled.div `
	img {
		width: 150px;
	}
	@media (max-width: 1199px) {
		text-align: center;
	}
	@media (max-width: 320px) {
		img {
			width: 100px;
		}
	}
`;
export const RatingBloc = styled.div `
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 10px;
	& > span {
		&:first-child {
			margin-right: 5px;
		}
	}
	.rating-value {
		font-weight: 600;
		font-size: 16px;
		display: block;
		margin-left: 8px;
		line-height: 1;
		padding-top: 3px;
	}
`;

export const BlocMenuNav = styled.div `
	display: flex;
	justify-content: flex-end;
	align-items: center;
	${BlocTopSide} {
		background: transparent;
		box-shadow: none;
	}
	${SideNavBar} {
		.toggle-menu {
			margin-left: 16px;
			margin-right: 0;
			order: 2;
		}
	}
	${NavMenu} {
		left: auto;
		right: 0px;
		top: 57px;
		&:before {
			right: 36px;
			left: auto;
		}
	}
`;
export const LinNavkItem = styled(NavLink)
`
  display: inline-block;
  font-size: 15px;
  line-height: 21px;
  padding: 0 22px;
`;
export const MenuNav = styled.div `
	font-weight: 400;
	${LinNavkItem}, & > a {
		color: #000;
		text-decoration: none;
		transition: 0.5s all;
		&:hover,
		&.active {
			color: ${GreenColor};
		}
	}
`;

export const LoginBtns = styled.div `
	display: flex;
	align-items: center;
	padding-left: 18px;
	& > button {
		margin-left: 20px;
		font-weight: 400;
		font-size: 15px;
		line-height: 21px;
		height: 40px;
		padding: 11px 18px;
		&.light-btn {
			color: #000;
			border-color: #000;
			background-color: transparent;
			box-shadow: none;
			&:hover,
			&:focus {
				border-color: ${GreenColor};
				color: ${GreenColor};
			}
		}
	}
	@media (max-width: 1199px) {
		justify-content: flex-end;
		& > button {
			border: 0 !important;
			background-color: transparent !important;
			padding: 0;
			margin-left: 18px;
		}
	}
	@media (max-width: 320px) {
		& > button {
			margin-left: 10px;
		}
	}
`;
export const NavCategories = styled.div `background-color: ${GreenColor};`;
export const BlocMenuCats = styled.div `
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > a {
		display: inline-block;
		font-size: 15px;
		line-height: 21px;
		padding: 0 22px;
	}
	.autre-nav {
		padding-left: 10px;
		color: #fff;
		text-decoration: none;
		text-transform: uppercase;
		display: inline-block;
		position: relative;
		cursor: pointer;
		& > span {
			transition: 0.5s all;
			position: relative;
			display: block;
			padding: 17px 0px;
			&::before {
				content: "";
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				height: 5px;
				width: 0;
				background-color: #fff;
				transition: 0.5s all;
			}
		}
		&:hover,
		&.active {
			& > span {
				&::before {
					width: 100%;
				}
			}
		}
	}
	.sub-menu-nav {
		position: absolute;
		top: 120px;
		right: 0px;
		background: #ffffff;
		box-shadow: 0 3px 50px 0 rgba(182, 172, 251, 0.42);
		border-radius: 15px;
		padding: 25px 50px;
		min-height: 200px;
		opacity: 0;
		pointer-events: none;
		transition: 0.2s all;
		&.open {
			top: 62px;
			opacity: 1;
			z-index: 111;
			pointer-events: all;
		}
		${LinNavkItem}, a {
			color: #000;
			padding: 0;
			white-space: nowrap;
			display: block;
			& > span {
				padding: 10px 0;
				display: inline-block;
			}
			&.active {
				color: ${GreenColor};
				font-weight: 700;
				span {
					&::before {
						width: 100%;
						background-color: ${GreenColor};
					}
				}
			}
			&:hover {
				color: ${GreenColor};
				span {
					&::before {
						width: 100%;
						background-color: ${GreenColor};
					}
				}
			}
		}
	}
	${LinNavkItem}, a {
		color: #fff;
		text-decoration: none;
		text-transform: uppercase;
		padding: 0 10px;
		position: relative;
		&:first-child {
			padding-left: 0;
		}
		span {
			transition: 0.5s all;
			position: relative;
			display: block;
			padding: 17px 0px;
			&::before {
				content: "";
				position: absolute;
				bottom: -1px;
				left: 50%;
				transform: translateX(-50%);
				height: 5px;
				width: 0;
				background-color: #fff;
				transition: 0.5s all;
			}
		}
		&.active {
			font-weight: 700;
			span {
				&::before {
					width: 100%;
				}
			}
		}
		&:hover {
			span {
				&::before {
					width: 100%;
				}
			}
		}
	}
`;

export const MenuMobile = styled.div `
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 11111;
	padding: 20px 0px 15px;
	pointer-events: ${({ open }) =>

    open ? 'auto' :
      'none'};
	opacity: ${({ open }) =>

    open ? 1 :
      0};
	transition: 0.3s all;
	.head-menu-mobile {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 25px 15px;
		background-color: #fff;

		.logo-mobile {
			margin-right: auto;
			img {
				height: 48px;
			}
		}
		.menu-burger {
			margin-right: 0;
		}
	}
	.content-menu {
		overflow-y: scroll;
		height: calc(100% - 70px);
		padding: 0 25px;
	}
	&.nav-dashboard{
		&.menu-dashboard-open{
			.nav-menu{
				opacity: 1;
				pointer-events: all;
				position: static;
				z-index: 1;
				height: auto;
			}
		}
		.content-menu{
			padding: 0;
		}
		.nav-menu{
			padding-top: 10px;
			a{
				padding: 10px 30px;
				margin-bottom: 0;
			}
			.logout-bloc{
				padding-top: 10px;
				margin-top: 10px;
			}
		}
	}
	${NavCategories} {
		background-color: transparent;
		.container {
			padding: 0;
		}
	}
	${BlocMenuCats} {
		display: block;
		border-bottom: 1px solid #e1e1e1;
		padding-bottom: 5px;
		margin-bottom: 15px;
		@media (max-width: 993px) {
			padding-bottom: 15px;
		}
		${LinNavkItem}, a {
			color: #000;
			display: block;
			padding: 0;
			&.active {
				color: ${GreenColor};
			}
			span {
				padding: 10px 0;
				&::before {
					content: none;
				}
			}
		}
		.autre-nav {
			padding: 0;
			color: #000;
			width: 100%;
			&:before {
				content: "";
				position: absolute;
				top: 20px;
				right: 20px;
				${mixinIcon({ urlIcon: iconArrowGray, width: 12, height: 6 })};
				transform-origin: center;
				transition: 0.4s all;
			}
			&.active {
				&:before {
					transform: rotate(-180deg);
				}
			}
			& > span {
				padding: 10px 0;
				&:before {
					content: none;
				}
			}
		}
		.sub-menu-nav {
			position: static;
			box-shadow: none;
			border-radius: 0px;
			padding: 0px 15px;
			min-height: initial;
			height: auto;
			max-height: 0;
			overflow: hidden;
			transition: 0.4s all;
			&.open {
				max-height: 1000px;
			}
		}
	}
	${MenuNav} {
		a {
			display: block;
			padding: 10px 0;
		}
	}
`;

export const BackStyle = styled(Link)
`
  display: inline-flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 22px;
  &:hover {
    color: ${GreenColor};
    text-decoration: none;
  }
  i {
    margin-right: 6px;
  }
  @media (max-width: 993px) {
    margin-bottom: 30px;
  }
`;
export const PageBanner = styled.div `
	background-position: center;
	background-size: cover;
	padding: 90px 0 30px;
	text-align: center;
	color: #fff;
	position: relative;
	&.banner-page-universe{
		padding: 50px 0;
		& > .container {
			display: flex;
			align-items: center;
			min-height: 290px;

			${BackStyle}{
				position: absolute;
				bottom: -30px;
				left: 0;
				margin-bottom: 0;
				color: #fff;
				&:hover{
					color: ${GreenColor};
				}
				@media(max-width: 1280px){
					left: 15px;
				}
				@media(max-width: 1280px){
					left: 15px;
				}
				@media(max-width: 1200px){
					left: 26px;
				}
				@media(max-width: 575px){
					left: 18px;
				}
			}
		}
		.bloc-title-banner{
			margin-bottom: 0px;
			.title-banner-cat{
				text-transform: uppercase;
			}
		}
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #000;
		opacity: .2;
		pointer-events: none;
		z-index: 1;
	}
	& > .container {
		position: relative;
		z-index: 9;
	}
	&.home-page-banner {
		padding: 90px 0 30px;
		position: relative;
		height: 474px;
		& > .container {
			height: 100%;
			display: flex;
			flex-wrap: wrap;
		}
		.slider-home-banner {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			.slick-next {
				right: 15px;
			}
			.slick-prev {
				left: 15px;
				z-index: 1;
			}
			div {
				height: 100%;
			}
			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
		.bloc-title-banner {
			text-align: right;
			width: 1130px;
			max-width: 100%;
			margin-bottom: 32px;
		}
		.title-banner-cat {
			color: #fff;
			width: 54%;
			padding-bottom: 66px;
			line-height: 55px;
			font-weight: 500;
			position: relative;
			z-index: 1;
			margin-right: 0;
			text-align: left;
		}
		@media (max-width: 993px) {
			height: auto;
			padding: 60px 0 35px;
			.bloc-title-banner {
				margin: 0 auto 32px;
			}
			.title-banner-cat {
				width: 85%;
				line-height: 44px;
			}
			& > .container {
				display: block;
			}
			.title-banner-cat {
				width: 100%;
				font-size: 26px;
				line-height: 37px;
				padding-bottom: 32px;
				text-align: center;
			}
		}
	}
	.bloc-title-banner {
		margin: 0 auto 80px;
		font-size: 16px;
		line-height: 23px;
	}
	.title-banner-cat {
		font-size: 50px;
		line-height: 71px;
		font-weight: 700;
		width: 80%;
		max-width: 100%;
		margin: 0 auto 0.5rem;
	}
	.description-banner-cat {
		width: 562px;
		max-width: 100%;
		margin: auto;
	}
	&.default-banner {
		padding: 120px 0;
		.bloc-title-banner,
		.title-banner-cat {
			margin-bottom: 0;
			width: 100%;
		}
	}
	@media (max-width: 993px) {
		padding: 60px 0 35px;
		&.default-banner {
			padding: 90px 0;
		}
		.bloc-title-banner {
			margin: 0 auto 45px;
			width: 100%;
		}
		.title-banner-cat {
			font-size: 35px;
			line-height: 41px;
			margin-bottom: 16px;
		}
	}
	@media (max-width: 767px) {
		.title-banner-cat {
			width: 100%;
		}
	}
`;

export const ContentPageStyle = styled.div `
	padding: 45px 0;
	@media (max-width: 993px) {
		padding: 30px 0;
	}
	.contact-formulaire {
		& > span {
			margin-bottom: 20px;
			display: block;
		}
	}
	&.content-wysiwig{
		line-height: 24px;
		h2 {
			font-size: 28px;
			line-height: 32px;
			margin-bottom: 30px;
		}
		h3{
			padding-left: 35px;
			font-size: 24px;
			line-height: 28px;
			margin-bottom: 30px;
		}
		h4{
			padding-left: 50px;
			font-size: 20px;
			line-height: 26px;
			margin-bottom: 30px;
		}
		h5{
			padding-left: 50px;
			font-size: 20px;
			line-height: 26px;
			margin-bottom: 30px;
		}
		ul{
			li{
				margin-bottom: 10px;
			}
		}
		.bloc-content-read-more{
			
		}
		a{
			white-space: pre-wrap;
    		word-break: break-word;
		}
		.cadre-black{
			p{
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
		.content-read-more{
			background-color: #f6f6f6;
    		padding: 20px 24px;
			margin-bottom: 15px;
			p{
				&:last-child{
					margin-bottom: 0;
				}
			}
			h3, h4, h5{
				padding-left: 0;
			}
		}
	}
`;
export const BreadcrumbStyle = styled.div `
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 28px;
	a {
		color: #000;
		text-decoration: none;
		transition: 0.3s all;
		&:hover {
			color: ${GreenColor};
		}
	}
	i {
		font-style: inherit;
		color: ${GreenColor};
		display: inline-block;
		margin: 0 10px;
	}
	span {
		opacity: 0.6;
	}
`;
export const ListProductStyle = styled.div `
	.title-bloc-products {
		color: #444444;
		font-size: 24px;
		line-height: 33px;
		margin-bottom: 35px;
	}
	& > .row {
		position: relative;
	}
`;
export const ProduititemStyle = styled(Col)
`
  margin-bottom: 30px;
  .content-item-produit {
    background: #ffffff;
    box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
    border-radius: 20px;
    overflow: hidden;
    height: 100%;
    a {
      text-decoration: none;
    }
  }
  .img-produit {
    height: 180px;
    a {
      display: block;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .detail-produit {
    padding: 24px 26px 60px;
    text-align: center;
    position: relative;
    height: calc(100% - 180px);
  }
  .name-produit {
    font-size: 18px;
    line-height: 25px;
    font-weight: 600;
    margin-bottom: 15px;
    a {
      color: #e67c2e;
    }
  }
  .desc-produit {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 22px;
  }
  .cats-prestation {
    display: flex;
    align-items: baseline;
    font-size: 14px;
    margin-bottom: 15px;
    & > span {
      margin-right: 5px;
      white-space: nowrap;
    }
    .item-cats-prestation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 12px;
      p {
        font-weight: 500;
        color: #fff;
        background-color: ${GreenColor};
        margin-bottom: 5px;
        margin-right: 8px;
        padding: 2px 5px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .disabled-link{
	cursor: default;
  }
  .url-btn-produit {
    position: absolute;
    bottom: 24px;
    left: 26px;
    right: 26px;
    ${ButtonDefault} {
      width: 100%;
      font-size: 15px;
      padding: 6px 20px;
      height: 37px;
      font-weight: 600;
    }
  }
  @media (max-width: 993px) {
    margin-bottom: 20px;
  }
`;

export const FooterStyle = styled.div `
	background-color: #465A61;
	padding: 50px 0 30px;
	font-size: 15px;
	line-height: 22px;
	a {
		color: #fff;
		text-decoration: none;
		transition: 0.4s all;
		&:hover {
			color: #444444;
		}
	}
	.menu-footer {
		.title-menu-footer {
			font-weight: 600;
			margin-bottom: 15px;
			color: #fff;
			text-transform: uppercase;
		}
		ul {
			list-style: none;
			padding: 0;
			font-weight: 500;
			li {
				margin-bottom: 15px;
			}
		}
	}
	.socials {
		a {
			margin-right: 13px;
			display: inline-block;
			margin-bottom: 8px;
			transition: 0.4s all;
			transform-origin: center;
			&:hover {
				transform: scale(1.2);
			}
		}
	}
	@media (max-width: 1199px) {
		padding: 45px 0 30px;
		text-align: center;
		.container {
			width: 900px;
			& > .row {
				& > div {
					margin-bottom: 30px;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
	@media (max-width: 767px) {
		.container {
			& > .row {
				& > div {
					& > .row {
						& > div {
							margin-bottom: 35px;
							&:last-child {
								margin-bottom: 5px;
							}
						}
					}
				}
			}
		}
	}
`;
export const ListFichePrestation = styled.div `
	.head-list-content {
		display: flex;
		align-items: flex-end;
		margin-top: -15px;
		margin-bottom: 33px;
		.title-bloc-products {
			font-size: 24px;
			line-height: 33px;
			color: #444444;
			margin: 0;
		}
		.form-group {
			margin-left: auto;
			min-width: 287px;
			margin-bottom: 0px;
			margin-top: -28px;
			& > label {
				white-space: nowrap;
			}
			& > .react-select__container {
				width: 100%;
			}
		}
	}
	.bloc-lists-prstation-items {
		height: 100vh;
		& > div {
			height: 100%;
			padding: 15px 15px 0;
		}
		.bloc-map-list {
			& > div {
				overflow: hidden;
			}
		}
	}
	.content-lists-prstation-items {
		height: 100%;
		overflow-y: scroll;
	}
	.item-map-prestation {
		transition: 0.3s all;
		font-size: 16px !important;
		&.active {
			background-color: ${GreenColor} !important;
			color: #fff !important;
		}
		@media (min-width: 1200px) {
			&:hover {
				background-color: ${GreenColor} !important;
				color: #fff !important;
			}
		}
	}
	@media (max-width: 993px) {
		.head-list-content {
			margin-top: 35px;
			.form-group {
				margin-top: 0;
				label {
					display: none;
				}
			}
		}
		.bloc-lists-prstation-items {
			height: auto;
			position: relative;
			margin: 0 -18px;
			.bloc-map-list {
				height: 350px;
				padding: 15px 0 0;
			}

			.content-lists-prstation-items {
				height: auto;
				overflow-y: initial;
				z-index: 1;
				padding: 10px 0 20px;
				order: 2;
				.loading-table {
					width: 100%;
					display: inline-block;
					position: absolute;
					top: -5px;
					text-align: center;
					font-size: 18px;
					font-weight: 600;
				}
				.slick-track, .slick-list {
					display: flex;
				}
				.slick-slide {
					width: 314px;
					padding: 20px 10px 10px;
					& > div{
						height: 100%;
						& > div{
							height: 100%;
						}
					}
				}
			}
		}
	}
	@media (max-width: 767px) {
		.head-list-content {
			flex-wrap: wrap;
			justify-content: center;
			margin-bottom: 25px;
			.title-bloc-products {
				width: 100%;
				margin-bottom: 20px;
				text-align: center;
			}
			.form-group {
				margin: auto;
			}
		}
		.bloc-lists-prstation-items {
			.bloc-map-list {
				height: 250px;
			}
		}
	}
`;
export const ItemFichePrestation = styled.div `
	background: #ffffff;
	box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
	border-radius: 10px;
	margin-bottom: 20px;
	padding: 33px 24px;
	transition: 0.5s ease-in-out;
	&:hover {
		.show-prestation{
			text-decoration: underline;
		}
	}
	&.activeItem {
		cursor: pointer;
	}
	&.active {
		transform: scale(1.05);
		background-color: ${GreenColor};
		color: #fff;
		&:hover {
			.show-prestation{
				text-decoration: underline;
			}
		}
		.code-postal-societe {
			color: #fff;
		}
		.show-prestation{
			color: #FFF;
		}
		.type-prestation {
			.devis-prestation {
				color: #fff;
			}
		}
		.name-societe {
			a {
				color: #fff;
				&:hover {
					color: #fff;
				}
			}
		}
	}
	.content-item-fiche {
		display: flex;
		align-items: center;
	}
	.logo-image {
		overflow: hidden;
		min-width: 75px;
		width: 75px;
		height: 75px;
		margin-right: 26px;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.detail-item-fiche {
		margin-right: 22px;
	}
	.type-prestation {
		margin-left: auto;
	}
	.name-societe {
		font-size: 18px;
		font-weight: 600;
		line-height: 25px;
		margin-bottom: 8px;
		a {
			color: #000;
			text-decoration: none;
			transition: 0.5s ease-in-out;
			position: relative;
			&:before {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				height: 1px;
				width: 0;
				background: #fff;
				transition: 0.3s all;
				z-index: -1;
			}
		}
	}
	.code-postal-societe {
		display: block;
		font-size: 14px;
		line-height: 20px;
		color: #4c5f68;
		margin-bottom: 3px;
		transition: 0.5s ease-in-out;
	}
	.lists-mode-delivrance {
		font-size: 15px;
		line-height: 23px;
		span {
			display: inline;
			&:after {
				content: ",";
				position: relative;
				margin-right: 4px;
				display: inline-block;
			}
			&:last-child {
				&:after {
					content: none;
				}
			}
		}
	}
	.show-prestation{
		color: ${GreenColor};
		display: block;
		padding-top: 15px;
		text-decoration: none;
		font-weight: 500;
		font-size: 14px;
		&:hover{
			text-decoration: underline;
		}
	}
	.type-prestation {
		text-align: center;
		p {
			margin: 0;
		}
		.price-prestation {
			white-space: nowrap;
			font-size: 14px;
			line-height: 20px;
			span {
				display: block;
				font-weight: 700;
				font-size: 19px;
				line-height: 27px;
				margin-top: 8px;
			}
		}
		.devis-prestation {
			font-size: 16px;
			white-space: nowrap;
			color: ${GreenColor};
			font-weight: 600;
		}
	}
	@media (max-width: 993px) {
		width: 100%;
		padding: 22px 18px 60px 18px;
		margin-bottom: 0;
		position: relative;
		.content-item-fiche {
			flex-wrap: wrap;
			align-items: flex-start;
		}
		.head-fiche-mobile {
			display: flex;
			margin-bottom: 15px;
		}
		.logo-image {
			margin-right: 17px;
			& > a{
				display: block;
				height: 100%;
			}
		}
		.service-rating-bloc {
			margin-top: 0 !important;
			padding-top: 5px;
			& > div {
				margin-bottom: 0 !important;
			}
		}
		.detail-item-fiche {
			margin-right: 0px;
			width: 100%;

		}
		.type-prestation {
			text-align: left;
			margin-top: 5px;
			.price-prestation{
				span{
					display: inline-block;
					font-size: 17px;
					line-height: 23px;
					margin-top: 0;
					margin-left: 4px;
				}
			}
		}
		.content-detail-fiche-mobil{
			margin-bottom: 15px;
		}
		.go-item-fiche {
			width: 100%;
			padding: 13px 18px 0;
			border-top: 1px solid #efefef;
			position: absolute;
			left: 0;
			bottom: 14px;
			text-align: right;
			& > a{
				padding-top: 0;
			}
		}
		.name-societe {
			font-size: 16px;
			line-height: 23px;
			margin-bottom: 0px;
		}
	}
	.service-rating-bloc {
		margin-top: -20px;
	}
`;

export const ContentFichePrestation = styled.div `
	padding-right: 15px;
	.logo-societe {
		overflow: hidden;
		min-width: 180px;
		width: 180px;
		margin-left: auto;
		order: 2;
		img {
			width: 100%;
			border-radius: 12px;
		}
	}
	
	.info-societe {
		display: flex;
		padding-top: 30px;
		flex-wrap: wrap;
		
		.detail-info-societe {
			padding-right: 20px;
			order: 1;
			.titre-fiche-prestation {
				font-weight: 500;
				font-size: 30px;
				line-height: 36px;
				color: #444444;
				margin-bottom: 15px;
			}
			.name-societe {
				text-transform: uppercase;
				font-weight: 600;
				font-size: 25px;
				line-height: 25px;
				margin-bottom: 10px;
			}
			.fonction-societe {
				font-size: 16px;
				line-height: 23px;
				color: #4c5f68;
				margin-bottom: 30px;
			}
		}
	}
	.description-societe {
		white-space: pre-line;
		font-size: 15px;
		line-height: 21px;
		text-align: justify;
		margin-bottom: 40px;
		margin-top: 45px;
		@media (max-width: 1199px) {
			.description-societe {
				margin-top: 30px;
			}
		}
	}
	${GalerieSlideStyle} {
		.item-realisation {
			margin-bottom: 20px;
			height: 130px;
			@media (min-width: 994px) {
				width: 25%;
			}
			@media (max-width: 993px) {
				margin-bottom: 10px;
			}
			img {
				border-radius: 15px;
				cursor: pointer;
			}
		}
	}
	.cats-prestation {
		display: flex;
		align-items: baseline;
		font-size: 14px;
		margin: 20px 0 15px;
		& > span {
			margin-right: 18px;
			white-space: nowrap;
			font-weight: 600;
			line-height: 25px;
			font-size: 18px;
			color: #37454c;
			margin-bottom: 24px;
		}
		.item-cats-prestation {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 16px;
			line-height: 23px;
			p {
				font-weight: 500;
				color: #fff;
				background-color: ${GreenColor};
				margin-bottom: 5px;
				margin-right: 8px;
				padding: 3px 12px;
				border-radius: 2px;
				&:last-child {
					margin-right: 0px;
				}
			}
		}
	}
	.info-societe-web {
		padding-bottom: 21px;
		p {
			display: flex;
			align-items: center;
			margin-bottom: 19px;
			font-size: 15px;
			line-height: 21px;
		}
		i {
			min-width: 25px;
		}
		a {
			color: #000;
			text-decoration: none;
			transition: 0.5s ease-in-out;
			display: flex;
			&:hover {
				color: ${GreenColor};
				text-decoration: underline;
			}
		}
	}
	.socials-societe {
		a {
			display: inline-block;
			margin-right: 13px;
			transition: 0.3s all;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
	@media (max-width: 1280px) {
		padding-right: 60px;
	}
	@media (max-width: 1199px) {
		padding-right: 30px;
		.info-societe {
			.detail-info-societe {
				.titre-fiche-prestation {
					font-size: 28px;
					line-height: 39px;
				}
				.name-societe {
					font-size: 20px;
					line-height: 28px;
					margin-bottom: 3px;
				}
				.fonction-societe {
					font-size: 15px;
					line-height: 21px;
				}
			}
		}
	}
	@media (max-width: 993px) {
		padding-right: 0;
		order: 2;
		.logo-societe{
			margin-left: 0;
			min-width: auto;
			width: 100%;
		}
		.info-societe {
			.detail-info-societe {
				.fonction-societe {
					margin-bottom: 10px;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.info-societe {
			.detail-info-societe {
				.titre-fiche-prestation {
					margin-bottom: 20px;
				}
			}
		}
		.cats-prestation {
			display: block;
			margin-bottom: 30px;
			& > span {
				display: block;
				margin-bottom: 17px;
			}
		}
		.bloc-more {
			.titre-bloc-prestation {
				margin-bottom: 10px;
			}
		}
		.info-societe-web {
			p {
				margin-bottom: 10px;
			}
		}
	}
`;
export const PropositionStyle = styled.div `
	position: sticky;
	top: 20px;
	background: #ffffff;
	box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
	border-radius: 10.56px;
	padding: 40px 42px 46px;
	&.payement-proposition{
		.logo-societe{
			display: none;
		}
	}
	.bloc-titre-fiche{
		margin-bottom: 25px;
		.titre-proposition {
			margin-bottom: 10px
		}
		.titre-fiche-prestation{
			font-weight: 600;
			font-size: 18px;
			line-height: 21px;
			margin-bottom: 0px
		}
	}
	.titre-proposition {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 22px;
		color: ${GreenColor};
		letter-spacing: -1px;
	}

	${RadioButtonForm} {
		& > label {
			font-size: 18px;
			line-height: 25px;
			font-weight: 500;
			margin-bottom: 20px;
		}
		.bloc-radios-button {
			display: block;
			padding-bottom: 11px;
			.radio-button-form {
				margin-bottom: 14px;
			}
		}
	}
	.bloc-price-devis {
		padding: 25px 0;
		border-top: 1px solid #e4e4e4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 22px;
		line-height: 31px;
		font-weight: 500;
		.titre-price {
			color: ${GreenColor};
			padding-right: 20px;
			padding-bottom: 10px;
		}
		.price-devis {
			color: #3f474b;
			margin-left: auto;
			display: block;
			font-weight: 600;
			padding-bottom: 10px;
		}
	}
	.bloc-precision {
		font-size: 15px;
		margin-bottom: 25px;
		.titre-precision {
			font-size: 16px;
			line-height: 20px;
			font-weight: 500;
			margin-bottom: 10px;
		}
	}
	${ButtonDefault} {
		font-size: 16px;
		width: 100%;
		box-shadow: none;
		font-weight: 600;
	}
	@media (max-width: 993px) {
		width: 600px;
		max-width: 100%;
		order: 1;
    	margin-bottom: 20px;
		position: static;
	}
	@media (max-width: 575px) {
		padding: 32px 26px;
		.titre-proposition {
			font-size: 20px;
		}
		.radio-button-form {
			& > span {
				text-align: right;
				min-width: 98px !important;
				width: 98px !important;
				padding-left: 10px;
			}
		}
		.content-proposition {
			.form-group {
				label {
					font-size: 15px;
					span {
						white-space: nowrap;
						padding-left: 15px;
						text-align: right;
					}
				}
			}
		}
	}
`;

export const CookiesBlocs = styled.div `
	.CookieConsent {
		background: #fff !important;
		color: #000 !important;
		box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42);
		justify-content: center !important;
		padding: 10px 0;
		& > div {
			&:not(.content-cookies) {
				display: flex;
			}
		}
		.content-cookies {
			margin: 15px !important;
			flex: initial !important;
			text-align: center;
			font-size: 14px;
		}
	}
	#rcc-confirm-button {
		background-color: ${GreenColor} !important;
		box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42) !important;
		border-radius: 20px !important;
		color: #fff !important;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		border: 1px solid ${GreenColor} !important;
		padding: 11px 20px !important;
		outline: none;
		font-size: 14px !important;
		height: 45px !important;
		display: flex;
		min-width: 140px;
		align-items: center;
		justify-content: center;
		margin: 0 15px !important;
		transition: 0.3s all;
		&:hover {
			background-color: transparent !important;
			color: ${GreenColor} !important;
		}
	}
	#rcc-decline-button {
		background-color: transparent !important;
		box-shadow: 3px 3px 20px 0 rgba(182, 172, 251, 0.42) !important;
		border-radius: 20px !important;
		color: #c12a2a !important;
		font-family: "Poppins", sans-serif;
		font-weight: 600;
		border: 1px solid #c12a2a !important;
		padding: 11px 20px !important;
		outline: none;
		font-size: 14px !important;
		height: 45px !important;
		display: flex;
		min-width: 140px;
		align-items: center;
		justify-content: center;
		transition: 0.3s all;
		margin: 0 10px !important;
		&:hover {
			background-color: #c12a2a !important;
			color: #fff !important;
		}
	}
`;

export const HomeReparateur = styled.div `
	.title-bloc {
		font-size: 31px;
		line-height: 40px;
		text-align: center;
		margin: 30px 0 60px;
		font-weight: 500;
		color: #444444;
		@media (max-width: 767px) {
			font-size: 23px;
			line-height: 36px;
		}
	}
	.item-reparateurs-solution {
		margin-bottom: 30px;
		padding-top: 43px;
		.content-reparateur-solution {
			background: #ffffff;
			box-shadow: 0 2px 41px 0 rgba(182, 172, 251, 0.42);
			padding: 60px 26px 30px;
			border-radius: 14px;
			height: 100%;
			display: flex;
			justify-content: center;
			color: #748993;
			font-size: 16px;
			line-height: 22px;
			.titre-item-repa-solution {
				font-weight: 600;
				font-size: 18px;
				margin-bottom: 8px;
			}
			p {
				margin: 0;
				text-align: center;
			}
		}
		.bloc-icon-repa {
			position: absolute;
			top: 0;
			height: 83px;
			width: 83px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: #fff;
		}
		img {
			height: 83px;
		}
	}
`;

export const HomeBlocs = styled.div `
	padding: 80px 0 40px;
	.row {
		align-items: center;
		padding-bottom: 60px;
		&:last-child {
			padding-bottom: 0;
		}
		&:nth-child(2n + 2) {
			.image-content-bloc {
				padding: 0 0 0 22px;
				&:before {
					right: 22px;
					left: 0px;
				}
			}
		}
	}
	.item-content-bloc {
		margin-bottom: 30px;
		color: #748993;
		.titre-content-bloc {
			font-size: 50px;
			font-weight: 500;
			line-height: 64px;
			color: #9aca3b;
			margin-bottom: 22px;
		}
		.sub-titre-content-bloc {
			color: #444444;
			font-size: 24px;
			line-height: 36px;
		}
		.text-content-bloc {
			margin-bottom: 30px;
		}
		p {
			&:last-child {
				margin-bottom: 0;
			}
		}
		a {
			text-decoration: none;
			display: inline-block;
			button {
				width: 310px;
				max-width: 100%;
				font-size: 16px;
				border-radius: 30px;
				height: 58px;
				@media (max-width: 320px) {
					font-size: 14px;
					height: 50px;
				}
			}
		}

		@media (max-width: 1199px) {
			.titre-content-bloc {
				font-size: 39px;
				line-height: 59px;
			}
		}
		@media (max-width: 993px) {
			text-align: center;
			.titre-content-bloc {
				font-size: 31px;
				line-height: 44px;
			}
			.sub-titre-content-bloc {
				font-size: 19px;
				line-height: 28px;
			}
		}
		@media (max-width: 575px) {
			text-align: left;
			a {
				width: 100%;
				button {
					width: 100%;
				}
			}
		}
	}

	.image-content-bloc {
		max-width: 100%;
		width: 490px;
		position: relative;
		display: block;
		margin: 0 auto 30px;
		padding: 0 22px 0 0;
		img {
			width: 100%;
		}
		&:before {
			content: "";
			position: absolute;
			top: -30px;
			right: 0px;
			left: 22px;
			height: 100%;
			background: #a8d8d4;
			z-index: -1;
		}
	}
	.item-cat-univers {
		margin-bottom: 30px;
		.content-item-univers {
			background: #ffffff;
			box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
			border-radius: 20px;
			overflow: hidden;
			height: 100%;
			font-size: 18px;
			line-height: 25px;
			font-weight: 600;
			margin-bottom: 0px;
			color: #444444;
			text-decoration: none;
			text-align: center;
			display: block;
			transition: 0.4s all;
			text-transform: uppercase;
			&:hover {
				text-decoration: none;
				color: ${OrangeColor};
			}
			img {
				width: 100%;
				height: 240px;
				object-fit: cover;
				margin-bottom: 15px;
			}
		}
	}
`;

export const DefaultPageStyle = styled.div `
	font-size: 15px;
	line-height: 21px;
	ul,
	ol {
		margin-bottom: 20px;
	}
	p {
		margin-bottom: 25px;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: #444444;
		font-weight: 700;
	}
	h2 {
		margin-bottom: 20px;
		padding-top: 10px;
	}
	a {
		color: ${GreenColor};
	}
`;
export const ReadMoreBtn = styled.button`
	background-color: transparent;
    position: relative;
    border: 0;
    color: #e67c2e;
    font-size: 16px;
    padding: 0;
    font-weight: 700;
    margin-bottom: 20px;
	display: flex;
	&:after{
		content: "";
		position: relative;
		padding: 5px;
		box-shadow: 2px -2px #e67c2e inset;
		border: solid transparent;
		transition: 0.2s;
		transform: rotate(135deg);
		transform-origin: center;
		top: 4px;
		left: 10px;
	}
	&.open{
		&:after{
			transform: rotate(-45deg);
			top: 0px;
		}
	}
`;