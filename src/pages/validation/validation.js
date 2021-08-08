export const usernameValidation = ( username ) =>
{
  let regexUser = '^(?=.{6,20}$)(?![_.])(?!.*[_.]{3})[a-zA-Z0-9._]+(?<![_.-?]])$'
  if (
    username.replace(/[^a-z]/gi, '').length === 0 ||
    !username.match(regexUser)
  )
    return false
    // [
    //   'Username cannot be empty',
    //   'Username is 6-20 characters',
    //   'Only contains alphanumeric characters, and . or _',
    //   'Username has to have at least one alphabetic character',
    // ]

  return true
}

export const emailValidation = ( email ) =>
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

export const passwordValidation = ( p ) =>
{
// Password should contains one Capital letter
// It should be alphanumeric.
// Length of password should be between range 6 to 14
  return /[A-Z]/.test(p) && /[0-9]/.test(p) && /^[A-Za-z0-9]{6,13}$/.test(p)
}
