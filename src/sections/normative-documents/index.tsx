"use client"

import React, { useState } from 'react'
import { Download, FileIcon } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'
import { useApiQuery } from '@/hooks/useApi'
import { formatDate } from '@/lib/utils'

import style from "./style.module.scss"
import Link from 'next/link'
import Pagination from '@/components/shared/Pagination'
interface DocumentItem {
  id: number,
  created_at: string,
  name: string,
  doc_type: 'PDF' | 'XLS' | 'DOCX',
  file: string
}
interface DocumentResponse {
  result: {
    content: DocumentItem[],
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  },
  ok: boolean;
}
const DocumentGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
  } = useApiQuery<DocumentResponse>("/documents/", {
    page: currentPage,
    page_size: 6,
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <Image src='/icons/pdf.svg' style={{ width: '32px', height: "32px" }} width={0} height={0} alt='pdf' />
      case 'XLS':
        return <Image src='/icons/xls.svg' style={{ width: '32px', height: "32px" }} width={0} height={0} alt='pdf' />
      case 'DOCX':
        return <Image src='/icons/docx.svg' style={{ width: '32px', height: "32px" }} width={0} height={0} alt='pdf' />
      default:
        return <FileIcon className="w-8 h-8 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading && data?.result.content.map((doc) => (
          <Link
            href={doc.file}
            target="_blank"
            download={doc.name}
            key={doc.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getFileIcon(doc.doc_type)}
                <div>
                  <h3 className={clsx("text-[16px] font-medium text-gray-900 mb-2", style.documentName)}>
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(doc.created_at)}
                  </p>
                </div>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                aria-label="Download document"
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </Link>
        ))}
        {isLoading && (
          new Array(3).fill(0).map((_, index) => (<div className={clsx("loader-doc", style.loader)}></div>))
        )}
      </div>
      <div className={style.pagination}>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.result.totalPages || 1} />
      </div>
    </div>
  )
}

export default DocumentGrid

