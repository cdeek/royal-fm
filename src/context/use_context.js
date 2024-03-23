import { Context } from "./context";
import { useContext } from "react"

export const useHook = () => {
  const context = useContext(Context)

  if(!context) {

    throw Error('context must be used inside an ContextProvider.')
  }

  return context;
}
