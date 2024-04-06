export const generate32BitInt = () => {
  return Math.floor(Math.random() * 0x100000000) | 0;
}