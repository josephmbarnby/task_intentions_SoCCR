# Intentions Game 🧠 API

Run computations for the Intentions Game on a remote server. Uses `RestRserve` to start an R-based API endpoint.

`functions.R` contains all functions for computations for the Intentions Game. `run.R` starts the API endpoint and configures the URL.

## Usage

After installing all dependencies, run:

```bash
$ Rscript run.R
...
```

As defined in `run.R`, the endpoint by default will listen on port 8000 via the endpoint `/task/intentions`.

Additional configuration is required when deploying this endpoint in an online scenario.
