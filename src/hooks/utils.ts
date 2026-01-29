// Format address 0x0000...0000
export const formatAddress = (address?: string) => {
  if (!address) {
    return "-";
  }
  if (address.length < 6 || address.length > 42) {
    return address;
  }
  return address.slice(0, 6) + "..." + address.slice(-4);
};