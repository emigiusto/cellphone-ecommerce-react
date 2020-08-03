import styled from 'styled-components'

export const ButtonContainer = styled.button `
    text-transform: capitalize;
    font-size: 1.1rem;
    background: transparent;
    border: 0.2rem solid var(--lightBlue);
    border-color: ${props => props.cart? "var(--mainYellow)":"var(--lightBlue)"};
    color: ${props => props.cart? "var(--mainYellow)":"var(--lightBlue)"};
    border-radius: 0.5rem;
    padding: 0.3rem 0.6rem;
    cursor: pointer;margin: 0.2rem 0.5rem 0.2rem 0;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: ${props => props.cart? "var(--mainYellow)":"var(--lightBlue)"};;
        color: var(--mainBlue)
    }
    &:focus{
        outline: none;
    }
`