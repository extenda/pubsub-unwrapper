# hiiretail-pubsub-unwrapper

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=extenda_hiiretail-pubsub-unwrapper&metric=alert_status&token=b9935bd45c2c8d6d588af0898aa0e468c7d814dd)](https://sonarcloud.io/dashboard?id=extenda_hiiretail-pubsub-unwrapper)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=extenda_hiiretail-pubsub-unwrapper&metric=coverage&token=b9935bd45c2c8d6d588af0898aa0e468c7d814dd)](https://sonarcloud.io/dashboard?id=extenda_hiiretail-pubsub-unwrapper)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=extenda_hiiretail-pubsub-unwrapper&metric=code_smells&token=b9935bd45c2c8d6d588af0898aa0e468c7d814dd)](https://sonarcloud.io/dashboard?id=extenda_hiiretail-pubsub-unwrapper)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=extenda_hiiretail-pubsub-unwrapper&metric=duplicated_lines_density&token=b9935bd45c2c8d6d588af0898aa0e468c7d814dd)](https://sonarcloud.io/dashboard?id=extenda_hiiretail-pubsub-unwrapper)
[![WorkFlow](https://github.com/extenda/hiiretail-pubsub-unwrapper/actions/workflows/commit.yaml/badge.svg)](https://github.com/extenda/hiiretail-pubsub-unwrapper/actions)

## :wrench: Local development environment

* Node 18

## :nut_and_bolt: Configuration

Available environmental variables that can be set in the application:

* `PORT` (3000) - the exposed HTTP port.

## :notebook_with_decorative_cover: Usage and Examples

### Docker compose

To set up the unwrapper within a docker compose you could use the following configuration:

```yaml
pubsub-unwrapper:
  image: eu.gcr.io/extenda/hiiretail-pubsub-unwrapper
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

## :construction_worker: Maintainers
Maintainer for this project are the `architects`. Please direct questions and discussions to our official [channel](https://join.slack.com/share/enQtNjI5NzU5OTY4ODMwOC0zM2M0ZDFjOThkMWU3NzQ2MjFlZjFjNjVkNTdiNDIxNWJlNmQ3ZmI1OWJiNWNmOTMzOGEwYTViYzE3NTVhNTZj) on Slack.

## :information_desk_person: Contribution
If you want to improve on the project, we appreciate feedback and contributions. But we ask of you to first follow or development environment guides.
Pull-requests needs to be reviewed by someone from the team before changes can be merged.
