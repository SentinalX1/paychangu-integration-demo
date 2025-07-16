export type Data = {
    Id: number
    Name: string
    Description: string
    Amount: number
    image: string
    currency: "MWK"
}

export const products: Data[] = [
    {
    Id: 554083,
    Name: "Nike shoes",
    Description: "Nike Jordan 4.",
    Amount: 250000,
    image: "/products/jordan-4.webp",
    currency: "MWK"
},
    {
    Id: 7467388,
    Name: "Navy blue suit",
    Description: "Three piece navy blue suit.",
    Amount: 860000,
    image: "/products/3-Piece-Royal-Blue-Suit-For-Men.jpg",
    currency: "MWK"
},
    {
    Id: 9908364,
    Name: "Abaya",
    Description: "Mens abaya.",
    Amount: 150000,
    image: "/products/abaya m1.webp",
    currency: "MWK"
},
]