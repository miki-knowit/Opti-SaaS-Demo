import type { StartPage } from '~/graphql/generated';

// Re-export the generated operation result so components can type API responses
// without redefining the Optimizely-backed schema shape locally.
export type StartPageData = StartPage;

// These aliases derive the concrete StartPage content items and block unions from
// the generated query result, keeping CMS-driven typing in one place.
export type StartPageItem = NonNullable<
    NonNullable<NonNullable<StartPageData['StartPage']>['items']>[number]
>;

export type ContentAreaItem = NonNullable<NonNullable<StartPageItem['ContentAreaProp']>[number]>;

export type SectionBlockItem = Extract<ContentAreaItem, { __typename: 'SectionBlock' }>;
export type ImageBlockItem = Extract<ContentAreaItem, { __typename: 'ImageBlock' }>;
export type TextBlockItem = Extract<ContentAreaItem, { __typename: 'TextBlock' }>;
