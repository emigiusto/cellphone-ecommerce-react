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
        cart:[],
        modalOpen: false,
        modalProduct: detailProduct,
    }

    componentDidMount(){
        this.setProducts();
    }

    //Method to copy original values and set them on state
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
                    }
            },
            ()=> {console.log(this.state)}
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
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer


export {ProductProvider,ProductConsumer};