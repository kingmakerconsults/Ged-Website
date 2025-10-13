const SUPPORTED_SHAPES = [
    'triangle',
    'right_triangle',
    'rectangle',
    'circle',
    'polygon',
    'regular_polygon',
    'line_angle',
    'cylinder_net',
    'rect_prism_net'
];

const BASE_SCHEMA = {
    type: 'OBJECT',
    properties: {
        question: { type: 'STRING' },
        choices: {
            type: 'ARRAY',
            items: { type: 'STRING' }
        },
        answerIndex: { type: 'NUMBER' }
    },
    required: ['question', 'choices', 'answerIndex']
};

const FIGURE_PROPERTIES = {
    choiceRationales: {
        type: 'ARRAY',
        items: { type: 'STRING' }
    },
    geometrySpec: {
        type: 'OBJECT',
        properties: {
            shape: { type: 'STRING', enum: SUPPORTED_SHAPES },
            params: { type: 'OBJECT' },
            style: { type: 'OBJECT' },
            view: { type: 'OBJECT' }
        },
        required: ['shape', 'params']
    }
};

const buildGeometrySchema = (figuresEnabled = true) => {
    if (!figuresEnabled) {
        return {
            ...BASE_SCHEMA,
            properties: { ...BASE_SCHEMA.properties },
            required: [...BASE_SCHEMA.required]
        };
    }

    return {
        ...BASE_SCHEMA,
        properties: {
            ...BASE_SCHEMA.properties,
            ...FIGURE_PROPERTIES
        },
        required: [...BASE_SCHEMA.required, 'geometrySpec']
    };
};

module.exports = {
    buildGeometrySchema,
    SUPPORTED_SHAPES
};
