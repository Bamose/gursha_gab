import { useRootNavigation, useRouter, useSegments } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@/app/store/Store";


const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authtoken, setauthtoken] = useState<string | null>(null);
  const segment = useSegments();
  const router = useRouter();


  console.log(segment, "dfdfg");

  const [isnavigationready, setnavigationready] = useState(false);
  const rootNavigation = useRootNavigation();
 
  useEffect(() => {
    const loadAuthToken = async () => { 
      SecureStore.getItemAsync("authtoken")
      .then((res) => {
        /* console.log("respone", res); */
        if (res) {
          setauthtoken(res);
        }

         })
    };
    loadAuthToken();
  }, []);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setnavigationready(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isnavigationready) {
      return;
    }
    const isAuthGroup = segment[0] === "(auth)";
    if (!authtoken && !isAuthGroup) {
      console.log("user is not yet authenticated and he cannot see this page");
      router.replace("/(auth)/signin");
    }
    if (authtoken && isAuthGroup) {
      router.replace("/");
    }
  }, [segment, authtoken, isnavigationready]);


  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authtoken", newToken);
        setauthtoken(newToken);
  };
  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync("authtoken");
    setauthtoken(null);
    console.log('authtoken deleted')
  };
  return (
    <AuthContext.Provider
      value={{ authtoken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
