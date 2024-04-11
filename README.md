## Booking App

This is a frontend only app to demo a booking app workflow.

## Architecture

The architecture of this app is based on react router architecture with nested routes. The goal is to:

- avoid the need of a global state to handle backend data: each route has its data and can be consumed by any child route.
- avoid the need to think on revalidate data: each action revalidate all the loaders automatically.
- provide a structure to handle UI errors and loading states: avoid to handle this in a per component basis.

```
        ┌──────────────┐         ┌───────────────────────────────┐
        │    LOADER    │         │           ACTION              │
        │    [GET]     │◄────────┤   [POST, PUT, PATCH, DELETE]  │
        │  fetch data  │         │         mutate data           │
        │              │         │   and revalidate all loaders  │
        └──────┬───────┘         └───────────────────────────────┘
               │                                ▲
               │    ┌──────────────────────┐    │
               │    │      COMPONENT       │    │
               └───►│     render data      ├────┘
                    │  and execute actions │
                    └──────────────────────┘
```

## Tests

There are unit tests for sensitive functions in the `/utils` folder, but the main way for test this app is handled by e2e tests.
