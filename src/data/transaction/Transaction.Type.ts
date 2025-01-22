export interface TransactionDto {
    tid:      number;
    dateTime: Date;
    status:   string;
    total:    number;
    items:    Item[];
    buyer_id: number;
    stripe_session_id?: string;
}

export interface Item {
    tpid:     number;
    tid:      number;
    product:  Product;
    quantity: number;
    subtotal: number;
}

export interface Product {
    pid:         number;
    name:        string;
    price:       number;
    stock:       number;
    description: string;
    image_url:   string;
}