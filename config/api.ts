const ApiUrl = async (path:string) => {
  return await (await fetch(`${window.location.host}${path}`)).json()
}