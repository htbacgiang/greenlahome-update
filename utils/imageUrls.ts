const DEFAULT_CLOUDINARY_CLOUD_NAME = "dcgtt1jza";
const DEFAULT_IMAGE_PATH = "/images/noi-that-1.jpg";

const getCloudinaryCloudName = () =>
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CLOUD_NAME;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const ensureLeadingSlash = (value: string) =>
  value.startsWith("/") ? value : `/${value}`;

const getCloudinaryUploadPattern = () =>
  new RegExp(
    `https?:\\/\\/res\\.cloudinary\\.com\\/${escapeRegExp(
      getCloudinaryCloudName()
    )}\\/image\\/upload\\/`,
    "g"
  );

export const rewriteCloudinaryImageUrls = (
  value: string | undefined,
  replacementBase = "/images/"
) => {
  if (!value) return value || "";

  return value.replace(getCloudinaryUploadPattern(), replacementBase);
};

export const normalizeSiteImageUrl = (
  imageUrl: string | undefined,
  baseUrl: string,
  fallbackPath = DEFAULT_IMAGE_PATH
) => {
  const normalizedBaseUrl = trimTrailingSlash(baseUrl);

  if (!imageUrl) {
    return `${normalizedBaseUrl}${ensureLeadingSlash(fallbackPath)}`;
  }

  const rewrittenUrl = rewriteCloudinaryImageUrls(imageUrl);

  if (rewrittenUrl.startsWith("http://") || rewrittenUrl.startsWith("https://")) {
    return rewrittenUrl;
  }

  return `${normalizedBaseUrl}${ensureLeadingSlash(rewrittenUrl)}`;
};
