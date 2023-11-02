const ClassNameTransfer = (name: string) => {
  if (name === 'face') {
    return '얼굴';
  } else if (name === 'Mobile phone') {
    return '휴대폰';
  } else if (name === 'card') {
    return '카드';
  } else if (name === 'license-plate') {
    return '번호판';
  } else {
    return false;
  }
};

export default ClassNameTransfer;
