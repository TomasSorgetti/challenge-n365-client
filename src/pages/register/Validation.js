const validate = (form, errorsState) => {
  const errors = { ...errorsState };

  // email
  if (!form.email) errors.email = "";
  else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
    errors.email = "invalid email";
  } else errors.email = "";

  //password
  if (!form.password) errors.password = "";
  else if (form.password.length < 3)
    errors.password = "must have more that 6 letters";
  else errors.password = "";

  //confirm
  if (!form.confirm) errors.confirm = "";
  else if (form.confirm !== form.password)
    errors.confirm = "Is not the same password";
  else errors.confirm = "";

  return errors;
};

export default validate;
