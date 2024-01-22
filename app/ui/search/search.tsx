"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative w-[40vw]">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 "></div>
      <input
        type="text"
        id="default-search"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(ev) => handleSearch(ev.target.value)}
        className="block w-full rounded-sm border border-zinc-300 p-1 ps-3 text-sm text-gray-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500"
        placeholder="Pesquisar Notas"
      />
      <div className="absolute bottom-0 end-[0] rounded-lg  p-2 text-sm font-medium text-white focus:outline-none">
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8917 13.8464L7.47752 9.12144C7.12719 9.42144 6.72431 9.65894 6.26888 9.83393C5.81346 10.0089 5.32883 10.0964 4.81502 10.0964C3.54216 10.0964 2.46501 9.62469 1.58358 8.68119C0.70169 7.73719 0.260742 6.58394 0.260742 5.22144C0.260742 3.85894 0.70169 2.70569 1.58358 1.76169C2.46501 0.818186 3.54216 0.346436 4.81502 0.346436C6.08788 0.346436 7.16526 0.818186 8.04715 1.76169C8.92858 2.70569 9.3693 3.85894 9.3693 5.22144C9.3693 5.77144 9.28755 6.29019 9.12406 6.77769C8.96058 7.26519 8.7387 7.69644 8.45844 8.07144L12.8726 12.7964L11.8917 13.8464ZM4.81502 8.59644C5.69084 8.59644 6.43541 8.26844 7.04872 7.61244C7.66156 6.95594 7.96798 6.15894 7.96798 5.22144C7.96798 4.28394 7.66156 3.48694 7.04872 2.83044C6.43541 2.17444 5.69084 1.84644 4.81502 1.84644C3.9392 1.84644 3.19463 2.17444 2.58132 2.83044C1.96848 3.48694 1.66206 4.28394 1.66206 5.22144C1.66206 6.15894 1.96848 6.95594 2.58132 7.61244C3.19463 8.26844 3.9392 8.59644 4.81502 8.59644Z"
            fill="#9E9E9E"
          />
        </svg>
      </div>
    </div>
  );
}
