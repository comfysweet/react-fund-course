import React from 'react';
import {usePagesArrays} from "../../hooks/usePagesArray";

const Pagination = ({totalPages, page, changePage}) => {
    const pageArrays = usePagesArrays(totalPages)

    return (
        <div className={"page__wrapper"}>
            {pageArrays.map(p =>
                <span
                    onClick={(() => changePage(p))}
                    key={p} className={page === p ? 'page page__current' : 'page'}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;