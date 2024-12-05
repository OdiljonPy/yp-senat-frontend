'use client'
import React, { useState } from 'react'
import HeroCommissions from '@/sections/common/Hero'
import SurveyTable from '@/sections/surveys/Table'
import { useApiQuery } from '@/hooks/useApi'
import { PollResponse } from '@/types'
import useStore from '@/stores/useStore'

const breadItems = [{ title: "mainPage", path: "/" }, { title: "surveys", path: "/surveys" }]

const Surveys = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1)

    const { selectedCommission } = useStore()

    const queryParams = {
        ...(selectedCommission.id && {
            poll_status
                : selectedCommission.id
        }),
        ...(searchQuery && { poll_name: searchQuery }),
        page: currentPage,
        page_size: 6
    };
    const { data } = useApiQuery<PollResponse>(
        "/base/poll",
        queryParams,
    );

    const categories = {
        ok: true,
        result: [
            {
                id: 0,
                name: "Hammasi"
            },
            {
                id: 1,
                name: "Faol"
            },
            {
                id: 2,
                name: "Yakunlangan"
            },

        ]
    }
    return (
        <main>
            <HeroCommissions
                title="So'rovnomalar"
                search={searchQuery}
                setSearch={setSearchQuery}
                breadcrumbItems={breadItems}
                surveys={true}
                categories={categories}
            />
            <SurveyTable data={data || null} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
    )
}

export default Surveys