import { entryPoint } from "../config/entryPoint";
import { pathImage } from "../vars";
import noImage from "../assets/images/noImage.png";

const FileDownload = require("js-file-download");

export function downloadFile(url, name, callback = ()=>{}) {
  entryPoint({
    url: url,
    method: "GET",
    responseType: "blob", // Important
  }).then((response) => {
    FileDownload(response.data, name);
    callback(false);
  });
}

export function isPropValuesEqual(subject, target, propNames) {
  return propNames.every((propName) => subject[propName] === target[propName]);
}

export function getUniqueItemsByProperties(items, propNames) {
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex((foundItem) =>
        isPropValuesEqual(foundItem, item, propNames)
      )
  );
}

export function calcDevisLine(qte, unityPrice, reduction, tva) {
  const obj = {};
  obj.priceTotal = qte * unityPrice;
  obj.amountReduction = (obj.priceTotal / 100) * reduction;
  if (!obj.amountReduction) obj.amountReduction = 0;

  obj.priceTotalHt = obj.priceTotal - obj.amountReduction;
  if (!obj.priceTotalHt) obj.priceTotalHt = 0;

  obj.amountTva = (obj.priceTotalHt / 100) * tva;
  if (!obj.amountTva) obj.amountTva = 0;

  obj.priceTotalTtc = obj.priceTotalHt + obj.amountTva;
  if (!obj.priceTotalTtc) obj.priceTotalTtc = 0;
  return obj;
}

export function scrollTop(className = "has-scroll") {
  if (document.querySelector(`.${className}`))
    document.querySelector(`.${className}`).scrollTo({
      top: 0,
      behavior: "smooth",
    });
}

export function newObject(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

export function getPathImage(image) {
  if (!image) return noImage;
  return image.file
    ? URL.createObjectURL(image.file)
    : image.value
    ? pathImage + image.value
    : pathImage + image;
}

export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function copy(x) {
  return JSON.parse(JSON.stringify(x));
}

export function indexOfValue(value, array, key = 'id') {
  for (let i = 0; i < array.length; i++) {
    if (value === array[i][key]) {
      return i;
    }
  }
  return -1;
}

export function slugify(text) {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function parentCategories(data) {
  let parents = [];
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].parent) {
        let existe = false;
        for (let j = 0; j < parents.length; j++) {
          if (parents[j].id === data[i].parent.id) {
            existe = true;
          }
        }
        if (!existe) {
          parents.push(data[i].parent);
        }
      }
    }
  }
  return parents;
}

export const uniqid = () => {
  const n = Math.floor(Math.random() * 11);
  const k = Math.floor(Math.random() * 1000000);
  return String.fromCharCode(n) + k;
};

export const distanceTwoPoints = (p1, p2) => {
  if (p1.latitude && p1.longitude && p2.latitude && p2.longitude) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = p1.latitude * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = p2.latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (p2.longitude - p1.longitude) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }
  return false;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getMsgError = (error, msg = "Quelque chose s'est mal passé.") => {
  console.log(error);
  if (error?.response?.data) {
    if (error.response.data?.message) {
      msg = error.response.data.message;
    } else if (error.response.data["hydra:description"] !== undefined) {
      msg = error.response.data["hydra:description"];
    }
  }
  return msg;
};

export const trimChar = (string, charToRemove) => {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1);
  }
  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1);
  }
  return string;
};

export function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function getDigits(str, regex = /[+-]?\d+(\.\d+)?/g) {
  if (str && str.length) {
    var numb = str.match(regex);
    if (numb && numb.length) {
      return numb.join("");
    }
  }
  return;
}

export function renameKeys(obj, { suffix = "", prefix = "" }) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = prefix + key + suffix;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export function deleteKeys(obj, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] != undefined) delete obj[keys[i]];
  }
  return obj;
}

export function getFloat(val) {
  if(val==0){return val;}
  var myVal = String(val).replace(/,/g, ".");
  val = Math.round(getDigits(myVal) * 100) / 100;
  if (myVal.indexOf(".") != -1 && myVal.substr(-1, 1) == ".") {
    return val + ".";
  }
  return val;
}

export function sortObjects(objs, key, order = "asc") {
  if (order.toLowerCase() == "asc") {
    return objs.sort(function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  } else {
    return objs.sort(function (a, b) {
      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    });
  }
}

export function sortObjectsText(objs, key, order = "asc") {
  if (order.toLowerCase() == "asc") {
    return objs.sort((a, b) =>
      (a[key] || "").toString().localeCompare((b[key] || "").toString())
    );
  } else {
    return objs.sort((a, b) =>
      (b[key] || "").toString().localeCompare((a[key] || "").toString())
    );
  }
}

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()] ;
}