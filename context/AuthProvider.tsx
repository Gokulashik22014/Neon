import { getUser } from "@/lib/appwrite";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Models } from "react-native-appwrite";

type Props = {
  children: ReactNode|React.JSX.Element;
};


const AuthContext = createContext<any>({})

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);
  const authInfo={ isLoading, setIsLoading, setUser, user, setIsLogged, isLogged }
  return (
    <AuthContext.Provider
      value={authInfo}
    >
      {children}
    </AuthContext.Provider>
  );
};
