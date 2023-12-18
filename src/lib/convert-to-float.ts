export default function convertToFloat(value: string): number | null {
  const decimalSeparator = value.includes(",") ? "," : ".";
  const regex = new RegExp(`[^0-9${decimalSeparator}]`, "g");
  const cleanedValue = value.replace(regex, "");
  const parts = cleanedValue.split(decimalSeparator);
  if (parts.length > 2) {
    return null;
  }
  const integerPart = parts[0];
  const decimalPart = parts[1] ?? "";
  const floatValue = parseFloat(`${integerPart}.${decimalPart}`);
  return isNaN(floatValue) ? null : floatValue;
}
