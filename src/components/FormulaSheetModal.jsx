import React from 'react';

export default function FormulaSheetModal({ onClose = () => {} }) {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white w-11/12 max-w-2xl rounded p-4">
				<div className="flex justify-between items-center mb-3">
					<h3 className="font-bold">Formula Sheet</h3>
					<button onClick={onClose} className="text-xl">&times;</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div><p><strong>Area (Rectangle):</strong> A = lw</p><p><strong>Circle:</strong> A = πr²</p></div>
					<div><p><strong>Volume (Rectangular Prism):</strong> V = lwh</p></div>
				</div>
			</div>
		</div>
	);
}

                        <Formula title="Square" formula="A = s^2" />
                        <Formula title="Rectangle" formula="A = lw" />
                        <Formula title="Parallelogram" formula="A = bh" />
                        <Formula title="Triangle" formula="A = \\frac{1}{2}bh" />
                        <Formula title="Trapezoid" formula="A = \\frac{1}{2}h(b_1 + b_2)" />
                        <Formula title="Circle" formula="A = \\pi r^2" />

                        <h3 className="text-lg font-bold border-b mt-4 mb-2">Perimeter / Circumference</h3>
                        <Formula title="Square" formula="P = 4s" />
                        <Formula title="Rectangle" formula="P = 2l + 2w" />
                        <Formula title="Triangle" formula="P = s_1 + s_2 + s_3" />
                        <Formula title="Circle (Circumference)" formula="C = 2\\pi r \\text{ or } C = \\pi d" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold border-b mb-2">Volume</h3>
                        <Formula title="Cube" formula="V = s^3" />
                        <Formula title="Rectangular Prism" formula="V = lwh" />
                        <Formula title="Cylinder" formula="V = \\pi r^2 h" />
                        <Formula title="Pyramid" formula="V = \\frac{1}{3}Bh" description="B = area of base" />
                        <Formula title="Cone" formula="V = \\frac{1}{3}\\pi r^2 h" />
                        <Formula title="Sphere" formula="V = \\frac{4}{3}\\pi r^3" />

                        <h3 className="text-lg font-bold border-b mt-4 mb-2">Data</h3>
                        <Formula title="Mean" formula="mean = \\frac{\\text{sum of values}}{\\text{number of values}}" />
                        <Formula title="Median" formula="median = \\text{middle value of an ordered data set}" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormulaSheetModal;
    );
}

export default FormulaSheetModal;
