const createClient = {
  post: {
    tags: ['Client'],
    summary: 'Create a new client',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Client',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Client created successfully',
      },
      400: {
        description: 'Bad Request',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
};

const getUpdateClient = {
  get: {
    tags: ['Client'],
    summary: 'Get client information',
    responses: {
      200: {
        description: 'Client information retrieved successfully',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
  put: {
    tags: ['Client'],
    summary: 'Update client information',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Client',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Client information updated successfully',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
};

const favoriteDish = {
  post: {
    tags: ['Client'],
    summary: 'Add a favorite dish for the client',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Client',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Favorite dish added successfully',
      },
      400: {
        description: 'Bad Request',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
  get: {
    tags: ['Client'],
    summary: 'Get client favorite dishes',
    responses: {
      200: {
        description: 'Client favorite dishes retrieved successfully',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
};

const deleteFavDish = {
  delete: {
    tags: ['Client'],
    summary: 'Delete a favorite dish from the client',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Favorite dish deleted successfully',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
};

const orderHistory = {
  get: {
    tags: ['Client'],
    summary: 'Get client order history',
    responses: {
      200: {
        description: 'Client order history retrieved successfully',
      },
      500: {
        description: 'Server Error',
      },
    },
  },
};

module.exports = {
  createClient,
  getUpdateClient,
  favoriteDish,
  deleteFavDish,
  orderHistory,
};
