import axios, { AxiosError, AxiosResponse } from "axios";

// Define types
type AuthenticationMechanismsTypes = 'Basic' | 'Bearer Token' | 'API Key' | 'Digest' | 'JWT' | 'AWS Signature' | 'OAuth';
type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

const usePost = () => {
    /**
     * Performs a POST request to retrieve data from the specified URL.
     * @param {string} url The URL to fetch data from.
     * @param {any} data The data that you willing to send.
     * @param {AuthenticationMechanismsTypes} AuthenticationMechanisms The authentication mechanism to use. Leave undefined if the URL is public.
     * @param {ContentType} contentType The ContentType to use.
     * @param {string} token The authentication token. Required if AuthenticationMechanisms is provided.
     * @returns {Promise<AxiosResponse>} A Promise that resolves with the API call result.
     */
    const post = (url: string, data: any, contentType: ContentType, AuthenticationMechanisms?: AuthenticationMechanismsTypes, token?: string): Promise<AxiosResponse> => {
        // Function to generate the authorization header based on the authentication mechanism
        const generateAuthorizationMethod = (AuthenticationMechanism: AuthenticationMechanismsTypes | undefined, token: string | undefined): string => {
            if (AuthenticationMechanism && token) {
                switch (AuthenticationMechanism) {
                    case 'Basic':
                        return `Basic ${token}`;
                    case 'Bearer Token':
                        return `Bearer ${token}`;
                    case 'API Key':
                        return `API-Key ${token}`;
                    case 'Digest':
                        return `Digest ${token}`;
                    case 'JWT':
                        return `Bearer ${token}`;
                    case 'AWS Signature':
                        return `AWS4-HMAC-SHA256 ${token}`;
                    case 'OAuth':
                        return `OAuth ${token}`;
                }
            }
            return '';
        };
        // Function to generate the content type header
        const generateContentType = (contentType?: ContentType): string => {
            if (contentType) {
                switch (contentType) {
                    case 'application/json':
                        return `application/json`;
                    case 'application/x-www-form-urlencoded':
                        return `application/x-www-form-urlencoded`;
                    case 'multipart/form-data':
                        return `multipart/form-data`;
                    case 'text/plain':
                        return `text/plain`;
                }
            }
            return '';
        };

        // Return a Promise that resolves with the AxiosResponse or rejects with an AxiosError
        return new Promise<AxiosResponse>((resolve, reject) => {
            axios.post(url, data, {
                headers: {
                    Authorization: generateAuthorizationMethod(AuthenticationMechanisms, token),
                    "Content-Type": generateContentType(contentType),
                }
            })
                .then((response: AxiosResponse) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    };

    return { post };
};

export default usePost;
