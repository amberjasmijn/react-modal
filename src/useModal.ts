import { DependencyList, useCallback, useContext, useMemo } from "react";
import { ModalContext } from ".";
import { ModalType } from "./ModalContext";

const generateModalKey = (() => {
  let count = 0;
  return () => `${++count}`;
})();

export const useModal = (component: ModalType, inputs: DependencyList = []) => {
  const key = useMemo(generateModalKey, []);
  const modal = useMemo(() => component, inputs);
  const context = useContext(ModalContext);

  const showModal = useCallback(() => context.showModal(key, modal), [key]);
  const hideModal = useCallback(() => context.hideModal(key), [key]);

  return { showModal, hideModal };
};
