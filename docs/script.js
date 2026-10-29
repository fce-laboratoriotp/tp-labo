const DATA = {
	annual: [3262, 3648, 3959, 4205, 4249],
	ages: [
		["5–9", 9],
		["10–14", 300],
		["15–19", 1830],
		["20–24", 2557],
		["25–29", 2472],
		["30–34", 2038],
		["35–39", 1572],
		["40–44", 1387],
		["45–49", 1173],
		["50–54", 940],
		["55–59", 842],
		["60–64", 825],
		["65–69", 699],
		["70–74", 616],
		["75–79", 509],
		["80–84", 401],
		["85–89", 196],
		["90+", 113],
	],
	male: [2611, 2882, 3063, 3279, 3425],
	female: [643, 754, 859, 868, 807],
	prov: [
		{ provincia_nombre: "Corrientes", tasa_promedio: 6.0 },
		{ provincia_nombre: "Río Negro", tasa_promedio: 6.0 },
		{ provincia_nombre: "Buenos Aires", tasa_promedio: 7.1 },
		{ provincia_nombre: "CABA", tasa_promedio: 7.1 },
		{ provincia_nombre: "Córdoba", tasa_promedio: 7.6 },
		{ provincia_nombre: "Misiones", tasa_promedio: 8.0 },
		{ provincia_nombre: "Jujuy", tasa_promedio: 8.3 },
		{ provincia_nombre: "Neuquén", tasa_promedio: 9.2 },
		{ provincia_nombre: "San Juan", tasa_promedio: 9.7 },
		{ provincia_nombre: "Tucumán", tasa_promedio: 10.6 },
		{ provincia_nombre: "Tierra del Fuego", tasa_promedio: 10.6 },
		{ provincia_nombre: "Santa Fe", tasa_promedio: 11.0 },
		{ provincia_nombre: "Chubut", tasa_promedio: 11.0 },
		{ provincia_nombre: "Chaco", tasa_promedio: 11.1 },
		{ provincia_nombre: "Mendoza", tasa_promedio: 11.2 },
		{ provincia_nombre: "Santiago del Estero", tasa_promedio: 12.3 },
		{ provincia_nombre: "Santa Cruz", tasa_promedio: 12.5 },
		{ provincia_nombre: "La Pampa", tasa_promedio: 12.9 },
		{ provincia_nombre: "Catamarca", tasa_promedio: 12.9 },
		{ provincia_nombre: "Formosa", tasa_promedio: 12.9 },
		{ provincia_nombre: "La Rioja", tasa_promedio: 14.0 },
		{ provincia_nombre: "Salta", tasa_promedio: 14.1 },
		{ provincia_nombre: "San Luis", tasa_promedio: 14.2 },
		{ provincia_nombre: "Entre Ríos", tasa_promedio: 17.4 },
	],
};

const slides = Array.from(document.querySelectorAll(".slide"));
let current = 0;
let methodCount = 0;

const NS = "http://www.w3.org/2000/svg";

const SVG = (tag, attributes = {}, text = "") => {
	const element = document.createElementNS(NS, tag);
	Object.entries(attributes).forEach(([key, value]) =>
		element.setAttribute(key, value),
	);
	if (text !== "") element.textContent = text;
	return element;
};

const add = (parent, tag, attributes = {}, text = "") => {
	const element = SVG(tag, attributes, text);
	parent.appendChild(element);
	return element;
};

const T = (value) => Number(value).toLocaleString("es-AR");

const axis = (
	svg,
	{
		left = 92,
		right = 720,
		top = 40,
		bottom = 470,
		max = 4600,
		min = 0,
		labels = [],
		units = "Cantidad de víctimas",
		xLabel = "AÑO",
		ticks = 5,
	} = {},
) => {
	const y = (value) => bottom - ((value - min) / (max - min)) * (bottom - top);
	const x = (index) =>
		left +
		(labels.length === 1 ? 0 : ((right - left) * index) / (labels.length - 1));

	for (let i = 0; i <= ticks; i++) {
		const value = min + ((max - min) * i) / ticks;
		const yy = y(value);
		add(svg, "line", {
			x1: left,
			y1: yy,
			x2: right,
			y2: yy,
			class: "gridline",
		});
		add(
			svg,
			"text",
			{ x: left - 10, y: yy + 4, "text-anchor": "end", class: "tick" },
			Number.isInteger(value) ? T(value) : value.toFixed(1).replace(".", ","),
		);
	}

	add(svg, "line", { x1: left, y1: top, x2: left, y2: bottom, class: "axis" });
	add(svg, "line", {
		x1: left,
		y1: bottom,
		x2: right,
		y2: bottom,
		class: "axis",
	});

	add(
		svg,
		"text",
		{
			x: (left + right) / 2,
			y: bottom + 35,
			"text-anchor": "middle",
			class: "axis-label",
		},
		xLabel,
	);
	add(
		svg,
		"text",
		{
			x: 14,
			y: (top + bottom) / 2,
			transform: `rotate(-90 14 ${(top + bottom) / 2})`,
			"text-anchor": "middle",
			class: "axis-label",
		},
		units.toUpperCase(),
	);

	labels.forEach((value, index) => {
		add(
			svg,
			"text",
			{ x: x(index), y: bottom + 18, "text-anchor": "middle", class: "tick" },
			String(value),
		);
	});

	return { x, y, left, right, top, bottom };
};

