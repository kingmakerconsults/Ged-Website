/**
 * Premade Geometry Figure Bank
 *
 * Each entry is a vetted geometrySpec with metadata.
 * The AI receives the figure and writes a GED-style question around it.
 *
 * Fields:
 *   id            – unique identifier
 *   difficulty     – "easy" | "medium" | "hard"
 *   topicHint      – topic string the AI sees (e.g. "area of triangles")
 *   questionType   – "area" | "perimeter" | "angle" | "surface_area" | "volume" | "pythagorean" | "composite_area" | "net"
 *   geometrySpec   – the exact spec rendered by GeometryFigure
 */

const GEOMETRY_FIGURES = [
  // ───────── TRIANGLES ─────────
  {
    id: 'tri-right-01',
    difficulty: 'easy',
    topicHint: 'area of a right triangle',
    questionType: 'area',
    geometrySpec: {
      shape: 'right_triangle',
      params: {
        points: [
          { label: 'A', x: 10, y: 70 },
          { label: 'B', x: 10, y: 15 },
          { label: 'C', x: 75, y: 70 },
        ],
        rightAngle: { vertex: 'A', size: 8 },
        sideLabels: [
          { between: ['A', 'B'], text: '12 ft' },
          { between: ['A', 'C'], text: '16 ft' },
        ],
      },
    },
  },
  {
    id: 'tri-right-02',
    difficulty: 'medium',
    topicHint: 'Pythagorean theorem',
    questionType: 'pythagorean',
    geometrySpec: {
      shape: 'right_triangle',
      params: {
        points: [
          { label: 'P', x: 10, y: 75 },
          { label: 'Q', x: 10, y: 20 },
          { label: 'R', x: 80, y: 75 },
        ],
        rightAngle: { vertex: 'P', size: 8 },
        sideLabels: [
          { between: ['P', 'Q'], text: '9 m' },
          { between: ['Q', 'R'], text: '?' },
          { between: ['P', 'R'], text: '12 m' },
        ],
      },
    },
  },
  {
    id: 'tri-right-03',
    difficulty: 'hard',
    topicHint: 'area and perimeter of a right triangle',
    questionType: 'area',
    geometrySpec: {
      shape: 'right_triangle',
      params: {
        points: [
          { label: 'D', x: 15, y: 80 },
          { label: 'E', x: 15, y: 10 },
          { label: 'F', x: 90, y: 80 },
        ],
        rightAngle: { vertex: 'D', size: 8 },
        sideLabels: [
          { between: ['D', 'E'], text: '24 in' },
          { between: ['D', 'F'], text: '32 in' },
          { between: ['E', 'F'], text: '40 in' },
        ],
      },
    },
  },
  {
    id: 'tri-scalene-01',
    difficulty: 'medium',
    topicHint: 'area of a triangle given base and height',
    questionType: 'area',
    geometrySpec: {
      shape: 'triangle',
      params: {
        points: [
          { label: 'A', x: 10, y: 70 },
          { label: 'B', x: 90, y: 70 },
          { label: 'C', x: 55, y: 12 },
        ],
        sideLabels: [{ between: ['A', 'B'], text: '18 cm' }],
        segments: [
          { from: [55, 12], to: [55, 70], label: 'h = 10 cm', dashed: true },
        ],
      },
    },
  },
  {
    id: 'tri-iso-01',
    difficulty: 'easy',
    topicHint: 'perimeter of a triangle',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'triangle',
      params: {
        points: [
          { label: 'X', x: 50, y: 10 },
          { label: 'Y', x: 10, y: 75 },
          { label: 'Z', x: 90, y: 75 },
        ],
        sideLabels: [
          { between: ['X', 'Y'], text: '13 m' },
          { between: ['X', 'Z'], text: '13 m' },
          { between: ['Y', 'Z'], text: '10 m' },
        ],
      },
    },
  },

  // ───────── RECTANGLES ─────────
  {
    id: 'rect-01',
    difficulty: 'easy',
    topicHint: 'area of a rectangle',
    questionType: 'area',
    geometrySpec: {
      shape: 'rectangle',
      params: {
        origin: { x: 10, y: 15 },
        width: 60,
        height: 35,
        labels: [
          { text: '15 ft', x: 40, y: 55 },
          { text: '8 ft', x: 75, y: 32 },
        ],
      },
    },
  },
  {
    id: 'rect-02',
    difficulty: 'easy',
    topicHint: 'perimeter of a rectangle',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'rectangle',
      params: {
        origin: { x: 10, y: 10 },
        width: 70,
        height: 30,
        labels: [
          { text: '24 m', x: 45, y: 45 },
          { text: '10 m', x: 85, y: 25 },
        ],
      },
    },
  },
  {
    id: 'rect-03',
    difficulty: 'medium',
    topicHint: 'area of a rectangle in a real-world context',
    questionType: 'area',
    geometrySpec: {
      shape: 'rectangle',
      params: {
        origin: { x: 8, y: 10 },
        width: 75,
        height: 45,
        labels: [
          { text: '30 yd', x: 46, y: 60 },
          { text: '18 yd', x: 88, y: 32 },
        ],
      },
    },
  },

  // ───────── CIRCLES ─────────
  {
    id: 'circle-01',
    difficulty: 'easy',
    topicHint: 'area of a circle',
    questionType: 'area',
    geometrySpec: {
      shape: 'circle',
      params: {
        center: { x: 50, y: 50 },
        radius: 30,
        radiusLabel: 'r = 7 in',
      },
    },
  },
  {
    id: 'circle-02',
    difficulty: 'easy',
    topicHint: 'circumference of a circle',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'circle',
      params: {
        center: { x: 50, y: 50 },
        radius: 28,
        radiusLabel: 'r = 5 cm',
      },
    },
  },
  {
    id: 'circle-03',
    difficulty: 'medium',
    topicHint: 'area of a circle given the diameter',
    questionType: 'area',
    geometrySpec: {
      shape: 'circle',
      params: {
        center: { x: 50, y: 50 },
        radius: 32,
        showRadius: false,
        points: [
          { label: 'A', x: 18, y: 50 },
          { label: 'B', x: 82, y: 50 },
        ],
        segments: [{ from: [18, 50], to: [82, 50], label: 'd = 14 ft' }],
      },
    },
  },
  {
    id: 'circle-04',
    difficulty: 'hard',
    topicHint: 'area of a semicircle or composite shape with a circle',
    questionType: 'area',
    geometrySpec: {
      shape: 'circle',
      params: {
        center: { x: 50, y: 50 },
        radius: 35,
        radiusLabel: 'r = 10 m',
        labels: [{ text: 'Find the area of the semicircle', x: 50, y: 92 }],
      },
    },
  },

  // ───────── TRAPEZOIDS ─────────
  {
    id: 'trap-01',
    difficulty: 'medium',
    topicHint: 'area of a trapezoid',
    questionType: 'area',
    geometrySpec: {
      shape: 'trapezoid',
      params: {
        points: [
          { label: 'A', x: 25, y: 20 },
          { label: 'B', x: 65, y: 20 },
          { label: 'C', x: 80, y: 65 },
          { label: 'D', x: 10, y: 65 },
        ],
        sideLabels: [
          { between: ['A', 'B'], text: '10 cm' },
          { between: ['D', 'C'], text: '18 cm' },
        ],
        heightLine: {
          from: { x: 45, y: 20 },
          to: { x: 45, y: 65 },
          label: 'h = 7 cm',
        },
      },
    },
  },
  {
    id: 'trap-02',
    difficulty: 'hard',
    topicHint: 'area of a trapezoid',
    questionType: 'area',
    geometrySpec: {
      shape: 'trapezoid',
      params: {
        points: [
          { label: 'P', x: 30, y: 15 },
          { label: 'Q', x: 70, y: 15 },
          { label: 'R', x: 90, y: 70 },
          { label: 'S', x: 10, y: 70 },
        ],
        sideLabels: [
          { between: ['P', 'Q'], text: '14 in' },
          { between: ['S', 'R'], text: '22 in' },
        ],
        heightLine: {
          from: { x: 50, y: 15 },
          to: { x: 50, y: 70 },
          label: 'h = 11 in',
        },
      },
    },
  },

  // ───────── REGULAR POLYGONS ─────────
  {
    id: 'reg-hex-01',
    difficulty: 'medium',
    topicHint: 'perimeter of a regular hexagon',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'regular_polygon',
      params: {
        center: { x: 50, y: 50 },
        radius: 32,
        sides: 6,
        startAngle: -90,
        labels: [{ text: 's = 9 ft', x: 50, y: 90 }],
      },
    },
  },
  {
    id: 'reg-pent-01',
    difficulty: 'medium',
    topicHint: 'perimeter of a regular pentagon',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'regular_polygon',
      params: {
        center: { x: 50, y: 50 },
        radius: 34,
        sides: 5,
        startAngle: -90,
        labels: [{ text: 's = 6 cm', x: 50, y: 90 }],
      },
    },
  },
  {
    id: 'reg-oct-01',
    difficulty: 'hard',
    topicHint: 'area or perimeter of a regular octagon',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'regular_polygon',
      params: {
        center: { x: 50, y: 50 },
        radius: 35,
        sides: 8,
        startAngle: -90,
        labels: [{ text: 's = 5 m', x: 50, y: 92 }],
      },
    },
  },

  // ───────── ANGLES ─────────
  {
    id: 'angle-acute-01',
    difficulty: 'easy',
    topicHint: 'identifying and measuring an angle',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 15, y: 65 },
        ray1: { x: 90, y: 65 },
        ray2: { x: 65, y: 10 },
        angleLabel: '55°',
      },
    },
  },
  {
    id: 'angle-obtuse-01',
    difficulty: 'easy',
    topicHint: 'identifying and measuring an angle',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 50, y: 70 },
        ray1: { x: 95, y: 40 },
        ray2: { x: 5, y: 40 },
        angleLabel: '120°',
      },
    },
  },
  {
    id: 'angle-complement-01',
    difficulty: 'medium',
    topicHint: 'complementary angles',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 15, y: 75 },
        ray1: { x: 90, y: 75 },
        ray2: { x: 15, y: 10 },
        angleLabel: '90°',
        labels: [
          { text: '37°', x: 32, y: 62 },
          { text: '?', x: 22, y: 42 },
        ],
      },
      style: {},
    },
  },
  {
    id: 'angle-supplement-01',
    difficulty: 'medium',
    topicHint: 'supplementary angles',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 50, y: 65 },
        ray1: { x: 95, y: 65 },
        ray2: { x: 5, y: 65 },
        angleLabel: '180°',
        labels: [
          { text: '125°', x: 62, y: 52 },
          { text: '?', x: 38, y: 52 },
        ],
      },
    },
  },
  {
    id: 'angle-vertical-01',
    difficulty: 'medium',
    topicHint: 'vertical angles formed by two intersecting lines',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 50, y: 50 },
        ray1: { x: 90, y: 25 },
        ray2: { x: 10, y: 75 },
        angleLabel: '68°',
        labels: [{ text: '?', x: 40, y: 32 }],
      },
    },
  },
  {
    id: 'angle-triangle-sum-01',
    difficulty: 'medium',
    topicHint: 'triangle angle sum (angles in a triangle add up to 180°)',
    questionType: 'angle',
    geometrySpec: {
      shape: 'triangle',
      params: {
        points: [
          { label: 'A', x: 10, y: 75 },
          { label: 'B', x: 90, y: 75 },
          { label: 'C', x: 45, y: 10 },
        ],
        labels: [
          { text: '65°', x: 20, y: 68 },
          { text: '45°', x: 78, y: 68 },
          { text: '?', x: 46, y: 22 },
        ],
      },
    },
  },

  // ───────── PARALLEL TRANSVERSAL (Angle relationships) ─────────
  {
    id: 'par-trans-01',
    difficulty: 'medium',
    topicHint: 'corresponding angles with parallel lines cut by a transversal',
    questionType: 'angle',
    geometrySpec: {
      shape: 'parallel_transversal',
      params: {
        line1: { start: { x: 5, y: 25 }, end: { x: 95, y: 25 } },
        line2: { start: { x: 5, y: 65 }, end: { x: 95, y: 65 } },
        transversal: { start: { x: 30, y: 5 }, end: { x: 70, y: 85 } },
        angleLabels: [{ text: '72°', at: 'line1', dx: 10, dy: 6 }],
        lineLabels: [
          { text: 'm', x: 93, y: 20 },
          { text: 'n', x: 93, y: 60 },
          { text: 't', x: 68, y: 82 },
        ],
      },
    },
  },
  {
    id: 'par-trans-02',
    difficulty: 'medium',
    topicHint: 'alternate interior angles with parallel lines',
    questionType: 'angle',
    geometrySpec: {
      shape: 'parallel_transversal',
      params: {
        line1: { start: { x: 5, y: 30 }, end: { x: 95, y: 30 } },
        line2: { start: { x: 5, y: 70 }, end: { x: 95, y: 70 } },
        transversal: { start: { x: 25, y: 5 }, end: { x: 75, y: 95 } },
        angleLabels: [{ text: '115°', at: 'line1', dx: -14, dy: 8 }],
        lineLabels: [
          { text: 'p', x: 93, y: 25 },
          { text: 'q', x: 93, y: 65 },
        ],
      },
    },
  },
  {
    id: 'par-trans-03',
    difficulty: 'hard',
    topicHint: 'co-interior (same-side interior) angles with parallel lines',
    questionType: 'angle',
    geometrySpec: {
      shape: 'parallel_transversal',
      params: {
        line1: { start: { x: 5, y: 28 }, end: { x: 95, y: 28 } },
        line2: { start: { x: 5, y: 72 }, end: { x: 95, y: 72 } },
        transversal: { start: { x: 35, y: 5 }, end: { x: 65, y: 95 } },
        angleLabels: [
          { text: '63°', at: 'line1', dx: 10, dy: 8 },
          { text: '?', at: 'line2', dx: -10, dy: -8 },
        ],
        lineLabels: [
          { text: 'a', x: 93, y: 23 },
          { text: 'b', x: 93, y: 67 },
        ],
      },
    },
  },

  // ───────── COMPOSITE / L-SHAPE ─────────
  {
    id: 'comp-L-01',
    difficulty: 'medium',
    topicHint: 'area of a composite L-shaped figure',
    questionType: 'composite_area',
    geometrySpec: {
      shape: 'composite',
      params: {
        rects: [
          { x: 10, y: 10, width: 60, height: 20, label: '' },
          { x: 10, y: 30, width: 25, height: 35, label: '' },
        ],
        dimensionLabels: [
          { text: '20 ft', x: 40, y: 7 },
          { text: '6 ft', x: 75, y: 20 },
          { text: '8 ft', x: 6, y: 47 },
          { text: '12 ft', x: 23, y: 70 },
        ],
      },
    },
  },
  {
    id: 'comp-L-02',
    difficulty: 'hard',
    topicHint: 'area and perimeter of a composite shape',
    questionType: 'composite_area',
    geometrySpec: {
      shape: 'composite',
      params: {
        rects: [
          { x: 10, y: 10, width: 70, height: 25, label: '' },
          { x: 45, y: 35, width: 35, height: 30, label: '' },
        ],
        dimensionLabels: [
          { text: '28 m', x: 45, y: 6 },
          { text: '10 m', x: 85, y: 22 },
          { text: '14 m', x: 85, y: 50 },
          { text: '12 m', x: 63, y: 70 },
        ],
      },
    },
  },
  {
    id: 'comp-T-01',
    difficulty: 'hard',
    topicHint: 'area of a T-shaped composite figure',
    questionType: 'composite_area',
    geometrySpec: {
      shape: 'composite',
      params: {
        rects: [
          { x: 10, y: 10, width: 70, height: 18, label: '' },
          { x: 30, y: 28, width: 30, height: 35, label: '' },
        ],
        dimensionLabels: [
          { text: '24 ft', x: 45, y: 6 },
          { text: '6 ft', x: 85, y: 18 },
          { text: '10 ft', x: 65, y: 45 },
          { text: '14 ft', x: 45, y: 68 },
        ],
      },
    },
  },

  // ───────── 3D SHAPES — CYLINDER ─────────
  {
    id: 'cyl-01',
    difficulty: 'medium',
    topicHint: 'surface area of a cylinder',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'cylinder',
      params: {
        radius: 5,
        height: 12,
      },
    },
  },
  {
    id: 'cyl-02',
    difficulty: 'hard',
    topicHint: 'volume or surface area of a cylinder',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'cylinder',
      params: {
        radius: 3,
        height: 10,
      },
    },
  },

  // ───────── NETS — RECTANGULAR PRISM ─────────
  {
    id: 'prism-net-01',
    difficulty: 'easy',
    topicHint: 'surface area of a rectangular prism using its net',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'rect_prism_net',
      params: {
        length: 10,
        width: 6,
        height: 4,
      },
    },
  },
  {
    id: 'prism-net-02',
    difficulty: 'medium',
    topicHint: 'surface area of a rectangular prism',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'rect_prism_net',
      params: {
        length: 8,
        width: 5,
        height: 3,
      },
    },
  },

  // ───────── NETS — CONE ─────────
  {
    id: 'cone-net-01',
    difficulty: 'hard',
    topicHint: 'surface area of a cone using its net',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'cone_net',
      params: {
        radius: 6,
        slantHeight: 15,
      },
    },
  },

  // ───────── NETS — PYRAMID ─────────
  {
    id: 'pyr-net-01',
    difficulty: 'medium',
    topicHint: 'surface area of a square pyramid using its net',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'pyramid_net',
      params: {
        baseLength: 10,
        slantHeight: 13,
      },
    },
  },
  {
    id: 'pyr-net-02',
    difficulty: 'hard',
    topicHint: 'surface area of a square pyramid',
    questionType: 'surface_area',
    geometrySpec: {
      shape: 'pyramid_net',
      params: {
        baseLength: 8,
        slantHeight: 10,
      },
    },
  },

  // ───────── IRREGULAR POLYGON ─────────
  {
    id: 'poly-quad-01',
    difficulty: 'medium',
    topicHint: 'perimeter of an irregular quadrilateral',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'polygon',
      params: {
        points: [
          { label: 'A', x: 10, y: 20 },
          { label: 'B', x: 70, y: 10 },
          { label: 'C', x: 85, y: 60 },
          { label: 'D', x: 20, y: 70 },
        ],
        sideLabels: [
          { between: ['A', 'B'], text: '15 m' },
          { between: ['B', 'C'], text: '13 m' },
          { between: ['C', 'D'], text: '17 m' },
          { between: ['D', 'A'], text: '12 m' },
        ],
      },
    },
  },

  // ───────── MORE ANGLE FIGURES ─────────
  {
    id: 'angle-right-01',
    difficulty: 'easy',
    topicHint: 'identifying a right angle',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 20, y: 70 },
        ray1: { x: 90, y: 70 },
        ray2: { x: 20, y: 10 },
        angleLabel: '90°',
      },
    },
  },
  {
    id: 'angle-reflex-01',
    difficulty: 'hard',
    topicHint: 'reflex angles and angle measurement',
    questionType: 'angle',
    geometrySpec: {
      shape: 'line_angle',
      params: {
        vertex: { x: 50, y: 50 },
        ray1: { x: 90, y: 50 },
        ray2: { x: 70, y: 85 },
        angleLabel: '35°',
        labels: [{ text: 'Find the reflex angle', x: 50, y: 95 }],
      },
    },
  },

  // ───────── ADDITIONAL VARIETY ─────────
  {
    id: 'rect-diagonal-01',
    difficulty: 'hard',
    topicHint: 'diagonal of a rectangle using the Pythagorean theorem',
    questionType: 'pythagorean',
    geometrySpec: {
      shape: 'rectangle',
      params: {
        origin: { x: 10, y: 15 },
        width: 60,
        height: 40,
        labels: [
          { text: '12 m', x: 40, y: 60 },
          { text: '5 m', x: 75, y: 35 },
        ],
        segments: [
          { from: [10, 15], to: [70, 55], label: 'd = ?', dashed: true },
        ],
      },
    },
  },
  {
    id: 'tri-equi-01',
    difficulty: 'easy',
    topicHint: 'perimeter of an equilateral triangle',
    questionType: 'perimeter',
    geometrySpec: {
      shape: 'triangle',
      params: {
        points: [
          { label: 'A', x: 50, y: 8 },
          { label: 'B', x: 10, y: 75 },
          { label: 'C', x: 90, y: 75 },
        ],
        sideLabels: [
          { between: ['A', 'B'], text: '7 cm' },
          { between: ['A', 'C'], text: '7 cm' },
          { between: ['B', 'C'], text: '7 cm' },
        ],
      },
    },
  },
  {
    id: 'circle-sector-01',
    difficulty: 'hard',
    topicHint: 'area related to a circle (sector or ring)',
    questionType: 'area',
    geometrySpec: {
      shape: 'circle',
      params: {
        center: { x: 50, y: 50 },
        radius: 30,
        radiusLabel: 'r = 8 cm',
        labels: [{ text: '90° sector', x: 50, y: 90 }],
      },
    },
  },
  {
    id: 'trap-right-01',
    difficulty: 'medium',
    topicHint: 'area of a right trapezoid',
    questionType: 'area',
    geometrySpec: {
      shape: 'trapezoid',
      params: {
        points: [
          { label: 'W', x: 15, y: 20 },
          { label: 'X', x: 55, y: 20 },
          { label: 'Y', x: 75, y: 65 },
          { label: 'Z', x: 15, y: 65 },
        ],
        sideLabels: [
          { between: ['W', 'X'], text: '8 m' },
          { between: ['Z', 'Y'], text: '12 m' },
          { between: ['W', 'Z'], text: '9 m' },
        ],
        heightLine: {
          from: { x: 15, y: 20 },
          to: { x: 15, y: 65 },
          label: 'h = 9 m',
        },
      },
    },
  },
];

module.exports = { GEOMETRY_FIGURES };
