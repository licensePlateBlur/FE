export const modelOptions = ['얼굴', '자동차번호판', '핸드폰', '신분증/카드'];

export const CheckModel = (model: string) => {
  return '' + (modelOptions.indexOf(model) + 1);
};
