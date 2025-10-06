import { useState, createContext} from 'react'

//create context
const AuthContext = createContext()

function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'))  // .!! used to get true or false. idthink it's needed just false would work
  


  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};
