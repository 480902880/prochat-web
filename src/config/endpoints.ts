const DEFAULT_API_ORIGIN = 'https://fantasy480.dpdns.org';

const normalizeApiOrigin = (value?: string) => {
  const candidate = value?.trim() || DEFAULT_API_ORIGIN;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return DEFAULT_API_ORIGIN;
    return url.origin;
  } catch {
    return DEFAULT_API_ORIGIN;
  }
};

export const apiOrigin = normalizeApiOrigin(import.meta.env.PUBLIC_PROCHAT_API_ORIGIN);
export const windowsDownloadUrl = `${apiOrigin}/api/admin/download/latest`;
