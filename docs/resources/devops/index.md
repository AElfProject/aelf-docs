---
sidebar_position: 9
title: DevOps
description: Tools to build and deploy efficiently
image: /img/Logo.aelf.svg
---

# DevOps

## Open Source Development

At aelf, we prioritize openness and transparency in our development process. Our project is fully open source, and we share our code and current issues online. This approach helps keep our project accessible to everyone.

### Collaborative Standard

We value collaboration and welcome contributions and feedback. However, to maintain high standards, we ask all collaborators to follow these guidelines:

1. **Understand aelf**: Before contributing, read our white paper and documentation to understand the core concepts and architecture. Reviewing our code and existing functionalities is also recommended.
2. **Ask Questions**: If you have any questions, open an issue on GitHub. Clearly state what you need to clarify.
3. **Submit Pull Requests**: When you're ready to contribute, submit a pull request on GitHub. Our core team will review and discuss your submission. If approved, it will be merged into the project.

For more details, please refer to our [Code of Conduct](https://github.com/AElfProject/AElf/blob/dev/CODE_OF_CONDUCT.md).

## Deployment

We use the semantic versioning system (SemVer) for version control. For more information, visit [SemVer](https://semver.org).

### Daily Builds

We have a cron job integrated with GitHub that publishes the latest version of our development packages to MyGet. You can find them here:
- [MyGet: aelf-project-dev](https://www.myget.org/gallery/aelf-project-dev)

### Release Branch

For stable releases, our packages are available on NuGet:
- [NuGet: AElf](https://www.nuget.org/profiles/AElf)

## Testing

Testing is crucial for maintaining and improving software quality. We focus on two main types of testing: unit testing and performance testing.

### Unit Testing

Unit tests ensure the functionality and protocol integrity of our blockchain system. We use the xUnit framework and follow best practices to cover as much functionality as possible. For any new feature, we ensure it is covered by unit tests to prevent regressions and allow safe modifications.

### Performance Testing

Performance testing is vital for aelf, as speed is one of our system's key strengths. These tests help ensure that changes do not negatively impact the transaction and block processing speed of our nodes.

## Monitoring

### Server Monitoring

We use Zabbix to monitor server metrics such as CPU usage and database performance.

### Chain Monitoring

Our GitHub project includes a Grafana dashboard powered by InfluxDB for chain monitoring.

### Akka Monitoring

We monitor actors in our system using Akka.