"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const graphql_1 = require("graphql");
exports.FileUpload = new graphql_1.GraphQLScalarType({
    name: 'FileUpload',
    description: 'The `FileUpload` scalar type represents a file upload.',
    parseValue: (value) => value,
    parseLiteral: (ast) => {
        if (ast.kind === graphql_1.Kind.STRING) {
            return ast.value;
        }
        throw new Error('Invalid FileUpload value.');
    },
    serialize: (value) => value,
});
//# sourceMappingURL=file-upload.scalar.js.map