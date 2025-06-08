import { PageListProps } from "../Props";

function PagesList({ context, showPageList, setShowPageList }: PageListProps) {
  function shortenString(input: string): string {
    return input.length > 22 ? input.slice(0, 19) + "..." : input;
  }

  const pageTitle = (
    <div className="h-12 w-40 flex flex-row items-center justify-evenly cursor-pointer">
      <h3 className="">{showPageList ? "pages list" : "show pages list"}</h3>
      <img className="h-6 w-6" src="/images/arrow.png" alt="" />
    </div>
  );

  return (
    <div
      onClick={setShowPageList}
      className="max-h-36 overflow-auto
    flex flex-col items-center justify-evenly"
    >
      {pageTitle}
      {showPageList ? (
        <ul className="list-container min-h-12 !max-h-48 !w-40 flex flex-col justify-evenly !overflow-auto gap-2">
          {context.pages.map((page) => (
            <li className="!h-3 p-2">{shortenString(page.title)}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
export default PagesList;
