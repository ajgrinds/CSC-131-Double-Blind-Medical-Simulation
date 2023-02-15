import { PluginValidateFn, PluginFunction } from '@graphql-codegen/plugin-helpers';
import { GraphQLRequestVisitor } from './visitor';
import { RawGraphQLRequestPluginConfig } from './config';
export declare const plugin: PluginFunction<RawGraphQLRequestPluginConfig>;
export declare const validate: PluginValidateFn<any>;
export { GraphQLRequestVisitor };
