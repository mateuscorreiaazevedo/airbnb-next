import { create } from 'zustand'

type StoreProps = {
  open: boolean
  setOpen: () => void
}

export const useRegisterModal = create<StoreProps>(set => ({
  open: false,
  setOpen: () => {
    set(state => ({ open: !state.open }))
  }
}))
