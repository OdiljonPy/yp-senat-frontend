"use client"
import React, { useState } from 'react'
import YouthCommissions from '@/sections/commissions/YouthCommissions'
import HeroCommissions from '@/sections/common/Hero'
import { useApiQuery } from '@/hooks/useApi'
import { CommissionRes, MandatResponse } from '@/types'
import useStore from '@/stores/useStore'
import LoadingScreen from '@/components/shared/LoadingScreen'

const Parliament = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMandat, setSelectedMandat] = useState(0);
    const { selectedCommission } = useStore()
    const { data, isLoading } = useApiQuery<MandatResponse>(`/region/`);
    const breadcrumbItems = [
        { title: "mainPage", path: "/" },
        { title: "regionalCommissions", path: "/parliament" },
    ]
    const queryParams = {
        ...(selectedCommission.id && { region_id: selectedCommission.id }),
        ...(searchQuery && { q: searchQuery }),
        page: currentPage,
        page_size: 6
    };

    const { data: commissions } = useApiQuery<CommissionRes>(
        `/commission/`,
        queryParams,
    );

    if (isLoading) return <LoadingScreen />

    return (
        <main>
            <HeroCommissions
                title='Parlament azolari'
                categories={data}
                search={searchQuery}
                setSearch={setSearchQuery}
                breadcrumbItems={breadcrumbItems}
            />
            <YouthCommissions
                title="Parlament azolarini"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setSelectedMandat={setSelectedMandat}
                selectedMandat={selectedMandat}
                commissions={commissions || []}
                isParliament={true}
            />
        </main>
    )
}

export default Parliament;
