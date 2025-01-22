export interface ProductDto {
    pid:       number;
    name:      string;
    price:     number;
    image_url: string;
    has_stock: boolean;
}

export interface ProductByPidDto{
    "pid": number;
    "name": string;
    "price": number;
    "stock": number;
    "description": string;
    "image_url": string;
}

export interface UserDto {
    pid: number;
}