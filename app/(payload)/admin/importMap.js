import { ScholarField as ScholarField_3073db54511a97c46e97524d5fdcc4aa } from '@/components/payload/prefixed-url-field'
import { LinkedInField as LinkedInField_3073db54511a97c46e97524d5fdcc4aa } from '@/components/payload/prefixed-url-field'
import { DoiField as DoiField_4387a3c54b9d8221298f79fe795f43f5 } from '@/components/payload/doi-field'
import { LinkedInNewsField as LinkedInNewsField_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6 } from '@/components/payload/linkedin-news-field'
import { IconSelectField as IconSelectField_bfff1e4393991c3fba63c08affd1ff06 } from '@/components/payload/icon-select-field'
import { ExportPeopleButton as ExportPeopleButton_export } from '@/components/payload/export-people-button'
import { ConditionalPublishButton as ConditionalPublishButton_publish } from '@/components/payload/conditional-publish-button'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e } from '@payloadcms/storage-vercel-blob/client'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'
import { RscEntryLexicalField as RscEntryLexicalField_lexical } from '@payloadcms/richtext-lexical/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/components/payload/prefixed-url-field#ScholarField": ScholarField_3073db54511a97c46e97524d5fdcc4aa,
  "@/components/payload/prefixed-url-field#LinkedInField": LinkedInField_3073db54511a97c46e97524d5fdcc4aa,
  "@/components/payload/doi-field#DoiField": DoiField_4387a3c54b9d8221298f79fe795f43f5,
  "@/components/payload/linkedin-news-field#LinkedInNewsField": LinkedInNewsField_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6,
  "@/components/payload/icon-select-field#IconSelectField": IconSelectField_bfff1e4393991c3fba63c08affd1ff06,
  "@/components/payload/export-people-button#ExportPeopleButton": ExportPeopleButton_export,
  "@/components/payload/conditional-publish-button#ConditionalPublishButton": ConditionalPublishButton_publish,
  "@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler": VercelBlobClientUploadHandler_16c82c5e25f430251a3e3ba57219ff4e,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField_lexical
}
