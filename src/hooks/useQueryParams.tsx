import { useCallback, useEffect } from 'react';

let search = window.location.search;

const useQueryParams = (whitelist?: string[]) => {
    // State to trigger re-renders

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        if (whitelist) {
            // Remove any non-whitelisted query params
            let hasChanges = false;
            searchParams.forEach((_, key) => {
                if (!whitelist.includes(key)) {
                    searchParams.delete(key);
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                updateURL(searchParams);
            }
        }

        if (searchParams.size == 0) {
            updateURL(searchParams);
        }
    }, [whitelist, search]);

    const readQueryParam = useCallback(
        (param: string) => {
            const searchParams = new URLSearchParams(search);
            const value = searchParams.get(param);
            // Return the boolean types or a string
            if (value == 'true') {
                return true;
            } else if (value == 'false') {
                return false;
            } else {
                return value;
            }
        },
        [search]
    );

    const readAllQueryParams = useCallback(() => {
        const searchParams = new URLSearchParams(search);
        const query: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            query[key] = value;
        });
        return query;
    }, [search]);

    const setQueryParam = useCallback(
        (param: string, value: string | null) => {
            const searchParams = new URLSearchParams(search);
            if (value == null || value == 'null' || value == '') {
                searchParams.delete(param);
            } else {
                searchParams.set(param, value);
            }

            updateURL(searchParams);
        },
        [search]
    );

    const updateURL = useCallback(
        (searchParams: URLSearchParams) => {
            // Remove '?' if no search params are present
            const searchString = searchParams.size > 0 ? `${searchParams.toString()}` : '';
            const newUrl = `${window.location.pathname}${searchString == '' ? '' : `?${searchString}`}`;
            window.history.replaceState({}, '', newUrl);

            // Manually trigger setSearch to update the state and re-render dependent components
            search = searchString;
        },
        [search]
    );

    return { readQueryParam, readAllQueryParams, setQueryParam };
};

export { useQueryParams };
