function formatBytes(bytes: number) {
  const str = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + str[e]
}

export default formatBytes;
