"use client"
import Link from "next/link";
import Image from "next/image";
import useStore from "@/stores/useStore";
import { useApiQuery } from "@/hooks/useApi";
import { useApiMutation } from "@/hooks/useApi";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
interface ProjectsResponse {
  result: {
    id: number,
    address: string,
    email: string,
    facebook_url: string,
    instagram_url: string,
    phone_number: string,
    telegram_url: string,
    youtube_url: string
  }
}
interface FormData {
  phone_number: string;
}
const links = [
  { title: 'news', path: "/news" },
  { title: "questions", path: "/questions" },
  { title: 'videos', path: "/media" },
  { title: 'normative_documents', path: "/normative-documents" },
]
const Footer = () => {
  const [formData, setFormData] = useState({
    phone_number: ""
  })
  const { setSelectedCommission, selectedCommission } = useStore()
  const t = useTranslations("Footer")
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone_number") {
      let phoneValue = value;
      if (!phoneValue.startsWith("+998")) {
        phoneValue = "+998" + phoneValue.replace(/\D/g, "").slice(0, 9);
      } else {
        phoneValue = phoneValue.slice(0, 13);
      }
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const { data, isLoading, error } = useApiQuery<ProjectsResponse>(
    "/base/contact/",
  );
  const mutation = useApiMutation<{ success: boolean }, FormData>('/appeal/');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.phone_number) {
      try {
        await toast.promise(
          mutation.mutateAsync({ ...formData }),
          {
            loading: 'Murojaat yuborilmoqda...',
            success: 'Murojaat muvaffaqiyatli yuborildi!',
            error: 'Murojaat yuborishda xatolik yuz berdi.',
          }
        );
        setFormData({ phone_number: "" })
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Iltimos, barcha maydonlarni to'g'ri to'ldiring.");
    }
  }
  return (
    <footer>
      <Toaster position="top-right" />
      <div className="container flex sm:py-[84px] py-[40px] justify-between flex-col sm:flex-row sm:gap-0 gap-8">
        <div className="flex flex-col gap-5">
          <div>
            <ul className="flex gap-8 sm:flex-row flex-col">
              {
                links.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      onClick={
                        () => {
                          if (selectedCommission.id !== null) {
                            setSelectedCommission(0, 1, selectedCommission.id);
                          }
                        }}
                      className="lg:text-[20px] text-[18px]  font-medium"
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="sm:text-lg text-[12px]">
            <div className="flex items-center gap-[13px]">
              <b>{t("address")}:</b>
              <Link href="">{data?.result?.address}</Link>
            </div>
            <div className="flex items-center gap-[13px]">
              <b>{t("tel")}:</b>
              <Link href="tel:+998110227031">{data?.result?.phone_number}</Link>
            </div>
            <div className="flex items-center gap-[13px]">
              <b>{t("email")}:</b>
              <Link href="mailto:hello@thebox">{data?.result?.email}</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <label className="font-semibold text-lg" htmlFor="subscribe">
              {t("retryConnect")}
            </label>
            <div className="mt-5 flex gap-2">
              <input
                className="w-[280px] py-4 px-2 rounded-lg border focus:outline-none"
                type="tel"
                placeholder="Phone number"
                id="subscribe"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="primary-bg text-white-900 py-4 px-7 rounded-lg"
              >
                {t("subscribe")}
              </button>
            </div>
          </form>
          <div className="mt-[27px]">
            <b className="text-lg">{t("socialMedia")}</b>
            <div className="flex items-center gap-5 mt-5">
              <Link href={data?.result?.facebook_url ?? "#"} target="_blank">
                <Image
                  width={40}
                  height={40}
                  src="/icons/facebook.svg"
                  alt=""
                />
              </Link>
              <Link href={data?.result?.instagram_url ?? "#"} target="_blank">
                <Image
                  width={40}
                  height={40}
                  src="/icons/instagram.svg"
                  alt=""
                />
              </Link>
              <Link href={data?.result?.telegram_url ?? "#"} target="_blank">
                <Image
                  width={40}
                  height={40}
                  src="/icons/telegram.svg"
                  alt=""
                />
              </Link>
              <Link href={data?.result?.youtube_url ?? "#"} target="_blank">
                <Image
                  width={40}
                  height={40}
                  src="/icons/youtube.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="primary-black-bg py-6">
        <div className="container flex items-start sm:items-center sm:gap-0 gap-3 justify-between sm:flex-row flex-col ">
          <p className=" text-white-900">
            {t("copyright")}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-white-900">Powered by</p>
            <Image src="/images/zerodev-logo.png" alt="" width={85} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
