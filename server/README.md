# Intentions Game 🧠 API

Run computations for the Intentions Game on a remote server. Uses `RestRserve` to start an R-based API endpoint.

`functions.R` contains all functions for computations for the Intentions Game. `run.R` starts the API endpoint and configures the URL.

## Dependencies

- `doParallel`
- `dplyr`
- `logger`
- `jsonlite`
- `RestRserve`
- `matlab`
- `tidyverse`

## Usage

After installing all dependencies, run:

```Shell
Rscript run.R
```

As defined in `run.R`, the endpoint by default will listen on port 8000 via the endpoint `/task/intentions`.

Additional configuration is required when deploying this endpoint in an online scenario.

## Request Format

The API expects request to have two parameters:

1. Participant ID, in either string, float, or a mixture of formats.
2. Participant responses from Phase one of the intentions game. Originally stored as an array of JavaScript objects, the responses are serialized from JSON to a string.

An example set of parameters is given below:

| Parameter | Type | Example |
| --------- | ---- | ------- |
| `participantID` | `string` or `float` or `int` | `participantA1`, `12.34`, `1234` |
| `participantResponses` | `string` | `[{"ID":"NA","Trial":1,"ppt1":2,"par1":4,"ppt2":2,"par2":4,"Ac":1,"Phase":1}]` **Note:** This example is a list of responses containing only a single trial. |
