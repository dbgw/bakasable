export const clearErrors = (state) => {
  const new_state = { ...state };
  
  for (const key in new_state) {

    if (new_state[key].error !== undefined) {
      new_state[key].error = false;
    }
    if (new_state[key].errorMessage !== undefined) {
      new_state[key].errorMessage = "";
    }
    if (new_state[key].options !== undefined && new_state[key].options.length) {
      for (let i = 0; i < new_state[key].options.length; i++) {
        new_state[key].options[i].stateChildren = clearErrors(
          new_state[key].options[i].stateChildren
        );
      }
    }
  }
  return new_state;
};

export const validFormItem = (formItem) => {
  if (!formItem.required && (!formItem.value || formItem.value.length === 0))
    return false;
  if (
    formItem.check !== undefined &&
    !formItem.check &&
    formItem.required &&
    formItem.value
  )
    return false;
  if(formItem.isNumber) return !validateItemNumber(formItem); 
  switch (formItem.type) {
    case "text":
      return !validateItemText(formItem);
    case "email":
      if (formItem.value === null || formItem.value.length === 0) return true;
      if (!validateEmail(formItem.value)) {
        formItem.errorEmail = true;
        return true;
      }
      return false;
    case "password":
    case "passwordText":
      return (
        formItem.value === null ||
        formItem.value.length === 0 ||
        !validatePassword(formItem.value)
      );
    case "number":
      return !validateItemNumber(formItem);
    case "url":
      return (
        formItem.value === null ||
        formItem.value.length === 0 ||
        !validateUrl(formItem.value)
      );
    default:
      return formItem.value === null || formItem.value.length === 0;
  }
};

export const validForm = (form) => {
  const cpForm = { ...clearForm(form) };
  let valid = true;
  const rawData = {};
  for (const key in cpForm) {
    cpForm[key].error = validFormItem(cpForm[key]);
    if (valid) valid = !cpForm[key].error;
    if (
      cpForm[key].disabled === undefined ||
      !cpForm[key].disabled ||
      cpForm[key].editable
    ) {
      rawData[cpForm[key].name] = cpForm[key].value;
    }
    if (cpForm[key].error) console.log(key);
  }
  return {
    form: cpForm,
    valid: valid,
    rawData: rawData,
  };
};

export const clearForm = (form) => {
  const cpForm = { ...form };
  for (const key in cpForm) {
   if(cpForm[key].error == undefined){
      //console.log(cpForm);
    } if (key === "email") {
      cpForm[key].errorEmail = false;
    }
    cpForm[key].error = false;
    
  }
  return cpForm;
};

export const dataType64toFile = (dataurl, filename = null) => {
  //Convert base64 to file
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (!filename) {
    filename =
      Math.random().toString(36).substring(2) +
      "." +
      mime.replace("image/", "");
  }

  let newFile = new File([u8arr], filename, {
    type: mime,
  });
  return newFile;
};

export const getFilesBase64 = (content) => {
  let files = [];
  if (content) {
    const sources = content.match(/<img [^>]*src="[^"]*"[^>]*>/gm);
    if (sources && sources.length) {
      sources.forEach((file) => {
        file = file.replace(/.*src="([^"]*)".*/, "$1");
        if (file.indexOf("base64") !== -1) {
          files.push(file);
        }
      });
    }
  }
  return files;
};

export function validateEmail(email) {
  const re = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  return re.test(email);
}

export function validatePassword(password) {
  const re = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/;
  return re.test(password);
}

export function validateUrl(url) {
  const re = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return re.test(url);
}

export function validateItemText(item) {
  if (item.value == undefined ||
    item.value == null ||
    String(item.value).length === 0 ||
    (item.match && !item.match.test(String(item.value)))
  ) {
    return false;
  }
  return true;
}

export function validateItemNumber(item) {
  if (item.size && item.size !== String(item.value).length) return false;
  if (item.min && item.value < item.min) return false;
  if (item.max && item.value > item.max) return false;
  if (!/^[0-9]+$/.test(String(item.value))) {
    return false;
  }
  return true;
}
