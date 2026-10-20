import { ScholarField as ScholarField_3073db54511a97c46e97524d5fdcc4aa } from '@/components/payload/prefixed-url-field'
import { LinkedInField as LinkedInField_3073db54511a97c46e97524d5fdcc4aa } from '@/components/payload/prefixed-url-field'
import { DoiField as DoiField_4387a3c54b9d8221298f79fe795f43f5 } from '@/components/payload/doi-field'
import { LinkedInNewsField as LinkedInNewsField_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6 } from '@/components/payload/linkedin-news-field'
import { IconSelectField as IconSelectField_bfff1e4393991c3fba63c08affd1ff06 } from '@/components/payload/icon-select-field'
import { ExportPeopleButton as ExportPeopleButton_export } from '@/components/payload/export-people-button'
import { ConditionalPublishButton as ConditionalPublishButton_publish } from '@/components/payload/conditional-publish-button'
import { PendingChangesNav as PendingChangesNav_nav } from '@/components/payload/pending-changes-nav'
import PendingChangesView_view from '@/components/payload/pending-changes-view'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { RscEntryLexicalField as RscEntryLexicalField_lexical } from '@payloadcms/richtext-lexical/rsc'
import { RscEntryLexicalCell as RscEntryLexicalCell_lexical } from '@payloadcms/richtext-lexical/rsc'
import { LexicalDiffComponent as LexicalDiffComponent_lexical } from '@payloadcms/richtext-lexical/rsc'
import { BoldFeatureClient as BoldFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { ItalicFeatureClient as ItalicFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { UnderlineFeatureClient as UnderlineFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { StrikethroughFeatureClient as StrikethroughFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { SubscriptFeatureClient as SubscriptFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { SuperscriptFeatureClient as SuperscriptFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { InlineCodeFeatureClient as InlineCodeFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { ParagraphFeatureClient as ParagraphFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { HeadingFeatureClient as HeadingFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { AlignFeatureClient as AlignFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { IndentFeatureClient as IndentFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { UnorderedListFeatureClient as UnorderedListFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { OrderedListFeatureClient as OrderedListFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { ChecklistFeatureClient as ChecklistFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { LinkFeatureClient as LinkFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { RelationshipFeatureClient as RelationshipFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { BlockquoteFeatureClient as BlockquoteFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { UploadFeatureClient as UploadFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { HorizontalRuleFeatureClient as HorizontalRuleFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { InlineToolbarFeatureClient as InlineToolbarFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'
import { FixedToolbarFeatureClient as FixedToolbarFeatureClient_lexical } from '@payloadcms/richtext-lexical/client'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/components/payload/prefixed-url-field#ScholarField": ScholarField_3073db54511a97c46e97524d5fdcc4aa,
  "@/components/payload/prefixed-url-field#LinkedInField": LinkedInField_3073db54511a97c46e97524d5fdcc4aa,
  "@/components/payload/doi-field#DoiField": DoiField_4387a3c54b9d8221298f79fe795f43f5,
  "@/components/payload/linkedin-news-field#LinkedInNewsField": LinkedInNewsField_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6,
  "@/components/payload/icon-select-field#IconSelectField": IconSelectField_bfff1e4393991c3fba63c08affd1ff06,
  "@/components/payload/export-people-button#ExportPeopleButton": ExportPeopleButton_export,
  "@/components/payload/conditional-publish-button#ConditionalPublishButton": ConditionalPublishButton_publish,
  "@/components/payload/pending-changes-nav#PendingChangesNav": PendingChangesNav_nav,
  "@/components/payload/pending-changes-view#default": PendingChangesView_view,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField_lexical,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell_lexical,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent_lexical,
  "@payloadcms/richtext-lexical/client#BoldFeatureClient": BoldFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#ItalicFeatureClient": ItalicFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": UnderlineFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#StrikethroughFeatureClient": StrikethroughFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#SubscriptFeatureClient": SubscriptFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#SuperscriptFeatureClient": SuperscriptFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#InlineCodeFeatureClient": InlineCodeFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": ParagraphFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#HeadingFeatureClient": HeadingFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#AlignFeatureClient": AlignFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#IndentFeatureClient": IndentFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#UnorderedListFeatureClient": UnorderedListFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#OrderedListFeatureClient": OrderedListFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#ChecklistFeatureClient": ChecklistFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#LinkFeatureClient": LinkFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#RelationshipFeatureClient": RelationshipFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#BlockquoteFeatureClient": BlockquoteFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#UploadFeatureClient": UploadFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient": HorizontalRuleFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": InlineToolbarFeatureClient_lexical,
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient_lexical,
}
