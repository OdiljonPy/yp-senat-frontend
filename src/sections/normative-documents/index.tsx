"use client"

import React from 'react'
import { Download, FileIcon } from 'lucide-react'
import Image from 'next/image'
import { useApiQuery } from '@/hooks/useApi'
import { formatDate } from '@/lib/utils'
import LoadingScreen from '@/components/shared/LoadingScreen'
interface DocumentItem {
  id: number,
  created_at: string,
  name: string,
  doc_type: 'PDF' | 'XLS' | 'DOCX',
  file: string
}
interface DocumentResponse {
  result: DocumentItem[]
}
const DocumentGrid = () => {
  const {
    data,
    isLoading,
    error,
  } = useApiQuery<DocumentResponse>("/documents/", {
    page: 1,
    page_size: 6,
  });
  if (isLoading) {
    return <LoadingScreen/>
  }
  if (error) {
    return <LoadingScreen/>
  }
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <Image src='/icons/pdf.svg' style={{width: '32px', height:"32px"}} width={0} height={0} alt='pdf'/>
      case 'XLS':
        return <Image src='/icons/xls.svg' style={{width: '32px', height:"32px"}} width={0} height={0} alt='pdf'/>
      case 'DOCX':
        return <Image src='/icons/docx.svg' style={{width: '32px', height:"32px"}} width={0} height={0} alt='pdf'/>
      default:
        return <FileIcon className="w-8 h-8 text-gray-500" />
    }
  }

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = url.split('/').pop() || 'document'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.result.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getFileIcon(doc.doc_type)}
                <div>
                  <h3 className="text-[16px] font-medium text-gray-900 mb-2">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(doc.created_at)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(doc.file)}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                aria-label="Download document"
              >
                <Download className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentGrid

