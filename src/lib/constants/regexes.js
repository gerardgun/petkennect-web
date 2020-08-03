{/* eslint-disable max-len, no-useless-escape */}
const regexes = {
  phone: /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){9}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/,
  uid  : /^([a-zA-Z0-9]{3,}-?){3,}$/
}
{/* eslint-enable max-len, no-useless-escape */}

export default regexes
