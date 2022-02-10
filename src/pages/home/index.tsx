import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { UsuarioLogadoContext } from "../../shared/contexts";
import { ICartItem } from "../../shared/interfaces";
import { ApiException } from "../../shared/services/api/ApiException";
import { CartsService } from "../../shared/services/api/carts/CartsService";

export const Home = () => {

    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    const [cart, setCart] = useState<ICartItem[]>([])

    useEffect(() => {
        CartsService.getAll()
            .then((result) => {
                if(result instanceof ApiException){
                    alert(result.message);
                } else {
                    setCart(result);
                    console.log(result);
                }
            })
    }, [])

    return (
        <div>
            <p>Bem-vindo à Home</p>
            <p>{nomeDoUsuario}</p>
            <Link to='/sobre'>Click me!</Link>
            <div>
                {}
            </div>
        </div>
    )
}