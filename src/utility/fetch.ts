import { Callback } from '../types';

export const fetchAsync = async <T, U>(base: string, path: string, method: 'GET' | 'POST', headers: Headers, body: U | null = null, successCallback: Callback<T>, failureCallback: Callback<Error>) => {
    const url = base + path;

    const options: RequestInit = {
        method: method,
        headers: headers
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    fetch(url, options)
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            response.text().then((data: string) => {
                if (data) {
                    successCallback(JSON.parse(data));
                } else {
                    (successCallback as Callback<void>)();
                }
            });
        })
        .catch((error: Error) => {
            failureCallback(error);
        });
};

export const getAsync = async <T>(base: string, path: string, headers: Headers, successCallback: Callback<T>, failureCallback: Callback<Error>) => {
    fetchAsync<T, null>(base, path, 'GET', headers, null, successCallback, failureCallback);
};

export const postAsync = async <T, U>(base: string, path: string, headers: Headers, body: U, successCallback: Callback<T>, failureCallback: Callback<Error>) => {
    fetchAsync<T, U>(base, path, 'POST', headers, body, successCallback, failureCallback);
};

export const genericSuccessCallback: Callback<unknown> = (response: unknown) => {
    console.warn('Unhandled success', response);
};

export const genericFailureCallback: Callback<Error> = (error: Error) => {
    console.error('Unhandled error', error);
};