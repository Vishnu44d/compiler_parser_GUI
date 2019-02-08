# Compiler (Development and Visualization of Compiler element)

#### A GUI to interact and use the compiler component

## Setup instructions

### Server

- #### Step 1 (optional but recommended)

  Create a python virtual environment by using virtualenv or conda (Requires python 3.6)

  ```bash
  conda create -n environment python3.6
  ```

  or

  ```bash
  python -m venv environment && .\Scripts\activate
  ```

  then

```bash
cd environment
```

- #### Step 2

  Clone this repo

  ```bash
  git clone https://github.com/Vishnu44d/compiler_parser_GUI && cd compiler_parser_GUI
  ```

- #### Step 3
  Install dependencies
  ```bash
  pip install -r requirements.txt
  ```
- #### Step 4

  - running the server
    ```bash
      python -m brython --server --port 8081
    ```

- #### Step 5
  - open the app in the browser by going to the link
    - http://localhost:8090
