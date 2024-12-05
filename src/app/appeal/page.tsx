"use client"
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Links from "@/sections/common/Links";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useApiMutation } from "@/hooks/useApi";
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  phone_number?: string;
  email?: string;
  message?: string;
}

const Applications = () => {
  const t = useTranslations('Appeals')
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone_number: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const mutation = useApiMutation<{ success: boolean }, FormData>('/appeal/');
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
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name.trim()) {
      newErrors.full_name = t('validation_name');
    }
    if (!formData.phone_number.match(/^\+998\d{9}$/)) {
      newErrors.phone_number = t('validation_phone');
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t('validation_email');
    }
    if (!formData.message.trim()) {
      newErrors.message = t('validation_subject');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await toast.promise(
          mutation.mutateAsync(formData),
          {
            loading: t('loading'),
            success: t('success'),
            error: t('error'),
          }
        );
        setFormData({ full_name: "", phone_number: "", email: "", message: "" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error(t('validation'));
    }
  };

  const elements = [
    { title: "mainPage", path: "/" },
    { title: "appeals", path: "/appeals" },
  ];

  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434508616!2d144.95605431550464!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d6c5a3d6bcb5!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1638368973679!5m2!1sen!2sau`;

  return (
    <section>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-16">
          <BreadCrumb items={elements} type={0} />
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] text-[#2C2B38] font-bold mt-6 mb-8 lg:mb-[56px]">
            {t('leave_message')}
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="full_name"
                    placeholder={t('name')}
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1px] border-[#D0D5DD] p-[16px] outline-none"
                  />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder={t('phone')}
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1px] border-[#D0D5DD] p-[16px] outline-none"
                  />
                  {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('email')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1px] border-[#D0D5DD] p-[16px] outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="message"
                    placeholder={t('subject')}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1px] border-[#D0D5DD] p-[16px] outline-none"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="primary-bg text-white-900 py-4 px-5 rounded-lg w-full"
                >
                  {t('send')}
                </button>
              </form>
            </div>
            <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto">
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "30px" }}
                loading="lazy"
                // referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

            </div>
          </div>
        </div>
      </div>
      <Links />
    </section>
  );
};

export default Applications;

