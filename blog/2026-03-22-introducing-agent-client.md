---
title: "Introducing AgentClient: A Powerful Async Client for Your AI Agents"
authors: [vinodkumarkp]
tags: [announcement, new-feature, agent-client, python]
---

We are thrilled to announce the release of `AgentClient`, a new asynchronous Python client designed to make interacting with AI agent servers easier, more reliable, and more efficient.

Whether you are building a complex multi-agent system or a simple tool server, `AgentClient` provides the robust foundation you need to manage communication and server lifecycles with ease.

<!--truncate-->

## The Challenge: Managing Agent Communication

As AI agent architectures become more common, developers face a recurring challenge: how do you reliably connect to, communicate with, and manage the lifecycle of these agent servers? You need a solution that is:

-   **Performant**: Capable of handling many concurrent requests without getting blocked.
-   **Flexible**: Able to connect to both remote servers and manage local development servers.
-   **Robust**: Graceful in handling errors, timeouts, and unexpected server shutdowns.

## What is AgentClient?

`AgentClient` is our answer to these challenges. It is a high-level, asynchronous client built on `aiohttp` that provides a simple and powerful API for your agent communication needs.

### Key Features

-   🚀 **Asynchronous by Design**: Built from the ground up with `async/await`, `AgentClient` is non-blocking and perfect for high-performance applications.
-   🌐 **Dual-Mode Operation**: Seamlessly switch between connecting to a remote server or having the client automatically manage a local server process for you. This is perfect for both production and development environments.
-   🔒 **Clean Resource Management**: With the `async with` pattern, you can be confident that network connections and server processes are always cleaned up gracefully.
-   🔄 **Native Streaming Support**: Effortlessly handle server-sent events (SSE) for real-time, streaming responses from your agents.
-   ⚙️ **Robust Configuration**: Uses Pydantic for clear, validated, and type-hinted configuration. No more guesswork!
-   🧠 **Intelligent Defaults**: The client can automatically detect the host and port from your server's startup command, simplifying your setup.
-   ⚠️ **Custom Error Handling**: Get specific, meaningful exceptions like `ServerStartupError` and `ConnectionError` to make debugging a breeze.

## How to Use It

Getting started with `AgentClient` is simple. First, install it via pip:

```bash
pip install oai-agent-client
```

### Example 1: Connecting to a Remote Server

Here’s how you can connect to an agent that's already running on a remote server.

```python
import asyncio
from oai_agent_client import AgentClient, ClientConfig

async def main():
    config = ClientConfig(
        url="http://your-remote-server.com:8000",
        headers={"Authorization": "Bearer your_api_token"}
    )

    try:
        async with AgentClient(config=config) as client:
            # Make a simple, non-streaming call
            print("--- Invoke Example ---")
            response = await client.invoke("Hello, agent!")
            print(response)

            # Make a streaming call
            print("\n--- Stream Example ---")
            async for chunk in client.stream("Tell me a story."):
                print(chunk, end="", flush=True)
            print()

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(main())
```

### Example 2: Managing a Local Server

For local development, you can have `AgentClient` start and stop your server for you.

```python
import asyncio
from oai_agent_client import AgentClient, ClientConfig

async def main():
    # The client will run this command to start the server
    config = ClientConfig(
        command="python",
        args=["-m", "your_agent_server.main", "--port", "8903"],
        headers={"Authorization": "Bearer some_secret_token"}
    )

    try:
        # The client starts the server in the background
        async with AgentClient(config=config) as client:
            response = await client.invoke("Hello, local agent!")
            print(response)

    except Exception as e:
        print(f"An error occurred: {e}")
    # The server is automatically stopped here!

if __name__ == "__main__":
    asyncio.run(main())
```

## Get Started Today!

`AgentClient` is designed to streamline your development workflow and provide a reliable foundation for your AI applications.

Dive into the [**documentation**](/docs/development/Agent%20Client/overview) to learn more, and install it today to take it for a spin!
