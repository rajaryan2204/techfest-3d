/**
 * Best-effort detection of an extremely slow connection using the
 * Network Information API (https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation).
 *
 * Not supported in all browsers (e.g. Firefox) — in that case we return
 * `false` and the caller falls back to the normal experience.
 */

interface NetworkInfo {
    effectiveType?: string;
    downlink?: number;
    saveData?: boolean;
}

function getNetworkInfo(): NetworkInfo | undefined {
    if (typeof navigator === "undefined") return undefined;
    return (navigator as Navigator & { connection?: NetworkInfo }).connection;
}

/**
 * Returns `true` only for clearly slow connections:
 *  - effectiveType is "slow-2g" or "2g", OR
 *  - estimated downlink bandwidth is below 1.5 Mbps
 *
 * Everything else (3g/4g, unknown, unsupported browser) is treated as fast
 * enough so the intro still plays for the majority of users.
 */
export function isExtremelySlowConnection(): boolean {
    const conn = getNetworkInfo();
    if (!conn) return false;

    const effectiveType = conn.effectiveType ?? "";
    if (effectiveType === "slow-2g" || effectiveType === "2g") return true;

    const downlink = conn.downlink;
    if (typeof downlink === "number" && downlink > 0 && downlink < 1.5) return true;

    return false;
}
