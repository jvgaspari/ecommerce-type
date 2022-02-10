import { useContext } from "react"
import { Link } from "react-router-dom"
import { UsuarioLogadoContext } from "../../shared/contexts";

export const Dashboard = () => {

    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    return (
        <div>
            <p>Bem-vindo ao Dashboard</p>
            <p>{ nomeDoUsuario }</p>
            <Link to='/'>Click me!</Link>
        </div>
    )
}