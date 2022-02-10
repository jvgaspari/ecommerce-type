import CartItem from '../CartItem';
import { Wrapper } from './styles';
import { ICartItem } from '../../interfaces';
import { useState } from 'react';

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {

const [name,setName] = useState('' as string);
const [cpf,setCpf] = useState('' as string);
const [address,setAddress] = useState('' as string);

  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    
  localStorage.setItem("user",JSON.stringify(cartItems));
  const purchases = {...cartItems}
  const data = {purchases,name,cpf,address}
    
  const saveData = (data:object) => {
    localStorage.setItem('usuário', JSON.stringify(data))
  }

  const getData = (key:string) => {
    var storedArray = localStorage.getItem(key);
    var stored = JSON.parse(`${storedArray}`)
    console.log('stored', stored)
    return stored;
  }


  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <h2>Register</h2>
        <label htmlFor="">Name:</label>
        <input type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
        <label htmlFor="">CPF:</label>
        <input type="text" value={cpf} onChange={(event)=>setCpf(event.target.value)}/>
        <label htmlFor="">Address:</label>
        <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)}/>
        <button type='button' onClick={() => saveData(data)}>Buy</button>
        <button type='button' onClick={() => getData('usuário')}>GetData</button>
      </div>
    </Wrapper>
  );
};

export default Cart;
