import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { UsuarioLogadoProvider } from "./shared/contexts";

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </UsuarioLogadoProvider>
  );
}

