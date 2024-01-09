//mutatio create user
mutation {
  createUser(input: {
    email: "supplier1@example.com",
    firstName: "supplier1",
    lastName: "supplier1",
    password: "password123",
    role: "SUPPLIER",
    username: "supplier1",
  }) {
    id
    email
    firstName
    lastName
    role
    username
    status
  }
}
//login 
mutation {
  login(input: {
    username: "supplier4",
    password: "password123"
  }) {
    token
    user {
      username
    }
  }
}
//createQuotation
mutation {
  createQuotation(input: {
    supplierId: 1
    customerId: 1
    shippingPrice:52
    productPrices: [
      { productId: 1, price: 50.0 }
    ]
  }) {
    id
    supplierId
    customerId
    shippingPrice
    productPrices{
      productId
      price
    }
   
    
  }
}
//CreatePurchaseRequest
mutation CreatePurchaseRequest($input: CreatePurchaseRequestInput!) {
  createPurchaseRequest(input: $input) {
    id
  }
}
//
query GetPurchaseRequests {
  purchaseRequests {
    id
    user {
      id
      username
    }
    products {
      id
      title
    }
      suppliers {
      id
      user {
        id
        username
      }
    }
  }
}

mutation UpdateOrder($id: Float!, $status: String!) {
  updateOrder(id: $id, status: $status) {
    id
    status
  }
}

query GetPurchaseRequestById($id: Float!) {
  purchaseRequest(id: $id) {
    id
    user {
      username
    }
    products {
      id
      title
    }
    suppliers {
      id
      user {
        id
        username
      }
    }
  }
}