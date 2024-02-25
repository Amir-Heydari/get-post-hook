import axios, { AxiosError, AxiosResponse } from "axios";

// Define types
type AuthenticationMechanismsTypes = 'Basic' | 'Bearer Token' | 'API Key' | 'Digest' | 'JWT' | 'AWS Signature' | 'OAuth';
type AxiosHeaders = { [key: string]: string; };

const useGet = () => {
    /**
     * Performs a GET request to retrieve data from the specified URL.
     * @param {string} url The URL to fetch data from.
     * @param {AuthenticationMechanismsTypes} AuthenticationMechanisms The authentication mechanism to use. Leave undefined if the URL is public.
     * @param {string} token The authentication token. Required if AuthenticationMechanisms is provided.
     * @returns {Promise<AxiosResponse>} A Promise that resolves with the API call result.
     */
    const get = (url: string, AuthenticationMechanisms?: AuthenticationMechanismsTypes, token?: string): Promise<AxiosResponse> => {
        // Function to generate the authorization header based on the authentication mechanism
        const generateAuthorizationMethod = (AuthenticationMechanism: AuthenticationMechanismsTypes | undefined, token: string | undefined): AxiosHeaders => {
            if (AuthenticationMechanism && token) {
                switch (AuthenticationMechanism) {
                    case 'Basic':
                        return { Authorization: `Basic ${token}` };
                    case 'Bearer Token':
                        return { Authorization: `Bearer ${token}` };
                    case 'API Key':
                        return { Authorization: `API-Key ${token}` };
                    case 'Digest':
                        return { Authorization: `Digest ${token}` };
                    case 'JWT':
                        return { Authorization: `Bearer ${token}` };
                    case 'AWS Signature':
                        return { Authorization: `AWS4-HMAC-SHA256 ${token}` };
                    case 'OAuth':
                        return { Authorization: `OAuth ${token}` };
                }
            }
            return {};
        };

        // Return a Promise that resolves with the AxiosResponse or rejects with an AxiosError
        return new Promise<AxiosResponse>((resolve, reject) => {
            axios.get(url, {
                headers: generateAuthorizationMethod(AuthenticationMechanisms, token),
            })
                .then((response: AxiosResponse) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    };

    return { get };
};

export default useGet;
