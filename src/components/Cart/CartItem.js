import React from 'react';

function CartItem({item,value}) {
    const {id,title,img,price,total,count} = item;
    const {increment, decrement,removeItem} = value;

    return (
        <div className="row my-2 text-capitalize text-center">
            {/*First Column*/}
            <div className="col-10 mx-auto col-lg-2">
                <img src={img} className="img-fluid" alt="product" style={{width:'5rem',height:'5rem'}}></img>
            </div>
            {/*Second Column*/}
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Product: </span>
                {title}
            </div>

            {/*Third Column*/}
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Price: </span>
                {price}
            </div>

            {/*Fourth Column*/}
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    {/*Decrement*/}
                    <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
                    {/*Cunt*/}
                    <span className="btn btn-black mx-1" >{count}</span>
                    {/*Increment*/}
                    <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
                </div>
            </div>
            {/*Fifth Column*/}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=>removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>  
            {/*Sixth Column*/}
            <div className="col-10 mx-auto col-lg-2">
                <strong>Item Total: $ {total}</strong>
            </div>
        </div>
    );
}

export default CartItem;