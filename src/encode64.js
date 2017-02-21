const BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const encode64 = (data) => {
  let PAD = '=';
  let ret = '';
  let leftchar = 0;
  let leftbits = 0;

  for (let i = 0; i < data.length; i++) {
    leftchar = (leftchar << 8) | data[i];
    leftbits += 8;
    while (leftbits >= 6) {
      let curr = (leftchar >> (leftbits-6)) & 0x3f;
      leftbits -= 6;
      ret += BASE[curr];
    }
  }
  if (leftbits === 2) {
    ret += BASE[(leftchar&3) << 4];
    ret += PAD + PAD;
  } else if (leftbits === 4) {
    ret += BASE[(leftchar&0xf) << 2];
    ret += PAD;
  }
  return ret;
};

export default encode64;
