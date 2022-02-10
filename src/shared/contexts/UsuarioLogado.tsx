import React, { createContext, useState } from "react";

interface IStateContextData {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const UsuarioLogadoContext = createContext<IStateContextData>({} as IStateContextData);

export const UsuarioLogadoProvider: React.FC = ({ children }) => {

    const [modal, setModal] = useState(false);

    return (
        <UsuarioLogadoContext.Provider value={{ modal, setModal}}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
}