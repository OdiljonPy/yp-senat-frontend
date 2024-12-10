"use client"
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Title from "@/components/shared/Title";
import { useApiQuery } from "@/hooks/useApi";
import { ProjectsResponse } from "@/types";
import { stripHtml } from "@/lib/utils";
import LoadingScreen from "@/components/shared/LoadingScreen";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";
const Projects = () => {
  const t = useTranslations('Projects')
  const router = useRouter()
  const { data, isLoading, error } = useApiQuery<ProjectsResponse>(
    "/projects/",
    { page: 1, page_size: 6 }
  );
  const projects = data?.result.content.slice(0, 4) || []
  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }
  const handleClick = (id: number) => {
    router.push(`/projects/${id}`)
  }
  return (
    <section className={clsx("container", style.projects)}>
      <div className="flex items-center justify-between">
        <Title>{t('title')}</Title>
        <Link
          className="flex primary-black text-sm items-center gap-2"
          href="/projects"
        >
          {t('more')}
          <Image src={"/icons/arrow.svg"} alt="" width={16} height={16} />
        </Link>
      </div>

      <div className={style.content}>
        {projects.map((project) => (
          <div
            data-aos="fade-up"
            className={style.project} key={project.id} onClick={() => handleClick(project.id)}>
            <Image
              src={project.image}
              alt={project.name}
              width={146}
              height={225}
              className={style.image}
            />
            <div>
              <h4 className={style.title}>{stripHtml(project.name)}</h4>
              <p className={style.description}>{stripHtml(project.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </section >
  );
};

export default Projects;
