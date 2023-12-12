import { lazy } from "react";

export const Input = lazy(() => import("./ui-elements/input"));
export const WysiwygEditor = lazy(() => import("./ui-elements/wysiwygEditor"));
export const ButtonDef = lazy(() => import("./ui-elements/buttonDef"));
export const TableDef = lazy(() => import("./ui-elements/tableau"));
export const DropDown = lazy(() => import("./ui-elements/dropDown"));
export const Checkbox = lazy(() => import("./ui-elements/checkBox"));
export const SingleCheckbox = lazy(() => import("./ui-elements/singleCheckBox"));
