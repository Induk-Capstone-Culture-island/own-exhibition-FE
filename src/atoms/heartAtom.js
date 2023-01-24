import { atom } from "recoil";

export const isLightAtom = atom({
  key: "isLight",
  default: true,
});

export const heartAtom = atom({
  key: "isLike",
  default: false,
});
