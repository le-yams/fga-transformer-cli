# fga-transformer-cli
[![Node.js CI](https://github.com/Ozee-io/fga-transformer-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/Ozee-io/fga-transformer-cli/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Ozee-io_fga-transformer-cli&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Ozee-io_fga-transformer-cli)

<img src="https://www.ozee.io/logos/vector/Ozee_logo_2c.svg" alt="drawing" width="200"/>

fga-transformer-cli is a simple wrapper around the [openfga syntax-transformer](https://github.com/openfga/syntax-transformer) library to enable programatic transformation of OpenFGA DSLs to the JSON syntax.

This is useful in situations such as a pipeline.

## Options to run
This can be run from Node, or from the helper docker container

### Node
#### Prerequisites
- Node 18 LTS
- NPM or Yarn

#### Install
```bash
npm install @ozee-io/fga-transformer-cli

git clone git@github.com:Ozee-io/fga-transformer-cli.git
cd fga-transformer-cli
yarn install && yarn link
```

#### Run
```bash
fga-transformer-cli  --source "my/source/file.dsl" --target "my/destination/file.json"
```

The generated JSON can also be output in the console by specifying the `--verbose` option.


### Docker
#### Prerequisites
- Docker

#### Install
```bash
docker pull ghcr.io/ozee-io/openfga-syntax-transformer
# or build locally
git clone git@github.com:Ozee-io/fga-transformer-cli.git
docker build -t fga-transformer-cli .
```

#### Consume
```bash
docker run -v ${PWD}:/app fga-transformer-cli  --source "my/source/file.dsl" --target "my/destination/file.json"
```
