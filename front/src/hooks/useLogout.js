import { useAuthContext } from './useAuthContext'
import { useProductContext } from './useProductContext'
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: productDispatch } = useProductContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    productDispatch({ type: 'SET_PRODUCT', payload: null })

  }

  return { logout }
}