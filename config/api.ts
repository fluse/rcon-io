export const ApiUrl = (path:string) => {
  return `${window.location.protocol}//${window.location.host}${path}`
}