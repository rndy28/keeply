import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        scroll-behavior: smooth;
    }
    body {
        font-family: 'Manjari', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        background-color: ${(p) => p.theme.colorBackground};
        color: ${(p) => p.theme.colorText};
    }
    body.modal-exist {
        overflow: hidden;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-block: 0;
    }
    ul, li {
        list-style-type: none;
    }
    input, button {
        font-family: 'Poppins';
        font-size: inherit;
        border: none;
        outline: none;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #d1d1d1;
        border-radius: 1rem;
    }
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
    }
`;
