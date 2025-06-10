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
        className={`transition-all duration-500 ease-in-out ${
          showPageList ? "h-32" : "h-0"
        } overflow-hidden w-40`}
      >
        <ul className="list-container min-h-12 max-h-48 overflow-auto flex flex-col justify-evenly gap-2">
          {context.pages.map((page, index) => (
            <li
              key={index}
              className="h-3 p-2 text-sm font-(family-name:--modernist)"
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
