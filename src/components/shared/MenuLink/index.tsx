"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import style from "./style.module.scss";
import useStore from "@/stores/useStore";
import { useTranslations } from "next-intl";

const Arrow = ({ color = "#FFFFFFB2", isOpen = false }: { color?: string; isOpen?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isOpen ? style.rotate : ""}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MenuLink = ({
  title,
  href,
  submenu: menu,
  isOpen,
  onClick,
  onClose,
}: {
  title: string;
  href: string;
  submenu?: { title: string; href: string, id: number }[];
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}) => {
  const t = useTranslations("Header")
  const pathname = usePathname();
  const router = useRouter()
  const isApplicationPage =
    pathname === "/appeal" || pathname === "/about";

  const { setSelectedCommission, selectedCommission } = useStore()

  return (
    <li className="relative lg:text-base text-sm">
      {menu ? (
        <button
          onClick={onClick}
          className={clsx(
            style.link,
            (pathname === href && selectedCommission.tab === 0 || selectedCommission.tab === 1) && style.active,
            isApplicationPage ? "text-white-500" : "text-white-700"
          )}
        >
          <span>{t(title)}</span>
          <Arrow color={isApplicationPage ? "#000000B2" : "#FFFFFFB2"} isOpen={isOpen} />
        </button>
      ) : (
        <Link
          href={href}
          className={clsx(
            style.link,
            pathname === href && style.active,
            isApplicationPage ? "text-white-500" : "text-white-700"
          )}
          onClick={() => {
            if (selectedCommission.id) {
              setSelectedCommission(0, 0, selectedCommission.id)
            }
            onClose()
          }}
        >
          <span>{t(title)}</span>
        </Link>
      )}

      {menu && isOpen && (
        <div className={style.dropdownList} role="listbox">
          {menu.map((item, index) => (
            <Link
              href={item.href}
              key={item.title}
              className={`${style.dropdownItem} `}
              onClick={() => {
                onClose();
                setSelectedCommission(Number(index), 0, item.id)
              }}
            >
              <Image src={"/icons/users.svg"} alt="" width={24} height={24} />
              <p>{t(item.title)}</p>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default MenuLink;