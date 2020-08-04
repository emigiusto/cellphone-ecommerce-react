import React, { Component } from 'react';
import {storeProducts,detailProduct} from './data'

const ProductContext = React.createContext()
//Context has 2 components
    //Provider
    //Consumer


class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount(){
        this.setProducts();
    }

    //Method to copy original values and set them on state (products property)
    setProducts = () =>{
        let tempProducts = []
        storeProducts.forEach(item=>{
            const singleItem = {...item}
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id===id)
        return product;
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        //Changes detailProduct with the correct product detailes
        this.setState(()=>{return {detailProduct:product}
        })
    }

    addToCart = (id) =>{
        let tempProducts = [...this.state.products]
        //actual index of the array (not the id of the element)
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index];
        // cambiar propiedades del producto
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        //update State
        this.setState(
            ()=>{
                return {
                        //Change the propertys inCart, count and total of the product clicked and updating the state array of products
                        products: tempProducts,
                        //Add the product to the cart
                        cart: [...this.state.cart,product]
                    }},
            //update Total, subtotal and tax
            ()=> {this.addTotals()}
        )
    }

    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                    modalProduct: product,
                    modalOpen: true
                }
        })
    }

    closeModal = () => {
        this.setState(()=>{
            return {
                    modalOpen: false
                }
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        //select and change properties of product with the id chosen on a temporary cart
        const selectedProduct = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.price * product.count;
        //update state
        this.setState(
            ()=>{
                return {
                    cart: [...tempCart]
                }
            },
            ()=>{
                this.addTotals();
            }
        )
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        //select and change properties of product with the id chosen on a temporary cart
        const selectedProduct = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];

        if (product.count > 1) {
            product.count = product.count - 1;
            product.total = product.price * product.count;
            //update state
            this.setState(
                ()=>{
                    return {
                        cart: [...tempCart]
                    }
                },
                ()=>{
                    this.addTotals();
                }
            )
        } else {
            this.removeItem(id);
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]

        //removing the item from the cart by filtering the array
        tempCart = tempCart.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id))

        //change the propertys of the "removed item" on the temporary array of products
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        //updating state with both new arrays
        this.setState(
            ()=>{
                return {
                    cart: [...tempCart],
                    products: [...tempProducts]
                }
            },
            ()=> {
                this.addTotals();
            }
        )
    }

    clearCart = () => {
        this.setState(
            //Empty the Cart
            ()=>{return {cart:[]}
            },
            ()=>{
            //New original copies from the original data
                this.setProducts();
                this.addTotals();
            });
    };

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => (subTotal += item.total))

        const tempTax = subTotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax;

        this.setState(()=> {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    

    //Test that original data does not change with changing inCart value of item1
    tester = () =>{
        console.log('State products:', this.state.products[0].inCart);
        console.log('Data products:', storeProducts[0].inCart)
    
        const tempProducts =[...this.state.products];
        tempProducts[0].inCart = true;

        this.setState(
            ()=>{return {products: tempProducts}},
            ()=> {
                console.log("State products:",this.state.products[0].inCart);
                console.log('Data products:', storeProducts[0].inCart);
                }
        )
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, //deconstruction of state
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer


export {ProductProvider,ProductConsumer};