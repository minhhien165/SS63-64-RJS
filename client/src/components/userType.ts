export interface UserType{
    id: number,
    email: string,
    password: string,
    confirmPassword: string,
    cart: CartItem[];
}

export interface CartItem{
    id: number,
    productId: number,
    quantity: number
}