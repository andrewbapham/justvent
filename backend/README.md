# Backend Server Development

## Setup
To setup the conda environment, first install conda. Then, from within the backend directory, create a new conda environment with the following command:

```bash
conda env create -f conda_env.yml
```

If you already have a conda environment setup, you can update it with the following command:

```bash
conda env update -f conda_env.yml
```

To activate the conda environment, run the following command:

```bash
conda activate hth
```

## Running the Server
To run the server, execute the following command within the backend directory:

```bash
fastapi run app.py
```

The server will be running at `http://localhost:8000`.
