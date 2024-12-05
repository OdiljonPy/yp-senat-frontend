"use client";
import React, { useState } from "react";
import type { PollResponse } from "@/types";
import clsx from "clsx";
import Modal from "@/components/shared/Modal";
import Link from "next/link";
import styles from "./style.module.scss";
import Pagination from "@/components/shared/Pagination";

interface SurveyTableProps {
    data: PollResponse | null;
    currentPage: number;
    setCurrentPage: (page: number) => void
}

export default function SurveyTable({ data, currentPage, setCurrentPage }: SurveyTableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState("")

    const handleViewResults = (result: string) => {
        setResult(result)
        setIsModalOpen(true);
        console.log("result", result)
    };

    const handleCloseModal = () => {
        setResult("")
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    return (
        <div className={clsx("container", styles.scrollable)}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <button
                                    className="flex items-center gap-2 hover:opacity-80"
                                >
                                    So&apos;rovnoma nomi
                                </button>
                            </th>
                            <th>Boshlangan sana</th>
                            <th>Tugash sanasi</th>
                            <th>Holati</th>
                            <th>Natijalar</th>
                            <th>So&apos;rovnomada qatnashish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.result.content?.map((survey) => (
                            <tr key={survey.id}>
                                <td className="line-clamp-2">{survey.name}</td>
                                <td>{survey.started_at}</td>
                                <td>{survey.ended_at}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${survey.status === 1 ? styles.active : styles.completed
                                            }`}
                                    >
                                        {survey.status === 1 ? 'Faol' : "Yakunlangan"}
                                    </span>
                                </td>
                                <td>
                                    {survey.status === 2 ? (
                                        <button
                                            className={`${styles.actionButton} ${styles.primary}`}
                                            onClick={() => handleViewResults(survey?.result)}
                                        >
                                            Natijalarni ko&apos;rish
                                        </button>
                                    ) : (
                                        "Natijalar hali yuq"
                                    )}
                                </td>
                                <td>
                                    {survey.status === 1 ? (
                                        <Link target="_blank" href={survey.link_to_poll}
                                            className={`${styles.actionButton} ${styles.secondary}`}
                                            onClick={() => console.log(`Participating in survey ${survey.id}`)}
                                        >
                                            Qatnashish
                                        </Link>
                                    ) : (
                                        "Yakunlangan"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <Pagination totalPages={data?.result.totalPages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

            <Modal result={result} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
