# fga-transformer-cli

fga-transformer-cli is a simple wrapper around the [openfga syntax-transformer](https://github.com/openfga/syntax-transformer) library to enable programatic transformation of dsls.

This is useful in situations such as a pipeline.

## Options to run
This can be run from Node, or from the helper docker container

### Node: Prerequisites
- Node 18 LTS
- NPM or Yarn

### Node: How to Use
Install the package:
```bash
npm install @ozee-io/fga-transformer-cli

git clone git@github.com:Ozee-io/fga-transformer-cli.git
cd fga-transformer-cli
yarn install && yarn link
openfga-syntax-transformer  --source "my/source/file.dsl" --target "my/destination/file.json"
```
### Docker: Prerequisites
- Docker

### Docker: How to use
```bash
docker pull ghcr.io/ozee-io/openfga-syntax-transformer
# or
git clone git@github.com:Ozee-io/fga-transformer-cli.git
docker build -t openfga-syntax-transformer .
docker run -v ${PWD}:/app openfga-syntax-transformer  --source "my/source/file.dsl" --target "my/destination/file.json"
openfga-syntax-transformer  --source "test/valid.dsl" --target "openfga.json"
```
