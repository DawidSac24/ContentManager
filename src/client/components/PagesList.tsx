import { PageListProps } from "../Props";

function PagesList({ context, showPageList, setShowPageList }: PageListProps) {
  function shortenString(input: string): string {
    return input.length > 22 ? input.slice(0, 19) + "..." : input;
  }

  const imgClass = `h-6 w-6 transition-transform duration-300 ease-in-out ${
    showPageList ? "rotate-180" : "rotate-0"
  }`;

  return (
    <div
      onClick={setShowPageList}
      className="max-h-36 flex flex-col items-center justify-evenly"
    >
      <div className="h-12 w-40 flex flex-row items-center justify-evenly cursor-pointer">
        <h3 className="font-(family-name:--modernist)">
          {showPageList ? "hide page list" : "show page list"}
        </h3>
        <img className={imgClass} src="/assets/images/arrow.png" alt="" />
      </div>

      <div
        className={`${showPageList ? "h-32" : "h-0"} w-40
        bg-neutral-900 rounded-lg
        transition-all duration-500 ease-in-out 
        overflow-hidden`}
      >
        <ul
          className="list-container h-full w-[97%]
        flex flex-col gap-2
        overflow-auto cursor-default"
        >
          {context.pages.map((page, index) => (
            <li
              key={index}
              className="h-[22px] w-fit pl-4 pt-2 pb-2
              text-sm font-(family-name:--modernist) 
              cursor-default"
            >
              {shortenString(page.title)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PagesList;
