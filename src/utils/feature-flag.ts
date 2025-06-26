export default function isFeatureFlagEnabled(
  featureFlag: string,
  defaultValue: boolean = false
): boolean {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const featureFlagValue = urlParams.get(featureFlag);

  if (featureFlagValue === null) {
    return defaultValue;
  }

  return featureFlagValue.toLowerCase() === 'true';
}