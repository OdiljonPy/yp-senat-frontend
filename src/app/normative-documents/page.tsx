import React from 'react'
import Links from '@/sections/common/Links'
import HeroDetail from '@/sections/common/DetailHero'
import { useTranslations } from 'next-intl'
import DocumentGrid from '@/sections/normative-documents'
const NormativeDocuments = () => {
  const t = useTranslations("Footer")
  const links = [
    { title: "mainPage", path: "/" },
    { title: 'normativeDocuments', path: "/normative-documents" },
  ];
  const text = t('normative_documents')
  return (
    <>
      <HeroDetail items={links} type={1} text={text} />
      <main className="bg-gray-50">
        <DocumentGrid />
      </main>
      <Links />
    </>
  )
}

export default NormativeDocuments
