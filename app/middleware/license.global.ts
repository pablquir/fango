export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  console.log("invocado el middleware");

  const { appState, validateLicense } = useLicense();

  //no bloquear la propia pagina de expiracion
  if (to.path === "/page-expired") return;

  await validateLicense();
  if (appState.value === "BLOCKED") {
    return navigateTo("/page-expired");
  }
});
