import { GraphQLScalarType, Kind } from 'graphql';

export const FileUpload = new GraphQLScalarType({
  name: 'FileUpload',
  description: 'The `FileUpload` scalar type represents a file upload.',
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    throw new Error('Invalid FileUpload value.');
  },
  serialize: (value) => value,
});