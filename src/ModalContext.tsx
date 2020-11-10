import { createContext } from 'react'

export type ModalType = React.FC<any>

export interface ModalContext {
    showModal: (key: string, modal: ModalType) => void
    hideModal: (key: string) => void
}

export const ModalContext = createContext<ModalContext>({
    showModal: () => {},
    hideModal: () => {},
})
