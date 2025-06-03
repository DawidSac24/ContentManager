import "../styles/PagesList.css";

import { PageListProps } from "../Props";

function PagesList({ context, showPageList, setShowPageList }: PageListProps) {
  function shortenString(input: string): string {
    return input.length > 30 ? input.slice(0, 27) + "..." : input;
  }

  const pageTitle = (
    <div className="show-pages-button">
      <h3 className="page-list-tittle">
        {showPageList ? "pages list" : "show pages list"}
      </h3>
      <img className="arrow-img" src="/images/arrow.png" alt="" />
    </div>
  );

  return (
    <button onClick={setShowPageList} className="page-list-container">
      {showPageList ? (
        <ul className="page-list">
          pageTitle
          {context.pages.map((page) => (
            <li className="page">{shortenString(page.title)}</li>
          ))}
        </ul>
      ) : (
        pageTitle
      )}
    </button>
  );
}
export default PagesList;
