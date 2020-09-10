import { gql } from "apollo-server-express";
export default gql`
    type Query{
        product(productId:ID!):Product!
        products:[Product!]
    }
    type Mutation{
        createProduct(createProductInput: CreateProductInput):Product!
        updateProduct(updateProductInput: UpdateProductInput):Product!
    }
    type Subscription{

    }
    type Product{
        sku: String!
        name: String!
        alias: String!
        description: String
        category: String
        cover: String
        brand: String
        photos: [String]
        status: Boolean
        quantity: Number
        price: Number
        retailPrice: Number
        weight: Number
        massUnit: String
        length: Number
        width: Number
        height: Number
        distanceUnit: String
        color: String
    }
    input CreateProductInput{
        sku: String!
        name: String!
        alias: String!
        description: String
        category: String
        cover: String
        brand: String
        photos: [String]
        status: Boolean
        quantity: Number
        price: Number
        retailPrice: Number
        weight: Number
        massUnit: String
        length: Number
        width: Number
        height: Number
        distanceUnit: String
        color: String
    }
`;
