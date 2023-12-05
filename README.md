# pubsub-unwrapper

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=extenda_pubsub-unwrapper&metric=alert_status&token=b470bc3eeb211b83f4a2adfd548ac5abf2eef0e4)](https://sonarcloud.io/dashboard?id=extenda_pubsub-unwrapper)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=extenda_pubsub-unwrapper&metric=coverage&token=b470bc3eeb211b83f4a2adfd548ac5abf2eef0e4)](https://sonarcloud.io/dashboard?id=extenda_pubsub-unwrapper)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=extenda_pubsub-unwrapper&metric=code_smells&token=b470bc3eeb211b83f4a2adfd548ac5abf2eef0e4)](https://sonarcloud.io/dashboard?id=extenda_pubsub-unwrapper)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=extenda_pubsub-unwrapper&metric=duplicated_lines_density&token=b470bc3eeb211b83f4a2adfd548ac5abf2eef0e4)](https://sonarcloud.io/dashboard?id=extenda_pubsub-unwrapper)
[![WorkFlow](https://github.com/extenda/pubsub-unwrapper/actions/workflows/commit.yaml/badge.svg)](https://github.com/extenda/pubsub-unwrapper/actions)

## :wrench: Local development environment

* Node 18

## :nut_and_bolt: Configuration

Available environmental variables that can be set in the application:

* `PORT` (3000) - the exposed HTTP port.

## :notebook_with_decorative_cover: Usage and Examples

The unwrapper works by inspecting the PubSub `subscription` field, and maps it against the
subscription names configured as environmental variables. It will strip off the project id
and replace hyphen with lower-case; `test-subscription` becomes `TEST_SUBSCRIPTION`.

### Docker compose

To set up the unwrapper within a docker compose you could use the following configuration:

```yaml
pubsub-unwrapper:
  image: extenda/pubsub-unwrapper
  environment:
    TEST_SUBSCRIPTION: http://localhost:8080/api/v1/endpoint-of-choice
    OTHER_SUBSCRIPTION: http://localhost:8080/api/v1/other-endpoint-of-choice
  ports:
    - "3000:3000"
```

### Plain Docker

To run the service locally, you need a docker environment.\
You will also be running a local PubSub emulator.

Build the docker image:
```bash
docker build . -t unwrapper:latest
```

Run the docker image:
```bash
docker run -p 3000:3000 -it --rm -e TEST_SUBSCRIPTION=http://localhost:8080/api/v1/endpoint-of-choice unwrapper:latest
```

## :information_desk_person: Contribution

If you want to improve on the project, we appreciate feedback and contributions. But we ask of you to first follow or development environment guides.

* Commit messages must follow [conventional commits](https://conventionalcommits.org)
* [SonarCloud](https://sonarcloud.io/dashboard?id=extenda_structurizr-to-png) quality gates must pass for all pull requests
