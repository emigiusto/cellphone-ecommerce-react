import React from 'react';
import CartItem from './CartItem'

function CartList({value}) {
    const {cart} = value;
    
    return (
        <div className="container-fluid">
            {cart.map(cartItem=>{
                return <CartItem key={cartItem.id} item={cartItem} value={value}/>
            })}
        </div>
    );
}

export default CartList;