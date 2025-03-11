
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: PST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 created status code
    deactivate server

```