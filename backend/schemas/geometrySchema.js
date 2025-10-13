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

module.exports = {
    type: 'OBJECT',
    properties: {
        question: { type: 'STRING' },
        choices: {
            type: 'ARRAY',
            items: { type: 'STRING' }
        },
        choiceRationales: {
            type: 'ARRAY',
            items: { type: 'STRING' }
        },
        answerIndex: { type: 'NUMBER' },
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
    },
    required: ['question', 'choices', 'answerIndex', 'geometrySpec'],
    SUPPORTED_SHAPES
};
