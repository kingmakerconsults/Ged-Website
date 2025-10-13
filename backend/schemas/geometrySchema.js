module.exports = {
    type: 'object',
    properties: {
        shape: {
            type: 'string',
            enum: [
                'circle',
                'cone',
                'cylinder',
                'pyramid',
                'rectangle',
                'rectangular_prism',
                'trapezoid',
                'triangle'
            ]
        },
        dimensions: {
            type: 'object',
            minProperties: 1,
            additionalProperties: { type: 'number' }
        },
        questionText: { type: 'string' },
        answer: { type: 'number' },
        answerOptions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    text: { type: 'string' },
                    isCorrect: { type: 'boolean' },
                    rationale: { type: 'string' }
                },
                required: ['text', 'isCorrect', 'rationale']
            }
        },
        choices: {
            type: 'array',
            items: { type: 'number' }
        }
    },
    required: ['shape', 'dimensions', 'questionText'],
    additionalProperties: true,
    allOf: [
        {
            if: {
                properties: { dimensions: { type: 'object' } }
            },
            then: {
                properties: {
                    dimensions: {
                        patternProperties: {
                            '^.*$': {
                                type: 'number'
                            }
                        }
                    }
                }
            }
        }
    ]
};
