import { createContext, useContext, useState } from "react";

const RedirectContext = createContext();

function RedirectProvider({ children }) {
  const [redirectTo, setRedirectTo] = useState("/");

  function updateRedirect(redirectPath) {
    setRedirectTo(() => redirectPath);
  }

  return (
    <RedirectContext.Provider value={{ redirectTo, updateRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
}

function useRedirect() {
  const context = useContext(RedirectContext);
  if (context === undefined)
    throw new Error("RedirectContext was used outside of RedirectProvider");
  return context;
}

export { RedirectProvider, useRedirect };
