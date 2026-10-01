const menu = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export function TitleBar() {
  return (
    <div className="flex h-9 shrink-0 items-center gap-4 border-b border-[#d4d4d4] bg-[#dddddd] px-3 text-[13px] text-[#3b3b3b]">
      <div className="flex gap-2">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <nav className="flex gap-4">
        {menu.map((item) => (
          <span key={item} className="cursor-default select-none hover:text-black">
            {item}
          </span>
        ))}
      </nav>
    </div>
  );
}
