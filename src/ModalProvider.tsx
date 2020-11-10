import * as React from "react";
import { useMemo, useState } from "react";
import { ModalContext } from ".";
import { ModalType } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

interface ModalProviderProps {
  rootComponent?: React.ComponentType<any>;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  rootComponent,
}) => {
  const [modals, setModals] = useState<Record<string, ModalType>>({});

  const showModal = (key: string, modal: ModalType) =>
    setModals((modals) => ({
      ...modals,
      [key]: modal,
    }));

  const hideModal = (key: string) =>
    setModals((modals) => {
      if (!modals[key]) {
        return modals;
      }
      const newModals = { ...modals };
      delete newModals[key];
      return newModals;
    });

  const contextValue = useMemo(() => ({ showModal, hideModal }), []);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalRoot modals={modals} component={rootComponent} />
    </ModalContext.Provider>
  );
};
