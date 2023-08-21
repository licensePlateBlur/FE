function FormatData(datetimeString: string) {
  const dateObj = new Date(datetimeString);

  const year = dateObj.getFullYear(); // 년도 추출 (2023)
  const month = dateObj.getMonth() + 1; // 월 추출 (0부터 시작하므로 +1 필요) (7)
  const day = dateObj.getDate(); // 일 추출 (26)

  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  return formattedDate;
}
export default FormatData;