function lines(holder, type) {
	const svg = add(holder, "svg", {
		viewBox: "0 0 780 540",
		preserveAspectRatio: "xMidYMid meet",
	});
	const years = [2020, 2021, 2022, 2023, 2024];
	const annual = type === "line";

	const chartAxis = axis(svg, {
		labels: years,
		min: annual ? 3000 : 0,
		max: annual ? 4600 : 3700,
		ticks: annual ? 4 : 5,
		right: 740,
		bottom: 470,
		units: "Cantidad de víctimas",
		xLabel: "AÑO",
	});

	const sets = annual
		? [{ arr: DATA.annual, color: "#19a4a4", name: "" }]
		: [
				{ arr: DATA.male, color: "#29b6f6", name: "Masculino" },
				{ arr: DATA.female, color: "#f48fb1", name: "Femenino" },
			];

	sets.forEach((set, seriesIndex) => {
		const coordinates = set.arr.map((value, index) => [
			chartAxis.x(index),
			chartAxis.y(value),
		]);
		const path = coordinates
			.map((coordinate, index) => (index ? "L" : "M") + coordinate.join(" "))
			.join(" ");
		const line = add(svg, "path", {
			d: path,
			fill: "none",
			stroke: set.color,
			"stroke-width": 3.4,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			class: "anim-path",
		});
		const length = line.getTotalLength();
		line.style.setProperty("--length", length + 2 + "px");

		coordinates.forEach(([x, y], index) => {
			const delay = (index / 4) * 2.3;
			const point = add(svg, "circle", {
				cx: x,
				cy: y,
				r: 5,
				fill: set.color,
				stroke: "white",
				"stroke-width": 1.8,
				class: "anim-dot",
			});
			point.style.setProperty("--time", delay + "s");

			const label = add(
				svg,
				"text",
				{
					x,
					y: y + (annual ? 23 : seriesIndex === 1 ? 19 : -13),
					"text-anchor": "middle",
					class: "anim-value point-label",
				},
				T(set.arr[index]),
			);
			label.style.setProperty("--time", delay + "s");
		});
	});

	if (!annual) {
		add(svg, "circle", { cx: 500, cy: 22, r: 5, fill: "#29b6f6" });
		add(svg, "text", { x: 512, y: 26, class: "tick" }, "Masculino");
		add(svg, "circle", { cx: 610, cy: 22, r: 5, fill: "#f48fb1" });
		add(svg, "text", { x: 622, y: 26, class: "tick" }, "Femenino");
	}
}

function ageChart(holder) {
	// Aumentamos el alto del viewBox de 540 a 620 para que las barras tengan más espacio vertical
	const svg = add(holder, "svg", {
		viewBox: "0 0 780 560",
		preserveAspectRatio: "xMidYMid meet",
	});

	// Cambiamos el fondo/límite de referencia superior e inferior
	const left = 74,
		bottom = 490,
		top = 60,
		right = 750,
		max = 3400; // Ajustamos el max para que las barras no se corten

	for (let t = 0; t <= 4; t++) {
		const value = t * 850; // Ajustamos la escala de las líneas de referencia
		const y = bottom - (value / max) * (bottom - top);
		add(svg, "line", { x1: left, x2: right, y1: y, y2: y, class: "gridline" });
		add(
			svg,
			"text",
			{ x: left - 9, y: y + 4, "text-anchor": "end", class: "tick" },
			T(value),
		);
	}

	add(svg, "line", { x1: left, x2: left, y1: top, y2: bottom, class: "axis" });
	add(svg, "line", {
		x1: left,
		x2: right,
		y1: bottom,
		y2: bottom,
		class: "axis",
	});

	// Bajamos un poco más la etiqueta de "FRANJA ETARIA" para que no pise los textos inclinados
	add(
		svg,
		"text",
		{
			x: (left + right) / 2,
			y: bottom + 65,
			"text-anchor": "middle",
			class: "axis-label",
		},
		"FRANJA ETARIA",
	);
	add(
		svg,
		"text",
		{
			x: 14,
			y: (top + bottom) / 2,
			transform: `rotate(-90 14 ${(top + bottom) / 2})`,
			"text-anchor": "middle",
			class: "axis-label",
		},
		"CANTIDAD DE VÍCTIMAS",
	);

	const step = (right - left) / DATA.ages.length;
	DATA.ages.forEach(([name, value], index) => {
		const height = (value / max) * (bottom - top);
		const x = left + step * (index + 0.14);

		const bar = add(svg, "rect", {
			x,
			y: bottom - height,
			width: step * 0.7,
			height,
			rx: 2,
			fill: index % 2 ? "#159d9e" : "#19a4a4",
			class: "rise-bar",
		});
		bar.style.setProperty("--time", index * 0.1 + "s");

		const label = add(
			svg,
			"text",
			{
				x: x + step * 0.35,
				y: bottom - height - 7,
				"text-anchor": "middle",
				class: "anim-value",
				"font-size": 10,
			},
			T(value),
		);
		label.style.setProperty("--time", index * 0.1 + 0.55 + "s");

		// Posición de los nombres de las franjas etarias abajo
		add(
			svg,
			"text",
			{
				x: x + step * 0.35,
				y: bottom + 16,
				transform: `rotate(-45 ${x + step * 0.35} ${bottom + 16})`,
				"text-anchor": "end",
				class: "tick",
				"font-size": 10,
			},
			name,
		);
	});
}

