# Jetton-Tact

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

**Install Dependencies**:
    ```bash
    npm install
    ```

**Build the Contract**:
    ```bash
    npx blueprint build
    ```

**Test the Contract**:
    ```bash
    npx blueprint test
    ```

**Deploy the Contract**:
    ```bash
    npx blueprint run
    ```

## Reference

1. [0074-jettons-standard](https://github.com/ton-blockchain/TEPS/blob/master/text/0074-jettons-standard.md)

## License

This project is licensed under the MIT License.
