// import {Op} from 'sequelize';

export function cleanNumber(query) {
  query += "";
  return query.replace(/([+.\s_\-()]+)/g, '')
}

export function unaccent(str) {
  let mark = ['ă', 'â', 'ê', 'ô', 'ư', 'ơ', 'Ă', 'Â', 'Ê', 'Ô', 'Ư', 'Ơ', 'đ', 'Đ', 'à', 'á', 'ả', 'ã', 'ạ', 'À', 'Á', 'Ả', 'Ã', 'Ạ', 'â', 'ầ', 'ấ', 'ẩ', 'ẫ', 'ậ', 'Â', 'Ầ', 'Ấ', 'Ẩ', 'Ẫ', 'Ậ', 'ă', 'ằ', 'ắ', 'ẳ', 'ẵ', 'ặ', 'Ă', 'Ằ', 'Ắ', 'Ẳ', 'Ẵ', 'Ặ', 'đ', 'Đ', 'ê', 'ề', 'ế', 'ể', 'ễ', 'ệ', 'Ê', 'Ề', 'Ế', 'Ể', 'Ễ', 'Ệ', 'ì', 'í', 'ỉ', 'ĩ', 'ị', 'Ì', 'Í', 'Ỉ', 'Ĩ', 'Ị', 'ò', 'ó', 'ỏ', 'õ', 'ọ', 'Ò', 'Ó', 'Ỏ', 'Õ', 'Ọ', 'ô', 'ồ', 'ố', 'ổ', 'ỗ', 'ộ', 'Ô', 'Ồ', 'Ố', 'Ổ', 'Ỗ', 'Ộ', 'ơ', 'ờ', 'ớ', 'ở', 'ỡ', 'ợ', 'Ơ', 'Ờ', 'Ớ', 'Ở', 'Ỡ', 'Ợ', 'ù', 'ú', 'ủ', 'ũ', 'ụ', 'Ù', 'Ú', 'Ủ', 'Ũ', 'Ụ', 'ư', 'ừ', 'ứ', 'ử', 'ữ', 'ự', 'Ư', 'Ừ', 'Ứ', 'Ử', 'Ữ', 'Ự', 'ỳ', 'ý', 'ỷ', 'ỹ', 'ỵ', 'Ỳ', 'Ý', 'Ỷ', 'Ỹ', 'Ỵ', '̀', '̉', '̃', '́', '̣'];
  let replace = ['a', 'a', 'e', 'o', 'u', 'o', 'A', 'A', 'E', 'O', 'U', 'O', 'd', 'D', 'a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A', 'A', 'A', 'd', 'D', 'e', 'e', 'e', 'e', 'e', 'e', 'E', 'E', 'E', 'E', 'E', 'E', 'i', 'i', 'i', 'i', 'I', 'I', 'I', 'I', 'I', 'I', 'o', 'o', 'o', 'o', 'o', 'O', 'O', 'O', 'O', 'O', 'o', 'o', 'o', 'o', 'o', 'o', 'O', 'O', 'O', 'O', 'O', 'O', 'o', 'o', 'o', 'o', 'o', 'o', 'O', 'O', 'O', 'O', 'O', 'O', 'u', 'u', 'u', 'u', 'u', 'U', 'U', 'U', 'U', 'U', 'u', 'u', 'u', 'u', 'u', 'u', 'U', 'U', 'U', 'U', 'U', 'U', 'y', 'y', 'y', 'y', 'y', 'Y', 'Y', 'Y', 'Y', 'Y', '', '', '', '', ''];
  str = str.replace(/./g, (c, i) => {
    let find = mark.indexOf(c);
    if (find >= 0)
      return replace[find];
    return c;
  });
  return str;
}

// export function operatorFStr(str) {
//   switch (str) {
//     case '>':
//       return Op.gt;
//     case '>=':
//     case '=>':
//       return Op.gte;
//     case '<':
//       return Op.lt;
//     case '<=':
//     case '=<':
//       return Op.lte;
//     case '=':
//     default:
//       return Op.eq;
//   }
// }

//
export function prettyDecimal(value, precision_length) {
  precision_length = precision_length || 3;
  let roundedValue = Math.round(value * Math.pow(10, precision_length)) / Math.pow(10, precision_length);
  return roundedValue;
}

export function parseDate(str) {
  let theDate = new Date(str);
  if (theDate == 'Invalid Date') {
    return null;
  }
  return theDate;
}