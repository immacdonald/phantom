import { useCallback, useEffect, useRef } from 'react';
import useBackButton from './useBackButton';
import { Callback } from '../types';

const useQueryParams = (whitelist?: string[], onUpdate?: Callback<any>) => {
    const search = useRef<string>(window.location.search);

    useBackButton(() => {
        evaluate();
    });

    const evaluate = () => {
        search.current = window.location.search;
        const searchParams = new URLSearchParams(search.current);
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

        if (onUpdate) {
            const val = readAllQueryParams()
            onUpdate(val);
        }

    }

    // State to trigger re-renders
    useEffect(() => {
        evaluate();
    }, [whitelist, search.current, onUpdate]);

    const readQueryParam = useCallback(
        (param: string) => {
            const searchParams = new URLSearchParams(search.current);
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
        [search.current, onUpdate]
    );

    const readAllQueryParams = useCallback(() => {
        const searchParams = new URLSearchParams(search.current);
        const query: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            query[key] = value;
        });
        return query;
    }, [search.current, onUpdate]);

    const setQueryParam = useCallback(
        (param: string, value: string | null, push: boolean = false) => {
            const searchParams = new URLSearchParams(search.current);
            if (value == null || value == 'null' || value == '') {
                searchParams.delete(param);
            } else {
                searchParams.set(param, value);
            }

            updateURL(searchParams, push);
        },
        [search.current, onUpdate]
    );

    const updateURL = useCallback(
        (searchParams: URLSearchParams, push: boolean = false) => {
            // Remove '?' if no search params are present
            const searchString = searchParams.size > 0 ? `${searchParams.toString()}` : '';
            if (search.current != searchString) {
                const newUrl = `${window.location.pathname}${searchString == '' ? '' : `?${searchString}`}`;
                if (push) {
                    window.history.pushState({}, '', newUrl);
                } else {
                    window.history.replaceState({}, '', newUrl);
                }

                // Manually trigger setSearch to update the state and re-render dependent components
                search.current = searchString;
                evaluate();
            }
        },
        [search.current, onUpdate]
    );

    return { readQueryParam, readAllQueryParams, setQueryParam, onUpdate };
};

export { useQueryParams };
