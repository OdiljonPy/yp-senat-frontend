"use client";

import React, { useState } from "react";
import { useApiQuery } from "@/hooks/useApi";
import NewsCard from "@/components/shared/NewsCard";
import Links from "@/sections/common/Links";
import MainHero from "@/sections/common/MainHero";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";
interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  endDate: string;
  image: string;
}

interface ProjectsResponse {
  result: {
    content: Project[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  };
}

const Projects = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const links = [{ title: "mainPage", path: "/" }, { title: "projects" }];
  const text =
    "Yoshlar tadbirkorligini qo'llab-quvvatlash dasturi yo'lga qo'yildi";

  const { data, isLoading, error } = useApiQuery<ProjectsResponse>(
    "/projects/",
    { page: currentPage, page_size: 6 }
  );
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Yuklanmoqda...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }

  const projects = data?.result?.content ?? [];
  return (
    <>
      <MainHero items={links} type={1} text={text} />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-16 lg:py-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2B38] mb-8 sm:mb-12 font-bold">
            Loyihalar
          </h1>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.id}`)}
                >
                  <NewsCard data={project} isShow={false} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Hozircha loyihalar mavjud emas.
            </p>
          )}
          <Pagination
            className="ml-auto mt-8"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={data?.result?.totalPages || 1}
          />
        </div>
      </section>
      <Links />
    </>
  );
};

export default Projects;
