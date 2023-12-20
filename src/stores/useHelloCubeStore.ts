import { create } from 'zustand'

export type HelloCube = {
  $type: string
  message: string
  timestamp: string
}

type HelloCubeStore = {
  helloCubes: HelloCube[]
  addHelloCube: (helloCube: HelloCube) => void
}

export const useHelloCubeStore = create<HelloCubeStore>((set, get) => ({
  helloCubes: [],
  addHelloCube: (helloCube) => set((state) => ({ helloCubes: [...state.helloCubes, helloCube] })),
}))

export default useHelloCubeStore
