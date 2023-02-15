import { PluginValidateFn, PluginFunction } from '@graphql-codegen/plugin-helpers';
import { GraphQLRequestVisitor } from './visitor.cjs';
import { RawGraphQLRequestPluginConfig } from './config.cjs';
export declare const plugin: PluginFunction<RawGraphQLRequestPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GraphQLRequestVisitor };
