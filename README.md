# get-post-hook

`get-post-hook` is a lightweight npm package that simplifies data fetching in React applications by providing custom hooks for making GET and POST requests using Axios.

## Installation

You can install `axios-promise-hook` via npm:

```bash
npm install axios-promise-hook
```

or using yarn:

```bash
npm install axios-promise-hook
```

## Usage

### Importing Hooks

You can import the useGet and usePost hooks from get-post-hookk:

```javascript
import { useGet, usePost } from "axios-promise-hook";
```

### Example Usage

Here's how you can use the hooks in your React components:

```javascript
const ExampleComponent = ({ token, body }) => {
  const { get } = useGet();
  const { post } = usePost();

  useEffect(() => {
    // Make a GET request
    get(
      "https://jsonplaceholder.typicode.com/todos/1",
      "Bearer Token",
      token
    ).then((response) => console.log(response.data));

    // Make a POST request
    post(
      "https://jsonplaceholder.typicode.com/posts",
      body,
      "application/json",
      "Bearer Token",
      token
    ).then((response) => console.log(response.data));
  }, [token, body]);

  return null;
};
```

If no authorization is needed in your URL you can simply skip passing authorization method and the token
