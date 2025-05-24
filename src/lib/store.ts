import { Incident } from '@/modules/incident/types';
import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

type FormModalState<T = any> = {
  data: T;
  setData: (data: T) => void;
  type: "create" | "update" | "delete";
  setType: (type: "create" | "update" | "delete") => void;
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
type AlertDrawerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (e: boolean) => void;
};




export const useUserStore = create<FormModalState>((set) => ({
  data: {},
  setData: (data) => set({ data }),
  type: "create",
  setType: (type: "create" | "update" | "delete") => set({ type }),
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

export const useFormDrawer = create<AlertDrawerState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (e) => set({ isOpen: !e }),
  })
)

interface IncidentStore {
  incident: Incident | null;
  setIncident: (incident: Incident | null) => void;
  clearIncident: () => void;
}

// Define a type that combines IncidentStore with PersistOptions
type IncidentStorePersist = (
  config: StateCreator<IncidentStore>,
  options: PersistOptions<IncidentStore>
) => StateCreator<IncidentStore>;

export const useIncidentStore = create<IncidentStore>(
  (persist as IncidentStorePersist)(
    (set) => ({
      incident: null,
      setIncident: (incident) => set({ incident }),
      clearIncident: () => set({ incident: null }),
    }),
    {
      name: "incident-storage",
    }
  )
);


interface DeleteStore {

  id: number;
  isOpen: boolean;
  setId: (id: number) => void;
  openModalDelete: () => void;
  closeModalDelete: () => void;

}

export const useDeleteStore = create<DeleteStore>((set) => ({
  id: 0,
  isOpen: false,
  setId: (id) => set({ id }),
  openModalDelete: () => set({ isOpen: true }),
  closeModalDelete: () => set({ isOpen: false }),

}))

