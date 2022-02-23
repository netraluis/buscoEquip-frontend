import React, { useEffect, useState } from "react";
import authService from "../services/auth.services";

interface globalContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any;
  errorMessage: null | string;
}

let ConsumerWrapper:  React.Consumer<{
  isLoggedIn: boolean;
  isLoading: boolean;
  user: null;
  errorMessage: null;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isLogged: () => Promise<void>;
}>;


const GeneralContext: any = (props: any) => {

  const defaultFunctions = {
    signup: async (data: any) => {
      authService
        .signup(data)
        .then((response) => {
          console.log('llego 222')
          return setGlobalContext({
            isLoggedIn: true,
            isLoading: false,
            user: response.data,
            errorMessage: null,
          });
        })
        .catch((err) => {
          console.log('llego', err)
          setGlobalContext({
            isLoggedIn: false,
            user: null,
            isLoading: false,
            errorMessage: err.response.data.message,
          });
        });
    },
    login: async (data: any) => {
      return authService
        .login(data)
        .then((response) =>
          setGlobalContext({
            isLoggedIn: true,
            isLoading: false,
            user: response.data,
            errorMessage: null,
          })
        )
        .catch((err) => {
          return setGlobalContext({
            isLoggedIn: false,
            user: null,
            isLoading: false,
            errorMessage: err.response.data.message,
          });
        });
    },
  
    logout: async () => {
      authService
        .logout()
        .then(() => setGlobalContext({ isLoggedIn: false, user: null, isLoading: false, errorMessage: null, }))
        .catch((err) => console.error(err));
    },

    isLogged: async () => {
      try {
        const result = await authService.isLoggedIn();
        if (result) {
          setGlobalContext({
            isLoggedIn: true,
            isLoading: false,
            // user: result.data,
            user: null,
            errorMessage: null,
          });
        }
      } catch (err) {
        setGlobalContext({
          isLoggedIn: false,
          isLoading: false,
          user: null,
          errorMessage: null,
        });
      }
    }
  }
  
  const { Consumer, Provider } = React.createContext({
    ...defaultFunctions,
    isLoggedIn: false,
    isLoading: true,
    user: null,
    errorMessage: null
  });

  ConsumerWrapper = Consumer;
  
  const [globalContext, setGlobalContext] = useState({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    errorMessage: null,
  })

  useEffect(() => {
    defaultFunctions.isLogged()
  }, [])

  const { isLoggedIn, isLoading, user, errorMessage } = globalContext;
  console.log({ isLoggedIn, isLoading, user, errorMessage })

  if (isLoading) return <p>Loading</p>;

  return (
    <Provider
      value={{
        ...defaultFunctions,
        isLoggedIn,
        isLoading,
        user,
        errorMessage
      }}
    >
      {props.children}
    </Provider>
  );

}

// HOC that converts regular component into a Consumer
const withContext = (WrappedComponent: any) => {
  return function (props: any) {
    return (
      <ConsumerWrapper>
        {(value) => {
          // const {
          //   isLoggedIn,
          //   isLoading,
          //   user,
          //   signup,
          //   login,
          //   logout,
          //   errorMessage
          // } = value;

          return (
            <WrappedComponent
              {...value}
              {...props}
            />
          );
        }}
      </ConsumerWrapper>
    );
  };
};

export { GeneralContext, withContext };