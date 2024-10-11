import { create } from 'zustand'

type FormModalState<T = any> = {
  data: T;
  setData: (data: T) => void;
  type: "create" | "update";
  setType: (type: "create" | "update") => void;
  table: "user" | "student" | "parent" | "subject" | "class";
  setTable: (table: "user" | "student" | "parent" | "subject" | "class") => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
type AlertModalState = {
  isOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
  message: string;
  setMesage: (message: string) => void;
};


export const useUserStore = create<FormModalState>((set) => ({
  data: {},
  setData: (data) => set({ data }),
  type: "create",
  setType: (type: "create" | "update") => set({ type }),
  table: "user",
  setTable: (table) => set({ table }),
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useAlertSuccess = create<AlertModalState>(
  (set) => ({
    isOpen: false,
    openAlert: () => set({ isOpen: true }),
    closeAlert: () => set({ isOpen: false }),
    setMesage: (message) => set({ message }),
    message: ""

  })
)

