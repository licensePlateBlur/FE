export const modelOptions = ['얼굴', '번호판', '신분증', '카드'];

export const CheckModel = (model: string) => {
  return '' + (modelOptions.indexOf(model) + 1);
};
