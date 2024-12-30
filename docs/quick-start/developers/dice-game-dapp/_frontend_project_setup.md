### Project Setup

Let's start by cloning the frontend project repository from github.

```bash title="Terminal"
git clone https://github.com/AElfProject/aelf-samples.git
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd aelf-samples/dice/2-dapp
```

- Once you're inside the `2-dapp` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

export const tree = {
"type": "directory",
"uri": "2-dapp",
"expanded": true,
"children": [
{
"type": "directory",
"uri": "._tests.__"
},
{
"type": "directory",
"uri": ".github"
},
{
"type": "directory",
"uri": ".husky"
},
{
"type": "directory",
"uri": "public"
},
{
"type": "directory",
"uri": "src"
},
{
"type": "file",
"uri": ".dockerignore"
},
{
"type": "file",
"uri": ".env.development"
},
{
"type": "file",
"uri": ".env.production"
},
{
"type": "file",
"uri": ".eslintrc.json"
},
{
"type": "file",
"uri": ".gitignore"
},
{
"type": "file",
"uri": ".prettierrc"
},
{
"type": "file",
"uri": ".stylelintrc.json"
},
{
"type": "file",
"uri": "appsettings.ts"
},
{
"type": "file",
"uri": "commitlint.config.js"
},
{
"type": "file",
"uri": "docker-compose.yml"
},
{
"type": "file",
"uri": "Dockerfile"
},
{
"type": "file",
"uri": "jest.config.ts"
},
{
"type": "file",
"uri": "jest.setup.ts"
},
{
"type": "file",
"uri": "next.config.mjs"
},
{
"type": "file",
"uri": "nginx-template.conf"
},
{
"type": "file",
"uri": "nginx.template.md"
},
{
"type": "file",
"uri": "package.json"
},
{
"type": "file",
"uri": "pm2.config.js"
},
{
"type": "file",
"uri": "pnpm-lock.yaml"
},
{
"type": "file",
"uri": "postcss.config.mjs"
},
{
"type": "file",
"uri": "README.md"
},
{
"type": "file",
"uri": "sentry.client.config.ts"
},
{
"type": "file",
"uri": "sentry.edge.config.ts"
},
{
"type": "file",
"uri": "sentry.server.config.ts"
},
{
"type": "file",
"uri": "tailwind.config.ts"
},
{
"type": "file",
"uri": "tsconfig.json"
},
]
}

<div style={{height: 1000}}><FileTree tree={tree} /></div>

#### Install necessary libraries

- Run this command in the terminal to install all necessary packages and libraries:

```bash title="Terminal"
npm install
```

We are now ready to build the frontend components of our Dice Game.
