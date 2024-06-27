---
sidebar_position: 1
title: Core Introduction
description: Overview of aelf, its architecture, and key features.
---

# Application Pattern

We follow generally accepted good practices in programming, especially those that align with our project needs. Some of these practices are specific to C#, while others pertain to general Object-Oriented Programming (OOP) principles like **SOLID** and **DRY**.

## Domain-Driven Design (DDD)

Although it's uncommon for blockchain projects, we adhere to a Domain-Driven Design (DDD) approach in our development style. This approach is partly due to the compatibility of our main framework with DDD, making it a natural design philosophy for us.

### Key Points of DDD:

- **Four Traditional Layers:**
  - **Presentation:** This corresponds to any type of dApp (Decentralized Application).
  - **Application:** Exposed services mapped to different domains.
  - **Domain:** Specific events related to our blockchain system and domain objects.
  - **Infrastructure:** Third-party libraries for database, networking, etc.

For more details, refer to our [coding standards](https://github.com/AElfProject/AElf/issues/1040) listed in our GitHub issue.

## Frameworks and Libraries

The primary programming language used for developing aelf is **C#**, and it's built with the **dotnet core** framework. This choice was made due to the excellent performance of the framework. Dotnet core is also cross-platform, supporting Windows, MacOS, and Linux. It is a dynamic and open-source framework, offering many advantages of modern development patterns and backed by major players in the IT industry.

### Key Frameworks and Tools:

- **ABP Framework:**

  - We use the [ABP](https://abp.io/documents/abp/latest/Index) application framework.
  - It is a natural fit for building blockchain nodes, which are sets of endpoints like RPC, P2P, and cross-chain communication, with higher-level protocols on top.

- **Testing:**

  - We use the **XUnit** framework for unit tests.
  - Additionally, we have custom-made frameworks for testing smart contracts.

- **Communication:**
  - For cross-chain and P2P network communication, we use **gRPC**.
  - We use **Protobuf** for serialization purposes.

By following these practices and utilizing these tools, we ensure that our development process is efficient, reliable, and scalable.
