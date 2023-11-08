function isHex(str) {
  return /^[0-9A-Fa-f]+$/g.test(str);
}
function isBase64(str) {
  try {
    return Buffer.from(str, 'base64').toString('base64') === str;
  } catch (err) {
    return false;
  }
}
function hexToBase64(hexStr) {
  return Buffer.from(hexStr, 'hex').toString('base64');
}
function base64ToHex(base64Str) {
  return Buffer.from(base64Str, 'base64').toString('hex');
}
function convertBuffers(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertBuffers);
  } else if (typeof obj === 'object' && !!obj) {
    if (Buffer.isBuffer(obj)) {
      const buffer = Buffer.from(obj);
      return buffer.toString('hex');
    } else {
      const result = {};
      Object.keys(obj).forEach(key => {
        result[key] = convertBuffers(obj[key]);
      });
      return result;
    }
  } else {
    return obj;
  }
}
function convertHexObjToBase64Obj(obj) {
  if (Array.isArray(obj)) {
    return obj.map(convertHexObjToBase64Obj);
  } else if (!!obj) {
    if (typeof obj === 'string') {
      if (isHex(obj)) {
        const buffer = Buffer.from(obj, 'hex');
        return buffer.toString('base64');
      }
      if (isBase64(obj)) {
        return obj
      }

    }
    if (typeof obj === 'object') {
      const result = {};
      Object.keys(obj).forEach(key => {
        result[key] = convertHexObjToBase64Obj(obj[key]);
      });
      return result;
    }
    return obj

  } else {
    return obj;
  }
}

function sendResponse(res, code, message, data) {
  const response = { code, message, data };
  res.json(response);
}
const domainRegex = /^([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]{1,5})?$/
const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?$/;
module.exports = {
  convertBuffers,
  sendResponse,
  isHex,
  isBase64,
  hexToBase64,
  base64ToHex,
  convertHexObjToBase64Obj,
  domainRegex,
  ipRegex
}