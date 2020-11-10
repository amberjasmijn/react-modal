import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { ModalType } from "./ModalContext";

export interface ModalRootProps {
  modals: Record<string, ModalType>;
  component?: React.ComponentType<any>;
}

interface ModalRendererProps {
  component: ModalType;
}

const ModalRenderer = ({ component, ...rest }: ModalRendererProps) =>
  component(rest);

export const ModalRoot: React.FC<ModalRootProps> = ({
  modals,
  component: RootComponent = React.Fragment,
}) => {
  const [mountNode, setMountNode] = useState<Element | undefined>();

  useEffect(() => setMountNode(document.body));

  return mountNode
    ? ReactDOM.createPortal(
        <RootComponent>
          {Object.keys(modals).map((key) => {
            return <ModalRenderer key={key} component={modals[key]} />;
          })}
        </RootComponent>,
        mountNode
      )
    : null;
};
