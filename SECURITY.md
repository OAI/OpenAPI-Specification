name: Sync OAS to ReadMe
on:
  push:
    branches:
      - master
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: readmeio/github-readme-sync@v2
        with:
          readme-oas-key: ${{ secrets. README_OAS_KEY }}
           
          # OPTIONAL CONFIG, use if necessary
          # oas-file-path: './swagger.json'
          # api-version: 'v1.0.0'
          
