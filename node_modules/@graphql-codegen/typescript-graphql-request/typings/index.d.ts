import { PluginValidateFn, PluginFunction } from '@graphql-codegen/plugin-helpers';
import { GraphQLRequestVisitor } from './visitor.js';
import { RawGraphQLRequestPluginConfig } from './config.js';
export declare const plugin: PluginFunction<RawGraphQLRequestPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GraphQLRequestVisitor };
