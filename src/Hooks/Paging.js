import Pagination from "react-js-pagination";
import Pagintion from "../styles/Pagination.css";

const Paging = ({ page, count, data, handlePageChange }) => {
  return (
    <div className="pagination">
      <Pagination
        activePage={page}
        itemsCountPerPage={count.per_page}
        totalItemsCount={count.total}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Paging;
