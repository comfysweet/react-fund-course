import {useMemo} from "react";

export const usePagesArrays = (totalPages) => {
    return useMemo(() => {
        const array = []
        for (let i = 0; i < totalPages; i++) {
            array.push(i + 1)
        }
        return array
    }, [totalPages])
}