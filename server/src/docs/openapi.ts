export const openApiSpec = {
  openapi: "3.0.3",

  info: {
    title: "CRM AI Importer API",
    version: "1.0.0",
    description:
      "REST API for uploading CSV files, AI-powered CRM normalization, and import management.",
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Local Development",
    },
  ],

  tags: [
    {
      name: "Imports",
      description: "Import management APIs",
    },
    {
      name: "Health",
      description: "Health check APIs",
    },
  ],

  paths: {
    "/imports": {
      post: {
        tags: ["Imports"],
        summary: "Upload CSV",
        description: "Upload a CSV file and generate a preview.",
        responses: {
          "201": {
            description: "CSV uploaded successfully.",
          },
        },
      },

      get: {
        tags: ["Imports"],
        summary: "List imports",
        description: "Returns paginated import history.",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 10,
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },

    "/imports/{id}": {
      get: {
        tags: ["Imports"],
        summary: "Get import",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },

    "/imports/{id}/process": {
      post: {
        tags: ["Imports"],
        summary: "Process import",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "202": {
            description: "Queued",
          },
        },
      },
    },

    "/imports/{id}/leads": {
      get: {
        tags: ["Imports"],
        summary: "List imported leads",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 10,
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },

    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Application is healthy.",
          },
        },
      },
    },
  },
};
console.log(JSON.stringify(openApiSpec, null, 2));