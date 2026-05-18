# gj-boomlings-api

A re-imagined, high-performance, dependency-free Geometry Dash 2.2 API wrapper for Node.js and TypeScript.

## Installation

\`\`\`bash
npm install gj-boomlings-api
\`\`\`

## Quick Start

\`\`\`javascript
import { GeometryDashClient } from "gj-boomlings-api";

const gd = new GeometryDashClient();
const level = await gd.downloadLevel(105657410);
console.log(level.name);
\`\`\`