function provincial(holder) {
	const svg = add(holder, "svg", {
		viewBox: "0 0 780 540",
		preserveAspectRatio: "xMidYMid meet",
	});

	const values = [...DATA.prov].sort(
		(a, b) => b.tasa_promedio - a.tasa_promedio,
	);
	const max = Math.max(...values.map((item) => item.tasa_promedio)) + 1.5;

	const top = 25;
	const left = 115;
	const right = 740;
	const bottom = 485;
	const step = (bottom - top) / values.length;

	const defs = add(svg, "defs");
	const gradient = add(defs, "linearGradient", {
		id: "prov-green-gradient",
		x1: "0%",
		y1: "0%",
		x2: "0%",
		y2: "100%",
	});

	add(gradient, "stop", { offset: "0%", "stop-color": "#083d4a" });
	add(gradient, "stop", { offset: "50%", "stop-color": "#159d9e" });
	add(gradient, "stop", { offset: "100%", "stop-color": "#4db6ac" });

	for (let j = 0; j <= 5; j++) {
		const value = (max * j) / 5;
		const x = left + ((right - left) * value) / max;
		add(svg, "line", { x1: x, x2: x, y1: top, y2: bottom, class: "gridline" });
		add(
			svg,
			"text",
			{ x, y: bottom + 16, "text-anchor": "middle", class: "tick" },
			value.toFixed(1).replace(".", ",") + "%",
		);
	}

	values.forEach((row, index) => {
		const y = top + index * step + 2;
		const height = step * 0.78;
		const width = ((right - left) * row.tasa_promedio) / max;
		const delay = index * 0.03;

		add(
			svg,
			"text",
			{
				x: left - 8,
				y: y + height * 0.72,
				"text-anchor": "end",
				"font-size": 10,
				"font-weight": "700",
			},
			row.provincia_nombre.toUpperCase(),
		);

		const bar = add(svg, "rect", {
			x: left,
			y,
			width,
			height,
			rx: 3,
			fill: "url(#prov-green-gradient)",
			class: "grow-horizontal",
		});

		bar.style.setProperty("--time", delay + "s");
		bar.style.transformOrigin = `${left}px ${y + height}px`;

		const label = add(
			svg,
			"text",
			{
				x: left + width + 5,
				y: y + height * 0.75,
				"font-size": 10,
				"font-weight": "700",
				class: "anim-value",
			},
			row.tasa_promedio.toFixed(1).replace(".", ",") + "%",
		);

		label.style.setProperty("--time", delay + 0.3 + "s");
	});

	add(
		svg,
		"text",
		{
			x: (left + right) / 2,
			y: 528,
			"text-anchor": "middle",
			class: "axis-label",
		},
		"PROMEDIO DE TASAS PUBLICADAS POR SNIC (POR 100.000 HABITANTES)",
	);
}

function renderCharts() {
	document.querySelectorAll(".animated-chart").forEach((element) => {
		const type = element.dataset.chart;
		element.replaceChildren();
		if (type === "line" || type === "sex") lines(element, type);
		else if (type === "age") ageChart(element);
		else provincial(element);
	});
}

function activateChart() {
	const element = slides[current].querySelector(".animated-chart");
	if (element) {
		element.classList.remove("is-running");
		void element.offsetWidth;
		element.classList.add("is-running");
	}
}

function show(index) {
	current = Math.min(Math.max(0, index), slides.length - 1);
	slides.forEach((element, i) =>
		element.classList.toggle("activa", i === current),
	);
	document.getElementById("contador").textContent =
		`${current + 1} / ${slides.length}`;
	document.getElementById("barra").style.width =
		`${((current + 1) / slides.length) * 100}%`;
	activateChart();
}

function next() {
	show(current + 1);
}

function prev() {
	show(current - 1);
}

document.getElementById("btn-sig").addEventListener("click", next);
document.getElementById("btn-ant").addEventListener("click", prev);

document.addEventListener("keydown", (event) => {
	if (
		event.key === "ArrowRight" ||
		event.key === "PageDown" ||
		event.key === " "
	) {
		event.preventDefault();
		next();
	} else if (event.key === "ArrowLeft" || event.key === "PageUp") {
		event.preventDefault();
		prev();
	}
});

const btn = document.getElementById("btn-modo");
btn.addEventListener("click", () => {
	document.body.classList.toggle("modo-landing");
	btn.textContent = document.body.classList.contains("modo-landing")
		? "📽 Ver como diapositivas"
		: "📄 Ver como Landing Page";
	if (!document.body.classList.contains("modo-landing")) show(current);
});

renderCharts();
show(0);

