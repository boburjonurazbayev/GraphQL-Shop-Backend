const { ApolloServer, gql } = require("apollo-server");
const { read } = require("./utils/model.js");

const categories = read("categories");
const subCategories = read("subCategories");
const products = read("products");

//Define your GraphQL schema
const typeDefs = gql`
  type Query {
    categories: [Categories]
    subCategories: [SubCategories]
    products: [Products]
  }

  type Categories {
    categoryId: Int
    categoryName: String
    subCategories: [SubCategories]
  }

  type SubCategories {
    subCategoryId: Int
    categoryId: Int
    subCategoryName: String
    products: [Products]
  }

  type Products {
    productId: Int
    productName: String
    subCategoryId: Int
    model: String
    color: String
    price: String
  }
`;

//Define a resolver
const resolvers = {
  Query: {
    categories: () => categories,
    subCategories: () => subCategories,
    products: () => products,
  },

  Categories: {
    categoryId: (parent) => parent.category_id,
    categoryName: (parent) => parent.category_name,
    subCategories: (parent) => {
      let result = [];

      for (let i = 0; i < subCategories.length; i++) {
        if (parent.category_id == subCategories[i].category_id) {
          result.push(subCategories[i]);
        }
      }

      return result;
    },
  },

  SubCategories: {
    subCategoryId: (parent) => parent.sub_category_id,
    categoryId: (parent) => parent.category_id,
    subCategoryName: (parent) => parent.sub_category_name,
    products: (parent) => {
      let result = [];

      for (let i = 0; i < products.length; i++) {
        if (parent.sub_category_id == products[i].sub_category_id) {
          result.push(products[i]);
        }
      }

      return result;
    },
  },

  Products: {
    productId: (parent) => parent.product_id,
    subCategoryId: (parent) => parent.sub_category_id,
    productName: (parent) => parent.product_name,
    color: (parent) => parent.color,
    price: (parent) => parent.price,
    model: (parent) => parent.model,
  },
};

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
