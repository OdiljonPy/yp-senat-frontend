"use client"
import React, { useState } from 'react'
import YouthCommissions from '@/sections/commissions/YouthCommissions'
import About from '@/sections/common/About'
import HeroCommissions from '@/sections/common/Hero'
import { useApiQuery } from '@/hooks/useApi'
import { AboutResponse, CommissionRes, CommissionResponse, MandatResponse } from '@/types'
import useStore from '@/stores/useStore'
import LoadingScreen from '@/components/shared/LoadingScreen'

const Commissions = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMandat, setSelectedMandat] = useState(0);
    const { selectedCommission } = useStore()
    const { data, isLoading } = useApiQuery<CommissionResponse>(`/commission/category/`);
    const { data: mandat, isLoading: isLoadingMandat } = useApiQuery<MandatResponse>(`/mandat/`)
    const breadcrumbItems = [
        { title: "mainPage", path: "/" },
        { title: "standingCommissions", path: "/commissions" },
    ]
    const {
        data: aboutData,
        isLoading: isAboutLoading,
    } = useApiQuery<AboutResponse>(`/commission/category/${selectedCommission.id}/`, {}, undefined, !!selectedCommission.id);
    const queryParams = {
        ...(selectedCommission.id && { category_id: selectedCommission.id }),
        ...(searchQuery && { q: searchQuery }),
        ...(selectedMandat && mandat && { mandat_id: mandat.result[selectedMandat].id }),
        page: currentPage,
        page_size: 6
    };

    const { data: commissions } = useApiQuery<CommissionRes>(
        `/commission/`,
        queryParams,
    );

    if (isLoading || isLoadingMandat || isAboutLoading) return <LoadingScreen />

    return (
        <main>
            <HeroCommissions
                title='Doimiy kommissiyalar'
                categories={data}
                search={searchQuery}
                setSearch={setSearchQuery}
                breadcrumbItems={breadcrumbItems}
            />
            <About showBtn={false} commissions={aboutData || null} showBottom />
            <YouthCommissions
                title='Yoshlar kommissiyalari'
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setSelectedMandat={setSelectedMandat}
                selectedMandat={selectedMandat}
                mandat={mandat || null}
                commissions={commissions || []}
            />
        </main>
    )
}

export default Commissions
