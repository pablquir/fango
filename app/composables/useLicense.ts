import { useStorage } from "@vueuse/core";

export type AppState = "ACTIVE" | "EXPIRED" | "BLOCKED";

const EXPIRATION_DATE = new Date("2026-02-13T23:59:59z");
const GRACE_DAYS = 3;
const MAX_TIME_DRIFT = 5 * 60 * 1000; // 5 minutos

export function useLicense() {
  const appState = useState<AppState>("appState", () => "BLOCKED");

  const licenseStore = useStorage("license-data", {
    lastServerTime: null as string | null,
    lastLocalTime: null as string | null,
  });

  async function getServerTime(): Promise<Date | null> {
    try {
      const res = await fetch("https://worldtimeapi.org/api/ip");
      const data = await res.json();
      return new Date(data.utc_datetime);
    } catch {
      return null;
    }
  }

  function isTimeManipulated(local: Date, lastLocal?: string | null) {
    if (!lastLocal) return false;
    return local.getTime() < new Date(lastLocal).getTime();
  }

  async function validateLicense() {
    const localTime = new Date();
    const serverTime = await getServerTime();
    const now = serverTime ?? localTime;

    // detectar manipulacion de hora
    if (isTimeManipulated(localTime, licenseStore.value.lastLocalTime)) {
      appState.value = "BLOCKED";
      return;
    }

    // detectar desfase sospechoso
    if (serverTime) {
      const drift = Math.abs(serverTime?.getTime() - localTime.getTime());
      if (drift > MAX_TIME_DRIFT) {
        appState.value = "BLOCKED";
        return;
      }
    }

    // guardar tiempos
    licenseStore.value.lastLocalTime = localTime.toISOString();
    if (serverTime) {
      licenseStore.value.lastServerTime = serverTime.toISOString();
    }

    // validar expiracion
    const graceLimit = new Date(EXPIRATION_DATE);
    graceLimit.setDate(graceLimit.getDate() + GRACE_DAYS);

    if (now <= EXPIRATION_DATE) {
      appState.value = "ACTIVE";
    } else if (now <= graceLimit) {
      appState.value = "EXPIRED";
    } else {
      appState.value = "BLOCKED";
    }
  }

  return {
    appState,
    validateLicense,
  };
}
