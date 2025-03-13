/**
 * Copyright (C) 2023-2025 Sameer W. All rights reserved.
 * License: https://github.com/wsammer/better-text-view/blob/main/LICENSE
 */

"use strict";

let namedColors = new Map(Object.entries({
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
aqua:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
gray:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
fuchsia:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370db",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#db7093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
rebeccapurple:"#663399",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}));

let u_fullstop = /[\u0021\u002E\u003F\u0589\u061F\u06D4\u0700\u0701\u0702\u07F9\u0964\u0965\u104A\u104B\u1362\u1367\u1368\u166E\u1803\u1809\u1944\u1945\u1AA8\u1AA9\u1AAA\u1AAB\u1B5A\u1B5B\u1B5E\u1B5F\u1C3B\u1C3C\u1C7E\u1C7F\u203C\u203D\u2047\u2048\u2049\u2E2E\u3002\uA4FF\uA60E\uA60F\uA6F3\uA6F7\uA876\uA877\uA8CE\uA8CF\uA92F\uA9C8\uA9C9\uAA5D\uAA5E\uAA5F\uAAF0\uAAF1\uABEB\uFE52\uFE56\uFE57\uFF01\uFF0E\uFF1F\uFF61]+/umg;
var g_sp_timeout;
var g_sp_paused;
function speechResume() {
if (g_sp_paused != true) {
window.speechSynthesis.pause();
window.speechSynthesis.resume();
}
g_sp_timeout = setTimeout(speechResume,10000);
}
function speechToggle() {
if (g_sp_paused == true) {
g_sp_paused = false;
window.speechSynthesis.resume();
} else {
g_sp_paused = true;
window.speechSynthesis.pause();
}
}
function speakText(tex, stop, callback) {
if (stop) { window.speechSynthesis.cancel(); g_sp_timeout = setTimeout(speechResume,10000); return; }
var textlines = tex.split(u_fullstop);
for (var i= 0; i < textlines.length; i++) {
if (textlines[i].match(/\s+/g))
	textlines[i] = textlines[i].replaceAll(/\W+/g,' ');
var u = new SpeechSynthesisUtterance();
u.text = textlines[i];
u.lang = g_speech_language;

u.onend = function () {
clearTimeout(g_sp_timeout);
if (callback) {
    callback();
}
};

u.onerror = function (e) {
if (callback) {
    callback(e);
}
};
setTimeout(speechSynthesis.speak(u), 10);
}
}

function colorblindBg(col, cfg, nbinv, bfilter, n_inv) {
	let cmin = Math.min(col[0],col[1],col[2]);
	let cmax = Math.max(col[0],col[1],col[2]);
	let pcol = '';
	if (cfg.forcePlhdr && !nbinv && !bfilter && cmin != col[2]) {
		if (col[1] >= col[0]) {
			let blu = col[2];
			col[2] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[0] > col[1]) {
			let blu = col[2];
			col[2] = col[1];
			col[1] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (cfg.forcePlhdr && (nbinv|| bfilter) && cmax != col[2]) {
		if (col[0] > col[1]) {
			let blu = col[2];
			col[2] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[1] > col[0]) {
			let blu = col[2];
			col[2] = col[1];
			col[1] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (!cfg.forcePlhdr && cfg.advDimming && cmax != col[2]) {
		if (col[0] >= col[1]) {
			let blu = col[2];
			col[2] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[1] > col[0]) {
			let blu = col[2];
			col[2] = col[1];
			col[1] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (!cfg.forcePlhdr && !cfg.advDimming && cmax != col[2]) {
		if (col[0] > col[1]) {
			let blu = col[2];
			col[2] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[1] > col[0]) {
			let blu = col[2];
			col[2] = col[1];
			col[1] = blu;
			pcol = 'rgba('+col+')';
		}
	}
	return pcol;
}

function colorblindFg(col, cfg, nbinv, bfilter, n_inv) {
	let cmin = Math.min(col[0],col[1],col[2]);
	let cmax = Math.max(col[0],col[1],col[2]);
	let pcol = '';
	if (cfg.forcePlhdr && n_inv > 2 && !nbinv && !bfilter && cmin != col[1]) {
		if (col[0] >= col[2]) {
			let blu = col[1];
			col[1] = col[2];
			col[2] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[2] > col[0]) {
			let blu = col[1];
			col[1] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (cfg.forcePlhdr && n_inv > 2 && (nbinv || bfilter) && cmax != col[1]) {
		if (col[2] >= col[0]) {
			let blu = col[1];
			col[1] = col[2];
			col[2] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[0] > col[2]) {
			let blu = col[1];
			col[1] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (cfg.forcePlhdr && !nbinv && !bfilter && cmin != col[1]) {
		if (col[2] > col[0]) {
			let blu = col[1];
			col[1] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[0] > col[2]) {
			let blu = col[1];
			col[1] = col[2];
			col[2] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (!cfg.forcePlhdr && cfg.advDimming && cmax != col[1]) {
		if (col[2] >= col[0]) {
			let blu = col[1];
			col[1] = col[2];
			col[2] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[0] > col[2]) {
			let blu = col[1];
			col[1] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		}
	} else if (!cfg.forcePlhdr && !cfg.advDimming && cmax != col[2]) {
		if (col[0] > col[1]) {
			let blu = col[2];
			col[2] = col[0];
			col[0] = blu;
			pcol = 'rgba('+col+')';
		} else if (col[1] > col[0]) {
			let blu = col[2];
			col[2] = col[1];
			col[1] = blu;
			pcol = 'rgba('+col+')';
		}
	}
	return pcol;
}

function rgbToHex([r,g,b,a=1])
{
	let hr = (+r).toString(16);
	let hg = (+g).toString(16);
	let hb = (+b).toString(16);
	if (hr.length == 1) hr = '0'+hr;
	if (hg.length == 1) hg = '0'+hg;
	if (hb.length == 1) hb = '0'+hb;
	return '#'+hr+hg+hb;
}

function rgbToHSL([r,g,b,a=1])
{
	r = r / 255;
	g = g / 255;
	b = b / 255;
	a = a != undefined ? parseFloat(a) : 1.0;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const c = max - min;
	const l = (max + min) / 2;
	if (c === 0)
		return [ 0, 0, l, a];
	let h = (max === r ? ((g - b) / c) % 6 : max === g ? (b - r) / c + 2 : (r - g) / c + 4) * 60;
	if (h < 0)
		h += 360;
	const s = c / (1 - Math.abs(2 * l - 1));
	return [h, s, l, a];
}

function hslToRGB([h,s,l,a=1]) {
	if (s.toString().indexOf('%') > -1) s = parseFloat(s)/100;
	if (l.toString().indexOf('%') > -1) l = parseFloat(l)/100;
	if (a.toString().indexOf('%') > -1) a = parseFloat(a)/100;
	if (s === 0) {
		const [r, b, g] = [l, l, l].map((x) => Math.round(x * 255));
		return [r, g, b, a];
	}
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	const [r, g, b] = (
		h < 60 ? [c, x, 0]: h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x] ).map((n) => Math.round((n + m) * 255));
	return [r, g, b, a];
}

function getHSLarr(hsl_str)
{
	if (hsl_str.length < 5) return [0,0,0,0];
	let hsl = hsl_str.match(/[\%\.\d]+/g);
	if (hsl[1].indexOf('%') > -1) hsl[1] = parseFloat(hsl[1])/100;
	if (hsl[2].indexOf('%') > -1) hsl[2] = parseFloat(hsl[2])/100;
	if (hsl[3] == undefined) hsl[3] = 1;
	return hsl;
}

function hexToRGBA(h,a=1) {
	let r = 0, g = 0, b = 0;

	if (h.length == 5) {
		r = parseInt("0x" + h[1] + h[1],16);
		g = parseInt("0x" + h[2] + h[2],16);
		b = parseInt("0x" + h[3] + h[3],16);
		a = parseInt("0x" + h[4] + h[4],16);
	} else if (h.length == 9) {
		r = parseInt("0x" + h[1] + h[2],16);
		g = parseInt("0x" + h[3] + h[4],16);
		b = parseInt("0x" + h[5] + h[6],16);
		a = parseInt("0x" + h[7] + h[8],16);
	}
	a = +(a / 255).toFixed(3);
	return [r, g, b, a];
}

function getRGBarr(rgba_str)
{
	if (rgba_str.length < 5) return [0,0,0,0];
//		let x = rgba_str.indexOf(')');
	let rgb = rgba_str.match(/[\.\d]+/g);
	rgb[3] = rgb[3] == undefined ? 1 : rgb[3] > 1 ? rgb[3]/100 : rgb[3];
	return rgb;
}

function clamp(x, min, max) {
	return Math.min(max, Math.max(min, x));
}

function applyColorMatrix([r, g, b]) {
//	const rgb = [[r / 255], [g / 255], [b / 255], [1], [1]];
	if (g_keep_colors) return [r,g,b];
	const rgb = [r / 255, g / 255, b / 255, 1, 1];
	const result = [  rgb[0]*g_m[0][0]+rgb[1]*g_m[0][1]+rgb[2]*g_m[0][2]+g_m[0][3]+g_m[0][4]  ,  rgb[0]*g_m[1][0]+rgb[1]*g_m[1][1]+rgb[2]*g_m[1][2]+g_m[1][3]+g_m[1][4]  ,  rgb[0]*g_m[2][0]+rgb[1]*g_m[2][1]+rgb[2]*g_m[2][2]+g_m[2][3]+g_m[2][4]  ];
//	const result = multiplyMatrices(g_m, rgb);
	return [0, 1, 2].map((i) =>
	clamp(Math.round(result[i] * 255), 0, 255));
//	const x = [ Math.round(result[0]*255), Math.round(result[1]*255), Math.round(result[2]*255) ];
//	return x;
}

const Matrix = {
	identity() {
		return [
			[1, 0, 0, 0, 0],
			[0, 1, 0, 0, 0],
			[0, 0, 1, 0, 0],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 0, 1]
			];
	},
	invertNHue() {
		return [
			[0.333, -0.667, -0.667, 0, 1],
			[-0.667, 0.333, -0.667, 0, 1],
			[-0.667, -0.667, 0.333, 0, 1],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 0, 1]
			];
	},
	brightness(v) {
		return [
			[v, 0, 0, 0, 0],
			[0, v, 0, 0, 0],
			[0, 0, v, 0, 0],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 0, 1]
			];
	},
	contrast(v) {
		const t = (1 - v) / 2;
		return [
			[v, 0, 0, 0, t],
			[0, v, 0, 0, t],
			[0, 0, v, 0, t],
			[0, 0, 0, 1, 0],
			[0, 0, 0, 0, 1]
			];
	},
};

function multiplyMatrices(m1, m2) {
	const result = [];
	for (let i = 0, len = m1.length; i < len; i++) {
		result[i] = [];
		for (let j = 0, len2 = m2[0].length; j < len2; j++) {
			let sum = 0;
			for (let k = 0, len3 = m1[0].length; k < len3; k++) {
				sum += m1[i][k] * m2[k][j];
			}
			result[i][j] = sum;
		}
	}
	return result;
}

let g_brightness = 1.00;
let g_contrast = 1.00;

var g_m2;
let g_m = Matrix.invertNHue();

var style_node;
var css_node;
var doc_obs;
let b_html = false;
let f_sizes = [];
let f2_sizes = [];
let h_sizes = [];
let g_eng = false;
var str_style;
var str_style2 = '1';
var t_start, t_end;
var root_style;
var finalLightness;
let g_nokinput = /(checkbox|color|hidden|image|radio|range|submit)/i;
let g_okinput = /(date|email|month|number|password|search|select|tel|text|time|url|week)/i;
let m_fcol = new Map();
let m_bcol = new Map();
let m_bocol = new Map();
let g_mag = '';
let g_fntRule = false;
var g_globalCss;
var g_min_colorfulness;
var g_bg_threshold;
var g_url;
var g_foot_re;
var g_anegative;
var g_zoom_keycode;
var g_zoom_padding;
var g_max_child;
var g_min_bg_brightness;
var g_max_fg_brightness;
var g_max_border;
var g_skip_css;
var g_keep_colors;
var g_max_css_rules;
var g_start3_caps;
var g_speech_language;
var g_continue_speech;
var g_skip_colors_classes = [];
var g_skip_colors_ids = [];
var g_skip_colors_tags = [];
var g_svg_bg_white;
var g_load_crossorigin;
var g_change_vars;
var g_min_image_size;
var g_smaller_text;
var g_skip_css_colors;
var g_load_delay;
var g_site_reminder;

const focalAnchors = {};
focalAnchors.attrNameContainer = 'f-a-h';

focalAnchors.attrNameHighlight = 'f-a-i';

focalAnchors.classNameHighlight = 'f-a';

focalAnchors.toggleAnchorsById = function (id) {
	focalAnchors.toggleAnchorsByRef(document.getElementById(id));
}

focalAnchors.toggleAnchorsByRef = function (container, emoji = false, skiplinks = false, weight = 400) {
	if (container instanceof Element && container.hasAttribute(focalAnchors.attrNameContainer)) {
		focalAnchors.clearAnchors(container, emoji, skiplinks, weight);
	} else {
		focalAnchors.addAnchorsToContainer(container, emoji, skiplinks, weight);
	}
}

focalAnchors.clearAnchors = function (container, emoji, skiplinks, weight) {
const stack = [container];
while (stack.length > 0) {
	const topElement = stack.pop();
	topElement.removeAttribute(focalAnchors.attrNameContainer);
	Array.from(topElement.childNodes).forEach(node => {
		if (node.nodeType !== Node.TEXT_NODE && node instanceof Element) {
			if (node.hasAttribute(focalAnchors.attrNameContainer)) {
				stack.push(node);
			}
			if (node.hasAttribute(focalAnchors.attrNameHighlight)) {
				const prev = node.previousSibling;
				const next = node.nextSibling;
				if (prev !== null && prev.nodeType === Node.TEXT_NODE) {
				// Merge with previous node.
				prev.textContent += node.textContent;
				if (next.nodeType === Node.TEXT_NODE) {
				// Merge with next node.
				prev.textContent += next.textContent;
				node.parentNode.removeChild(next);
				}
				} else if (next !== null && next.nodeType === Node.TEXT_NODE) {
				next.textContent = node.textContent + next.textContent;
				} else {
				// If there are no adjacent text nodes, just insert.
				node.parentNode.insertBefore(document.createTextNode(node.textContent), node);
				}
				node.parentNode.removeChild(node);
			}
		}
	})
}
}

// Add anchors to children of container, recursively.
focalAnchors.addAnchorsToContainer = function (container, emoji, skiplinks, weight) {
	const stack = [container];
	while (stack.length > 0) {
		const topElement = stack.pop();
		Array.from(topElement.childNodes).forEach(node => {
			if (node.nodeType === Node.TEXT_NODE && node.textContent.length > 0 && !/(SCRIPT|STYLE)/i.test(node.parentNode.nodeName) && ((skiplinks && node.parentNode.nodeName.toUpperCase() != 'UL' && node.parentNode.nodeName.toUpperCase() != 'A') || !skiplinks) && ((emoji && /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/umg.test(node.textContent)) || !emoji)) {
				node.parentNode.setAttribute(focalAnchors.attrNameContainer, '');
				if (emoji)
					invertEmojis(node);
				else
					focalAnchors.injectAnchorText(node,weight);
				g_s3_prev = node.nodeName;
				node.parentNode.removeChild(node);
			} else {
				if (node instanceof Element && !node.hasAttribute(focalAnchors.attrNameContainer)) {
				stack.push(node);
				g_s3_prev = node.nodeName;
			}
			}
		});
	}
}

const mtrIndic = [ 2304, 2305, 2306, 2307, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2402, 2403, 2433, 2434, 2435, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2519, 2530, 2531, 2558, 2689, 2690, 2691, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2786, 2787, 2810, 2811, 2812, 2813, 2814, 2815, 2561, 2562, 2563, 2620, 2621, 2622, 2623, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2672, 2673, 2677, 3200, 3201, 3202, 3203, 3260, 3261, 3262, 3263, 3264, 3265, 3266, 3267, 3268, 3269, 3270, 3271, 3272, 3273, 3274, 3275, 3276, 3277, 3278, 3279, 3280, 3281, 3282, 3283, 3284, 3285, 3286, 3298, 3299, 3328, 3329, 3330, 3331, 3387, 3388, 3389, 3390, 3391, 3392, 3393, 3394, 3395, 3396, 3397, 3398, 3399, 3400, 3401, 3402, 3403, 3404, 3405, 3406, 3426, 3427, 2817, 2818, 2819, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, 2901, 2902, 2903, 2946, 2947, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3072, 3073, 3074, 3075, 3076, 3134, 3135, 3136, 3137, 3138, 3139, 3140, 3141, 3142, 3143, 3144, 3145, 3146, 3147, 3148, 3149, 3150, 3151, 3152, 3153, 3154, 3155, 3156, 3157, 3158, 3170, 3171 ];

var g_s3_prev;
let g_s3_reg = /^(a|b|del|em|i|ins|li|mark|small|strong|sub|sup)$/i;
focalAnchors.injectAnchorText = function (node,weight) {
	if (node instanceof Element && node.hasAttribute(focalAnchors.attrNameContainer)) return;
	let txtc = node.textContent;
	var tag = '';
	var wt = parseInt(weight)+400;
	if (node.parentNode) tag = node.parentNode.nodeName;
	if (g_eng) {
	let words = txtc.split(/\b/);
	let caps = g_start3_caps;
	let sty = g_start3_caps;
	for (let wordID = 0; wordID < words.length; wordID++) {
		if (words[wordID] == undefined || words[wordID] == null) continue;
		if (!/(CODE|PRE)/i.test(tag) && (words[wordID].search(/\n\t+/) != -1 || words[wordID].search(/\n+\ /) != -1)) 
			if ((wordID > 0 && words[wordID-1].search(/\s/mg) != -1) || (wordID == 0 && words.length == 1))
			continue;
		let word = words[wordID];
		var boldNum, spos;
		const bold = document.createElement('b');
		if (g_start3_caps.substr(0,4).indexOf('line') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			if (g_s3_reg.test(g_s3_prev) && wordID > 0 && u_fullstop.test(words[wordID-1])) {
			spos = words[wordID].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty;
			} else {
			boldNum = 0;
			}
		} else if (wordID > 0 && u_fullstop.test(words[wordID-1])) {
			spos = words[wordID].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty;
		} else if (/\w/.test(words[0]) && wordID == 0) {
			spos = words[0].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else if (!/\w/.test(words[0]) && wordID == 1) {
			spos = words[1].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else {
			boldNum = 0;
		}
		} else if (g_start3_caps.substr(0,4).indexOf('para') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			boldNum = 0;
		} else if (/\w/.test(words[0]) && wordID == 0) {
			spos = words[0].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else if (!/\w/.test(words[0]) && wordID == 1) {
			spos = words[1].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else {
			boldNum = 0;
		}
		} else {
			spos = 0;
			boldNum = Math.min(word.length,3);
		}
		if (boldNum > 0) {
		if (weight <= 400)
			bold.setAttribute('style', caps+'font-weight:'+wt+'!important');
		else
			bold.setAttribute('style', caps+'font-weight:'+weight+'!important');
		bold.setAttribute(focalAnchors.attrNameHighlight, '');
		bold.textContent = word.substring(spos, boldNum);
		node.parentNode.insertBefore(bold, node);
		}
		node.parentNode.insertBefore(document.createTextNode(word.substr(boldNum)), node);
	}
	words.length = 0;
	} else {
	let words = txtc.split(' ');
	let sCaps = g_start3_caps;
	let sty = g_start3_caps;
	for (let wordID = 0; wordID < words.length; wordID++) {
		if (words[wordID] == undefined || words[wordID] == null || words[wordID].length == 0) continue;
		if (!/(CODE|PRE)/i.test(tag) && words[wordID].replaceAll(/\s/g,'').length == 0 && (words[wordID].search(/\n+\t*/) != -1 || words[wordID].search(/\n+\ /) != -1)) continue;
		let word = words[wordID];
		var boldNum, spos;
		const bold = document.createElement('b');
		if (g_start3_caps.substr(0,4).indexOf('line') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			if (g_s3_reg.test(g_s3_prev) && wordID > 0 && u_fullstop.test(words[wordID-1])) {
			spos = words[wordID].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty;
			} else {
			boldNum = 0;
			}
		} else if (wordID > 0 && u_fullstop.test(words[wordID-1])) {
			spos = words[wordID].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else if (words[0].search(/\p{L}/gu) > -1 && wordID == 0) {
			spos = words[0].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else if (words[0].search(/\p{L}/gu) < 0 && wordID == 1) {
			spos = words[1].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else {
			boldNum = 0;
		}
		} else if (g_start3_caps.substr(0,4).indexOf('para') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			boldNum = 0;
		} else if (words[0].search(/\p{L}/gu) > -1 && wordID == 0) {
			spos = words[0].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else if (words[0].search(/\p{L}/gu) < 0 && wordID == 1) {
			spos = words[1].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty; //font-size:+1.5em;font-family:Serif;';
		} else {
			boldNum = 0;
		}
		} else {
			spos = 0;
			boldNum = Math.min(word.length,3);
		}
		if (boldNum > 0) {
		if (mtrIndic.includes(word.charCodeAt(2)) || mtrIndic.includes(word.charCodeAt(3)) || mtrIndic.includes(word.charCodeAt(4)) || mtrIndic.includes(word.charCodeAt(5))) {
			if (mtrIndic.includes(word.charCodeAt(2))) boldNum =Math.min(word.length,4);
			if (mtrIndic.includes(word.charCodeAt(3))) boldNum =Math.min(word.length,5);
			if (mtrIndic.includes(word.charCodeAt(4))) boldNum =Math.min(word.length,6);
			if (mtrIndic.includes(word.charCodeAt(5))) boldNum =Math.min(word.length,7);
		}
		if (mtrIndic.includes(word.charCodeAt(boldNum)) && boldNum+1 <= word.length) boldNum++;
		if (mtrIndic.includes(word.charCodeAt(boldNum)) && boldNum+1 <= word.length) boldNum++;
		if (weight <= 400)
			bold.setAttribute('style', sCaps+'font-weight:'+wt+'!important');
		else
			bold.setAttribute('style', sCaps+'font-weight:'+weight+'!important');
		bold.setAttribute(focalAnchors.attrNameHighlight, '');
		bold.textContent = word.substr(spos, boldNum);
		node.parentNode.insertBefore(bold, node);
		}
		node.parentNode.insertBefore(document.createTextNode(word.substr(boldNum)+ '\u0020'), node);
	}
	words.length = 0;
	}
}

function invertEmojis(node) {
	if (node instanceof Element && node.hasAttribute(focalAnchors.attrNameContainer)) return;
	let txtc = node.textContent;
	var tag = '',ptag = '';
	if (node.parentNode) tag = node.parentNode.nodeName;
	if (node.parentNode && node.parentNode.parentNode) ptag = node.parentNode.parentNode.nodeName;
	let words = txtc.split(/' '/);
	for (let wordID = 0; wordID < words.length; wordID++) {
		if (words[wordID] == undefined || words[wordID] == null || words[wordID].length == 0) continue;
		if (!/(CODE|PRE)/i.test(tag) && words[wordID].replaceAll(/\s/g,'').length == 0) continue; // && (words[wordID].search(/\n+\t*/) != -1 || words[wordID].search(/\n+\ /) != -1)) continue;
		if (!/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/umg.test(words[wordID])) {
		let word = words[wordID];
		let boldNum = word.length;
		node.parentNode.insertBefore(document.createTextNode(word.substring(boldNum)+' '), node);
		} else {
		let word = words[wordID];
		let matches = word.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]{1,}/umg);
		let indx2 = word.lastIndexOf(matches[matches.length-1]) + matches[matches.length-1].length;
		let boldNum = indx2;
		const bold = document.createElement('span');
		bold.textContent = word.substring(0, indx2);
		if ((/span/i.test(tag) && /filter.*invert\(1/i.test(node.parentNode.getAttribute('style'))) || (/span/i.test(ptag) && /filter.*invert\(1/i.test(node.parentNode.parentNode.getAttribute('style'))))
			bold.setAttribute('style', 'color:white!important;');
		else
			bold.setAttribute('style', 'filter:invert(1)!important;color:white!important;');
		node.parentNode.insertBefore(bold, node);
		node.parentNode.insertBefore(document.createTextNode(word.substring(boldNum)+' '), node);
		matches.length = 0;
		}
	}
	words.length = 0;
}

function calcBrightness([r, g, b, a = 1])
{
	return (0.299*r + 0.587*g + 0.114*b)*a;
}

function calcColorfulness([r, g, b, a = 1])
{
	let max = Math.max(r,g,b);
	let min = Math.min(r,g,b);
	if (max == 0) return 0;
	return a*((max + min)*(max - min))/max;
}

function getVarValue(va) {
	var b = '';
	if (va.substr(0,4).indexOf('var(') > -1) {
		if (va.indexOf(',') > -1)
			b = va.replace(/var\(([^,]*?),.*/i, `$1`);
		else
			b = va.replace(/var\((.*?)\)/i, `$1`);
		return root_style.getPropertyValue(b);
	} else {
		return '';
	}
}

async function waitForImage(im) {
return new Promise((res, rej) => {
if (im.complete) {
return res();
}
im.onload = () => res();
im.onerror = () => res();
});
}

async function getBgImage(ch, gcs, bgim) {
	if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
		return false;
	var im, src, src1, wi, he;
	if (/var\(/i.test(bgim))
		src1 = getVarValue(bgim);
	else
		src1 = bgim;
	im = new Image();
	src = src1.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
	im.src = src;
	await waitForImage(im);
	wi = parseInt(im.width);
	he = parseInt(im.height);
	return [wi, he];
}

async function isImage(ch, nc, imar, gcs, b_imgforce) {
	if (!(ch instanceof Element)) return false;
	if (b_imgforce[nc] != true) b_imgforce[nc] = false;
	var wi,he;
	let bgim = gcs.backgroundImage ? gcs.backgroundImage : '';
	let chsrc = ch.src ? ch.src : '';
	let itag = ch.nodeName.toUpperCase();
	switch (itag) {
	case 'IMG':
		if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
			return false;
		wi = parseInt(ch.width);
		he = parseInt(ch.height);
		if (!wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		}
		imar[nc] = wi*he;
		if (wi > 499 && he > 99) b_imgforce[nc] = true;
		return true;
	case'SVG':
		if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
			return false;
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		imar[nc] = wi*he;
		if (wi > 499 && he > 99) b_imgforce[nc] = true;
		return true;
	case 'VIDEO':
	case 'EMBED':
	case 'OBJECT':
	case 'CANVAS':
		if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
			return false;
		wi = parseInt(ch.width);
		he = parseInt(ch.height);
		if (!wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		}
		imar[nc] = wi*he;
		return true;
	default:
	if ( gcs != null && bgim != '' && bgim != 'none' && gcs.getPropertyValue('display') != 'none' && !/(aspx?|html?|php)[\"\'\)]/i.test(bgim) && /(\/|http|url)/ig.test(bgim)) {
		if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
			return false;
		var im, src, src1;
		if (/var\(/i.test(bgim))
			src1 = getVarValue(bgim);
		else
			src1 = bgim;
                im = new Image();
                src = src1.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
		im.src = src;
		await waitForImage(im);
		wi = parseInt(im.width);
		he = parseInt(im.height);
		if (/\.svg/i.test(src) && !wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width));
		he = parseInt(parseInt(ch.getBoundingClientRect().height));
		} else if (!wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		}
		imar[nc] = wi*he;
		if (wi > 499 && he > 99) b_imgforce[nc] = true;
		if ((wi > 0 && he > 0) || (wi == 0 && he == 0)) {
			return true;
		} else {
			return false;
		}
	} else if (chsrc != undefined && chsrc && ch.display != 'none' && ch.type != null && ch.type != undefined && ch.type.toLowerCase() == 'image' && !/(aspx?|html?|php)[\"\'\)]/i.test(chsrc) && !/(aspx?|html?|php)[\"\'\)]/i.test(bgim)  && (/(\/|http|url)/ig.test(chsrc))) {
		if ((/(hidden|none)/i.test(gcs.visibility) || /(hidden|none)/i.test(gcs.display)) && ch.getAttribute('loading') != 'lazy')
			return false;
		var im, src, src1;
                im = new Image();
		if (/var\(/i.test(bgim))
			src1 = getVarValue(chsrc);
		else
			src1 = chsrc;
                src = src1.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
		im.src = src;
		await waitForImage(im);
		wi = parseInt(im.width);
		he = parseInt(im.height);
		if (!wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		}
		imar[nc] = wi*he;
		if (wi > 499 && he > 99) b_imgforce[nc] = true;
		return true;
	} else {
		return false;
	}
	}
	return false;
}

function containsImage(node, imgs)
{
	let childn = Array.from(node.getElementsByTagName('*'));
	var img;
	for (let img of imgs) {
		if (childn.includes(img)) return true;
	}
	childn.length = 0;
	return false;
}

function parentStyle(node,reg,arr) {
	let pch = node.parentNode;
	let b_found = false;
	let ns = [node];
	while (pch && !/\b(BODY|HTML)/i.test(pch.nodeName)) {
		if (pch && pch instanceof Element) {
		ns.push(pch);
		if (reg.test(getComputedStyle(pch).filter)) {
			b_found = true; break;
		}
		}
		pch = pch.parentNode;
	}
	if (b_found)
		arr.push(...ns);
	else
		for (let x=0; x < ns.length; x++) {
			let n = ns[x];
			let i = arr.indexOf(n);
			if (i >= 0)
				arr.splice(x,1);
		}
	return b_found;
}

function topNode(node) {
	let pch = node.parentNode;
	let c = 0;
	while (pch && !/\b(BODY|HTML)/i.test(pch.nodeName)) {
		pch = pch.parentNode;
		c++;
	}
	return c;
}

function getTopNode(node) {
	let pch = node.parentNode;
	let c = node;
	while (pch && !/\b(BODY|HTML)/i.test(pch.nodeName)) {
		c = pch;
		pch = pch.parentNode;
	}
	return c;
}

function getCSS(cfg) {

	const attr = '[d__],[d__][style]';
	let color_black = 'color:black!important;';

	let dim = '';
	let sCaps = '';
	var brght,ctrst;
	if (cfg.advDimming) {
		brght = 'var(--g_brightness)';
		ctrst = 'var(--g_contrast)';
		document.documentElement.style.setProperty('--g_brightness',(100 + (parseInt(cfg.contrast))).toFixed(1)+'%');
		document.documentElement.style.setProperty('--g_contrast', (50 + parseInt(cfg.brightness)).toFixed(1)+'%');
		dim = `filter:brightness(var(--g_brightness)) contrast(var(--g_contrast))!important;`;
	}

	let opacity = '';
	if (cfg.forceOpacity)
		opacity = 'opacity:1!important;';

	let boldw = cfg.weight;
	let bold = '';
	if (!(cfg.skipLinks && !cfg.start3))
	if (!cfg.start3 || boldw < 400)
	if (boldw != 400)
		bold = `*{font-weight:${boldw}!important};`;

	let underline = '';
	if (cfg.underlineLinks)
		underline = '[u__]{text-decoration:underline!important}';

	if (!cfg.forcePlhdr)
		color_black = '';

	if (cfg.makeCaps)
		sCaps = 'font-variant-caps:small-caps!important;';

	const placeholder = `::placeholder{opacity:1!important;${color_black}};`;

	let form_border = '';
	if (cfg.input_border)
		form_border = '[b__]{border:1px solid black!important}';

	if (cfg.forcePlhdr && (cfg.contrast != 0 || cfg.brightness != 50)) {
		g_brightness = 1.0+parseInt(cfg.contrast)/100;
		g_contrast = 1.0 + (parseInt(cfg.brightness)-50)/100;
		document.documentElement.style.setProperty('--g_brightness',parseInt(100*g_brightness)+'%');
		document.documentElement.style.setProperty('--g_contrast', parseInt(100*g_contrast)+'%');
		g_m = multiplyMatrices(Matrix.identity(), Matrix.brightness(g_brightness));
		g_m2 = multiplyMatrices(g_m, Matrix.contrast(g_contrast));
		g_m = multiplyMatrices(g_m2, Matrix.invertNHue());
	} else if (cfg.forcePlhdr && cfg.contrast == 0 && cfg.brightness == 50) {
		g_brightness = 1.00;
		g_contrast = 1.00;
		document.documentElement.style.setProperty('--g_brightness',parseInt(100*g_brightness)+'%');
		document.documentElement.style.setProperty('--g_contrast', parseInt(100*g_contrast)+'%');
		g_m = Matrix.invertNHue();
	}

	let cust = '';
	if (cfg.customCss)
		cust = cfg.customCssText;

	let size_inc = '';
//	let c = cfg.threshold;
//	let cc = parseInt(c) + parseFloat(cfg.size/c);
//	let height_inc = parseFloat(cfg.size/c)/parseFloat(cfg.size);
	let c = 0, cd = 0;
	let cc = 0;
	let height_inc = 1;
	var pcent;

	let n_zoo = Math.abs(parseFloat(cfg.strength)/100).toFixed(2);
	if (cfg.customCss && /\-\-g_zoom[\W\:]+/.test(cust)) {
		let cs = cust;
		cs = cs.replace(/[\w\W]*g_zoom[\W\:]+([0-9\.]+)[\w\W]*/g,`$1`);
		n_zoo = parseFloat(cs);
	} else if (cfg.globalCss != undefined && cfg.globalCss && /\-\-g_zoom[\W\:]+/.test(cfg.globalCss)) {
		let cs = cfg.globalCss;
		cs = cs.replace(/[\w\W]*g_zoom[\W\:]+([0-9\.]+)[\w\W]*/g,`$1`);
		n_zoo = parseFloat(cs);	
	} else if (cfg.strength == 0) {
		n_zoo = 1.75;
	}

	document.documentElement.style.setProperty('--g_zoom',n_zoo);

	g_mag = ".btvenlarge:hover { position: relative; overflow: visible;-webkit-transform: scale(var(--g_zoom));-moz-transform: scale(var(--g_zoom));-o-transform: scale(var(--g_zoom));-ms-transform: scale(var(--g_zoom));transform: scale(var(--g_zoom));-webkit-transition: all .2s ease-in-out;-moz-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;-ms-transition: all .2s ease-in-out;z-index: 19999;} .btvenlarge {position: relative; overflow: hidden;z-index: 1000; }";

	g_anegative = false;
	if (cfg.customCss && cust.indexOf('--g_avoid_negative') > -1) {
		if (/\-\-g_avoid_negative[^\;]*false\;/.test(cust))
			g_anegative = false;
		else if (/\-\-g_avoid_negative[^\;]*nowait\;/i.test(cust))
			g_anegative = -1;
		else
			g_anegative = true;
	} else if (cfg.globalCss != undefined && cfg.globalCss && cfg.globalCss.indexOf('--g_avoid_negative') > -1) {
		if (/\-\-g_avoid_negative[^\;]*false\;/.test(cfg.globalCss))
			g_anegative = false;
		else if (/\-\-g_avoid_negative[^\;]*nowait\;/i.test(cfg.globalCss))
			g_anegative = -1;
		else
			g_anegative = true;
	}

	g_smaller_text = false;
	if (cfg.customCss && cust.indexOf('--g_smaller_text') > -1) {
		if (!/\-\-g_smaller_text[^\;]*false\;/.test(cust))
			g_smaller_text = true;
		else
			g_smaller_text = false;
	} else if (cfg.globalCss != undefined && cfg.globalCss && cfg.globalCss.indexOf('--g_smaller_text') > -1) {
		if (!/\-\-g_smaller_text[^\;]*false\;/.test(cfg.globalCss))
			g_smaller_text = true;
		else
			g_smaller_text = false;
	}

	if (cfg.size > 0 && cfg.threshold > 0) {
		height_inc = (1.07 + 0.225*cfg.size/cfg.threshold).toFixed(2);
		while (c < cfg.threshold) {
			++c;
			cd = c;
			if (!cfg.start3 && cfg.skipLinks) {
				cc = (cfg.size*0.2) + (parseFloat(cfg.threshold*1.075) - (2*c/11))*(100+((cfg.weight+400) % 900))/900;
				pcent = Math.abs((2.5*cfg.size) - (c*20/cfg.threshold))*(100+((cfg.weight+400) % 900))/900;
			} else {
				cc = (cfg.size*0.2) + parseFloat(cfg.threshold*1.075) - (2*cd/11);
				pcent = Math.abs((2.5*cfg.size) - (cd*20/cfg.threshold));
			}
			if (parseFloat(cc) < c && !g_smaller_text) { cc = c; }
			if (parseFloat(cc) > cfg.threshold) cc = cfg.threshold;
			let cc1 = parseInt(cc);
			var cc2;
			if (g_smaller_text)
				cc2 = (cc1*(1-0.5*parseFloat(pcent)/20)).toFixed(1);
			else
				cc2 = (cc1*(1+parseFloat(pcent)/100)).toFixed(1);
			size_inc += `[s__='${c}']{font-size: ${cc2}px!important;`;
			if (!cfg.skipHeights)
				size_inc += `line-height: ${height_inc}em!important;${sCaps}${dim}${opacity}}\n`;
			else
				size_inc += `${sCaps}${dim}${opacity}}\n`;
			size_inc += `[h__='${c}']{line-height:115%!important;min-height: ${height_inc}em!important}`;
			if (!cfg.skipHeights)
				f_sizes[c] = "font-size: " + cc2 + "px!important;"+sCaps+"line-height: " + height_inc + "em!important;" + dim + opacity;
			else
				f_sizes[c] = "font-size: " + cc2 + "px!important;"+sCaps+ dim + opacity;
			h_sizes[c] = `${height_inc}em`;
			if (cc2.substr(-2,2).indexOf('.0') > -1) cc2 = parseInt(cc2);
			f2_sizes[c] = cc2 + "px";
		}
	}
	str_style = `brightness(${brght}) contrast(${ctrst})`;
	str_style2 = '1';

	g_globalCss = '';
	if (cfg.globalCss != undefined && cfg.globalCss)
		g_globalCss = cfg.globalCss;

	return `${bold}${size_inc}${g_mag}${form_border}${underline}${g_globalCss}${cust}`;
}

function createElem()
{
	let doc = document;

	style_node = doc.createElement('style');
	style_node.setAttribute('id', '_btv_');
	let d_head = doc.head || doc.getElementsByTagName('HEAD')[0];
	if (d_head != undefined && d_head != null)
		d_head.appendChild(style_node);
	else
		d_head = '';

	css_node = doc.createTextNode('');
}

async function loadURL(url) {
	return await (await fetch(url)).text();
}

var timerid;

function isloaded() {
	if (/complete/i.test(document.readyState)) {
		clearTimeout(timerid);
		return;
	}
	timerid = setTimeout(isloaded, 5);
}

async function init()
{
	setTimeout(isloaded, 5);

	if (document.getElementById('_btv_')) return;

	t_start = Date.now();

	createElem();

	let stored = [
		'enableEverywhere',
		'whitelist',
		'blacklist',
		'globalStr',
		'size',
		'sizeThreshold',
		'weight',
		'skipColoreds',
		'skipHeadings',
		'advDimming',
		'brightness',
		'contrast',
		'forceOpacity',
		'normalInc',
		'normalInc2',
		'ssrules',
		'forcePlhdr',
		'forceIInv',
		'doGradients',
		'pseudoAB',
		'skipWhites',
		'skipBlack',
		'makeCaps',
		'start3',
		'skipLinks',
		'skipNavSection',
		'skipHeights',
		'underlineLinks',
		'input_border',
		'fontFamily',
		'fontFamilyName',
		'customCss',
		'customCssText',
		'globalCss'
	];

	let cfg = await new Promise(res => chrome.storage.local.get(stored, res));

	cfg.strength  = cfg.globalStr;
	cfg.threshold = cfg.sizeThreshold;

	let url = window.location.hostname || window.location.href;
	g_url = url.trim();

	if (window.self != window.top) {
		let fr = document.getElementsByTagName('HTML')[0];
		if (fr && fr != undefined && (parseInt(fr.getBoundingClientRect().height) < 10 || parseInt(fr.getBoundingClientRect().width) < 10)) return;
	}

	let bl  = cfg.blacklist || [];
	let idx = bl.findIndex(x => x.url === url);

	if (idx > -1) {
		let cnode = document.getElementById("_btv_");
		if (style_node.hasChildNodes()) {
			style_node.removeChild(cnode);
		}
		cnode.remove();
		return;
	}

	let wl  = cfg.whitelist || [];
	idx = wl.findIndex(x => x.url === window.location.href);

	let g_css = cfg.globalCss;
	if (idx > -1) {
		cfg = wl[idx];
	} else {
		idx = wl.findIndex(x => x.url === url);
		if (idx > -1) {
			cfg = wl[idx];
		} else if (!cfg.enableEverywhere) {
			let cnode = document.getElementById("_btv_");
			cnode.remove();
			return;
		}
	}
	cfg.globalCss = g_css;

	start(cfg);
}

const delay = ms => new Promise(res => setTimeout(res, ms));
async function waitDelay(sec) {
	await delay(sec);
	return;
}

async function start(cfg, url)
{
	css_node.nodeValue = getCSS(cfg);

/**	for (let s of document.getElementsByTagName('STYLE')) {
		css_node.nodeValue += s.innerHTML;
	}*/

	let nodes = [];

	if (document.body)
		nodes = Array.from(document.body.getElementsByTagName('*'));
	else
		return;

	let tags_to_skip = [
		'SCRIPT',
		'LINK',
		'META',
		'STYLE',
		'VIDEO',
		'AUDIO',
		'SVG',
		'IMG',
		'EMBED',
		'OBJECT',
		'SOURCE',
		'CANVAS',
		'NOSCRIPT',
		'UNDEFINED'
	];

	let hdr_tags = ['H1', 'H2', 'H3', 'H4'];

	let callcnt = 0;

	let b_ctext = {};
	let b_chimg = {};
	let b_iimg = {};
	let b_dim = {};
	let m_sty = {};
	let b_emo = {};
	let b_noemo = true;
	let b_idone = {};
	let b_cdone = {};
	let b_chk = {};
	let b_imgforce = {};
	let n_rulecount = 0;
	let images = [];
	let img_area = {};
	let map = new Map();
	let m_ss = {};
	let m_done = {};
	let nodes_behind_inv = [];
	let n_imgcount = 0;
	let b_csp = true;
	let b_forced = false;
	let str300 = cfg.strength == -300;
	let no_skip = true;
	let skip_this = [];
	let skip_colors_nodes = [];
	let skip_colors_top_nodes = [];
	let nodes_to_skip = [];
	let nodes_to_observe = [];
	root_style = getComputedStyle(document.documentElement);
	let rootsty = root_style;
	let browser_sfz = 'px';
	if (rootsty.fontSize && /\d.*?px/i.test(rootsty.fontSize))
		browser_sfz = rootsty.fontSize;
	g_eng = false;
	var lang;
	var b_opa = false;
	if (cfg.start3 || cfg.makeCaps) {
		lang = document.documentElement.lang;
		if (lang == null || lang.length == 0)
			g_eng = true;
		else if (/^en/i.test(lang))
			g_eng = true;
	} else {
		g_eng = true;
	}
	let rootcolor       =  getRGBarr(rootsty.backgroundColor);
	let bodycolor       =  getRGBarr(getComputedStyle(document.body).backgroundColor)
	if (rootcolor != '' && bodycolor != '') {
	let rootLightness   = 1 -  rootcolor[3] + rootcolor[3] * calcBrightness(rootcolor)/255;
	finalLightness  = Math.abs((1 - bodycolor[3]) * rootLightness + bodycolor[3] * calcBrightness(bodycolor)/255);
	finalLightness = Math.sqrt(finalLightness);
        if (window.self == window.top)
		chrome.storage.local.set({lightness: finalLightness, default_size: browser_sfz});
	console.log('Dark / Light = '+finalLightness.toFixed(2));
	if (cfg.forcePlhdr || cfg.advDimming)
	if (finalLightness < 0.5)  {
		if (cfg.advDimming && cfg.forcePlhdr) {
			var cs = css_node.nodeValue;
			var rcs = cs.replaceAll(/filter.*?brightness.*?contrast.*?important\;/mg,'');
			css_node.nodeValue = rcs;
			cfg.forcePlhdr = true;
			cfg.advDimming = false;
		} else {
			if (cfg.advDimming) {
				cfg.forcePlhdr = false;
				cfg.forceIInv = false;
			} else if (cfg.forcePlhdr) {
				cfg.forcePlhdr = false;
				cfg.forceIInv = false;
				cfg.advDimming = true;
				b_forced = true;
			}
		}
	} else {
		if (cfg.advDimming && cfg.forcePlhdr) {
			cfg.forcePlhdr = false;
			cfg.forceIInv = false;
		} else {
			if (cfg.advDimming) b_forced = true;
			cfg.forcePlhdr = true;
			cfg.advDimming = false;
			var cs = css_node.nodeValue;
			var rcs = cs.replaceAll(/filter.*?brightness.*?contrast.*?important\;/mg,'');
			css_node.nodeValue = rcs;
		}
	}
	}

	let style_rule = "";
	if (cfg.forcePlhdr && cfg.forceIInv) {
	style_rule += "CANVAS,EMBED,IMG,OBJECT,SVG,VIDEO,INPUT[type='image'] { filter:invert(1); }";
	style_rule += "._btvinvertb_:before,._btvinverta_:after { filter:invert(1); }";
	style_rule += "[style*='background-image:url'],[style*='background-image:var'],[style*='background-image: url'],[style*='background-image: var']  { filter:invert(1); }";
	style_rule += "body[style*='background-image:url'],body[style*='background-image:var'],body[style*='background-image: url'],body[style*='background-image: var'] { filter:unset!important; }";
	style_rule += "[style*='background-image:none'],[style*='background-image: none'] { filter:unset!important; }";
	style_rule += "frame,iframe { filter:invert(1); }";
	}
	if (cfg.pseudoAB)
		style_rule += "._btvfontb_:before,._btvfonta_:after { font-size:"+cfg.threshold+"px !important; color: var(--g_beforeafter_color) !important; }";

	if (g_anegative != true)
		css_node.nodeValue += style_rule;

	style_node.appendChild(css_node);

	if ((cfg.customCss && cfg.customCssText) || g_globalCss) {

	let docs = getComputedStyle(document.documentElement);

	if (docs.getPropertyValue('--g_min_colorfulness'))
	g_min_colorfulness = docs.getPropertyValue('--g_min_colorfulness');
	else
	g_min_colorfulness = 41;
	if (docs.getPropertyValue('--g_bg_threshold'))
	g_bg_threshold = docs.getPropertyValue('--g_bg_threshold');
	else
	g_bg_threshold = 160;
	if (docs.getPropertyValue('--g_zoom_keycode'))
	g_zoom_keycode = docs.getPropertyValue('--g_zoom_keycode');
	else
	g_zoom_keycode = 16;
	if (docs.getPropertyValue('--g_foot_re')) {
	g_foot_re = docs.getPropertyValue('--g_foot_re');
	if (g_foot_re == 'false') g_foot_re = false;
	} else {
	g_foot_re = false;
	}
	if (docs.getPropertyValue('--g_max_child'))
	g_max_child = docs.getPropertyValue('--g_max_child');
	else
	g_max_child = 8;
	if (docs.getPropertyValue('--g_min_bg_brightness'))
	g_min_bg_brightness  = docs.getPropertyValue('--g_min_bg_brightness');
	else
	g_min_bg_brightness = 2*g_min_colorfulness;
	if (docs.getPropertyValue('--g_max_fg_brightness'))
	g_max_fg_brightness  = docs.getPropertyValue('--g_max_fg_brightness');
	else
	g_max_fg_brightness = 254;
	if (docs.getPropertyValue('--g_skip_css')) {
	g_skip_css = docs.getPropertyValue('--g_skip_css');
	if (g_skip_css == 'false') g_skip_css = false;
	} else {
	g_skip_css = false;
	}
	if (docs.getPropertyValue('--g_skip_css_colors')) {
	g_skip_css_colors = docs.getPropertyValue('--g_skip_css_colors');
	if (g_skip_css_colors == 'false') g_skip_css_colors = false;
	} else {
	g_skip_css_colors = false;
	}
	if (docs.getPropertyValue('--g_zoom_padding'))
	g_zoom_padding = docs.getPropertyValue('--g_zoom_padding');
	else
	g_zoom_padding = '0% 15% 0% 15%';
	if (docs.getPropertyValue('--g_max_border'))
	g_max_border = docs.getPropertyValue('--g_max_border');
	else
	g_max_border = 21;
	if (docs.getPropertyValue('--g_max_css_rules'))
	g_max_css_rules = docs.getPropertyValue('--g_max_css_rules');
	else
	g_max_css_rules = 100;
	if (docs.getPropertyValue('--g_svg_bg_white')) {
	g_svg_bg_white = docs.getPropertyValue('--g_svg_bg_white');
	if (g_svg_bg_white == 'false') g_svg_bg_white = false;
	} else {
	g_svg_bg_white = false;
	}
	if (docs.getPropertyValue('--g_start3_caps')) {
	g_start3_caps = docs.getPropertyValue('--g_start3_caps');
	if (/(line|para)/.test(g_start3_caps))
		g_start3_caps = g_start3_caps.replaceAll(/[\'\"]/g,'');
	else
		g_start3_caps = 'font-variant-caps:small-caps!important;';
	} else {
	g_start3_caps = '';
	}
	if (docs.getPropertyValue('--g_load_crossorigin')) {
	g_load_crossorigin = docs.getPropertyValue('--g_load_crossorigin');
	if (g_load_crossorigin == 'false') g_load_crossorigin = false;
	} else {
	g_load_crossorigin = false;
	}
	if (docs.getPropertyValue('--g_keep_colors')) {
	g_keep_colors = docs.getPropertyValue('--g_keep_colors');
	if (g_keep_colors == 'false') g_keep_colors = false;
	} else {
	g_keep_colors = false;
	}
	if (docs.getPropertyValue('--g_speech_language'))
	g_speech_language = docs.getPropertyValue('--g_speech_language');
	else
	g_speech_language = document.documentElement.lang;
	if (docs.getPropertyValue('--g_continue_speech')) {
	g_continue_speech = docs.getPropertyValue('--g_continue_speech');
	if (g_continue_speech == 'false') g_continue_speech = false;
	} else {
	g_continue_speech = false;
	}
	if (docs.getPropertyValue('--g_change_vars')) {
	g_change_vars = docs.getPropertyValue('--g_change_vars');
	if (g_change_vars == 'false') g_change_vars = false;
	} else {
	g_change_vars = false;
	}
	if (docs.getPropertyValue('--g_min_image_size'))
	g_min_image_size = docs.getPropertyValue('--g_min_image_size');
	else
	g_min_image_size = 199;
	if (docs.getPropertyValue('--g_load_delay'))
	g_load_delay = docs.getPropertyValue('--g_load_delay');
	else
	g_load_delay = 0;
	if (docs.getPropertyValue('--g_site_reminder'))
	g_site_reminder = docs.getPropertyValue('--g_site_reminder');
	else
	g_site_reminder = '';

	if (docs.getPropertyValue('--g_skip_colors_classes')) {
		let skipcols = docs.getPropertyValue('--g_skip_colors_classes');
		if (skipcols.indexOf(',') > -1)
			g_skip_colors_classes = skipcols.split(',');
		else
			g_skip_colors_classes = [ skipcols.trim() ];
		no_skip = false;
		for (let cn of g_skip_colors_classes) {
			let cna = Array.from(document.getElementsByClassName(cn.trim()));
			for (let ch of cna) {
			if (ch && ch != undefined) {
				skip_colors_nodes.push(ch);
				skip_colors_top_nodes.push(ch);
				let cnarr = Array.from(ch.getElementsByTagName('*'));
				skip_colors_nodes.push(...cnarr);
			}
			}
		}
	}
	if (docs.getPropertyValue('--g_skip_colors_tags')) {
		let skipcols = docs.getPropertyValue('--g_skip_colors_tags');
		if (skipcols.indexOf(',') > -1)
			g_skip_colors_tags = skipcols.split(',');
		else
			g_skip_colors_tags = [ skipcols.trim() ];
		for (let cn of g_skip_colors_tags) {
			let cna = Array.from(document.getElementsByTagName(cn.trim()));
			for (let ch of cna) {
			if (ch && ch != undefined) {
				skip_colors_nodes.push(ch);
				skip_colors_top_nodes.push(ch);
				let cnarr = Array.from(ch.getElementsByTagName('*'));
				skip_colors_nodes.push(...cnarr);
			}
			}
		}
	}
	if (docs.getPropertyValue('--g_skip_colors_ids')) {
		let skipcols = docs.getPropertyValue('--g_skip_colors_ids');
		if (skipcols.indexOf(',') > -1)
			g_skip_colors_ids = skipcols.split(',');
		else
			g_skip_colors_ids = [ skipcols.trim() ];
		no_skip = false;
		for (let cn of g_skip_colors_ids) {
			let ch = document.getElementById(cn.trim());
			if (ch && ch != undefined) {
			skip_colors_nodes.push(ch);
			skip_colors_top_nodes.push(ch);
			let cnarr = Array.from(ch.getElementsByTagName('*'));
			skip_colors_nodes.push(...cnarr);
			}
		}
	}
	} else {
		g_min_colorfulness = 41;
		g_bg_threshold = 160;
		g_zoom_keycode = 16;
		g_foot_re = false;
		g_max_child = 8;
		g_min_bg_brightness = 82;
		g_max_fg_brightness = 254;
		g_skip_css = false;
		g_skip_css_colors = false;
		g_keep_colors = false;
		g_zoom_padding = '0% 15% 0% 15%';
		g_max_border = 21;
		g_max_css_rules = 100;
		g_start3_caps = '';
		g_load_crossorigin = false;
		g_speech_language = document.documentElement.lang;
		g_continue_speech = false;
		g_skip_colors_classes = [];
		g_skip_colors_tags = [];
		g_skip_colors_ids = [];
		skip_colors_nodes = [];
		skip_colors_top_nodes = [];
		g_svg_bg_white = false;
		g_change_vars = false;
		g_min_image_size = 199;
		g_load_delay = 0;
		g_site_reminder = '';
	}

	if (g_load_delay > 0) {
		await waitDelay(g_load_delay);
		console.log('Delay of '+g_load_delay+'ms done');
		nodes = Array.from(document.body.getElementsByTagName('*'));
	}

	if (g_site_reminder) {
		var txt,txt2;
		txt2 = g_site_reminder.replaceAll(/\\n/g,'\n');
		if (txt2[0] == "\'" || txt2[0] == '\"') txt = txt2.substr(1,txt2.length-2);
		alert('REMINDER for site : '+g_url+'\n\n'+txt+'\n\nTo remove this reminder, edit custom CSS of this site in Better Text View.');
	}

	let colors_to_skip  = [
		'transparent',
		'rgba(0, 0, 0, 0)',
		'inherit',
		'initial',
		'unset',
		'none',
		'currentcolor',
		'currentColor',
		'revert',
		'revert-layer'
	];

	let g_white = [
		'rgb(255, 255, 255)',
		'rgb(254, 254, 254)',
		'rgb(253, 253, 253)'
	];

	let g_black = [
		'black',
		'rgb(0, 0, 0)',
	];
	if (!cfg.skipBlack) {
		colors_to_skip.push(...g_black);
	}
	if (cfg.skipWhites) {
		colors_to_skip.push(...g_white);
	}

	var doc = document;
	if (g_max_css_rules > 0) {
	let rn = 0;
	let b_sec = false;
	let body_nfz = 16;
	let b_bdone = false;
	let m_ssdone = {};
	let bdy_classid = [];
	let bimp = g_keep_colors ? 'important' : '';
	try {
	if (cfg.forcePlhdr && cfg.normalInc && document.body && document.body != undefined) {
	if (document.body.className && document.body.className != undefined) {
		let b2 = document.body.className;
		b2 = b2.replaceAll(/\b(\w)/g,`\.$1`);
		let b_a = b2.split(/\s+/);
		bdy_classid.push(...b_a);
	}
	if (document.body.id && document.body.id != undefined) {
		let b2 = document.body.id;
		b2 = '#'+b2;
		bdy_classid.push(b2);
	}
	}
	var brul;
	if (browser_sfz) body_nfz = parseInt(browser_sfz);
	for (var si = 0; si < document.styleSheets.length; si++) {
		var sheet,rules;
		try {
		sheet = document.styleSheets[si];
		if (g_load_crossorigin && sheet.href && sheet.href.indexOf(window.location.origin) < 0 && m_ssdone[sheet.href] != true) {
		if (!/\.s?css/i.test(sheet.href)) {
			m_ssdone[sheet.href] = true;
			continue;
		}
		let txt = await loadURL(sheet.href);
		let s = document.createElement('style');
		s.type = "text/css";
		s.rel = "stylesheet";
		s.textContent = txt;
		s.media = 'only screen and (max-width: '+window.innerWidth+'px)';
		document.head.appendChild(s);
		m_ssdone[sheet.href] = true;
		continue;
		}
		rules = sheet.cssRules;
		} catch (e) {
		console.log('Error : '+e);
		if (g_load_crossorigin && sheet.href && sheet.href.indexOf(window.location.origin) < 0 && m_ssdone[sheet.href] != true) {
		console.log('should not happen');
		m_ssdone[sheet.href] = true;
		}
		continue;
		}
		try {
		let rl = rules.length;
		if (rl > g_max_css_rules) continue;
		let ri = 0;
		for (ri = 0; ri < rl; ri++) {
		b_sec = false;
		let rule = rules[ri];
		var fgr,fgr1,fgarr;
		let txtrul = '';
		let txtrul2 = '';
		if (rule.href && rule.href != undefined && /\.s?css/i.test(rule.href)) { rules = rule.styleSheet.cssRules; ri = 0; rl = rules.length; continue; }
		if (rule.selectorText && rule.style) {
		let key = rule.selectorText;
		let value = rule.style.cssText;
		if (g_foot_re && /footer/i.test(key)) continue;
		if (m_done[key] == undefined) m_done[key] = 0;
		let b_skip = false;
		if (!no_skip && cfg.forcePlhdr && cfg.normalInc) {
		for (brul of g_skip_colors_classes) {
			if (key.indexOf("."+brul) > -1) { b_skip = true;break; }
		}
		if (b_skip != true)
		for (brul of g_skip_colors_ids) {
			if (key.indexOf("#"+brul) > -1) { b_skip = true;break; }
		}
		}
		if (cfg.forcePlhdr && cfg.normalInc)
		if (b_skip != true && m_done[key] < 3 && (rule.style.color || rule.style.backgroundColor)) {
		if (/\b(BODY|HTML)\b/i.test(key) || bdy_classid.includes(key)) continue;
			m_done[key]++;
			var aaa, bbb, imp;
			imp = '';
				function setRuleColor(rule,attr,val,chg_var) {
					var fgarr = [],fgr,fgr1 = [],aaa,bbb,ccc,opt_val,attr2,var_match,col;
					col = rule.style.getPropertyValue(attr);
					var_match = col.match(/var\(/g) ? col.match(/var\(/g).length : 0;
					if (var_match == 1 && col.substr(0,4).indexOf('var(') > -1) {
					aaa = col.replace(/var\(/,'').replace(/[\)\,\/].*/,'').trim();
					attr = aaa;
					bbb = root_style.getPropertyValue(aaa) || rule.style.getPropertyValue(aaa);
					if (!(bbb && bbb.length)) {
						aaa = col.replace(/.*?var\([^\,\/]*[\,\/]([^\)]+\)).*$/,`$1`).trim();
						bbb = aaa;
						if (aaa.indexOf('(') < 0 && aaa.indexOf(')') > -1) bbb = aaa.replace(/\)+/g,'');
						aaa = attr;
					}
					if (chg_var) {
					if (aaa && bbb) {
						attr = aaa;
						val = bbb;
					}
					} else {
						val = bbb;
					}
					} else if (var_match > 0 && g_skip_css == 1998) {
					
					//val = col.replace(/\s+/g,'').trim();
					chg_var = chg_var ? 0 : -999;
					attr2 = attr;
					let n_iter = 0;
					while (val.indexOf('var(') > -1) {
						if (n_iter > var_match)
							break;
						else
							n_iter++;
						ccc = val.indexOf('var(')+4;
						aaa = val.substr(ccc).indexOf(')');
						bbb = val.substr(ccc).indexOf(',');
						let bbb2 = val.substr(ccc).indexOf('/');
						opt_val = 0;
						if ((bbb < aaa && bbb > -1) || (bbb2 < aaa && bbb2 > -1)) {
						opt_val = 1;
						if (bbb < 0) bbb = bbb2;
						aaa = val.substr(ccc,bbb).trim();
						attr = aaa;
						bbb = rule.style.getPropertyValue(aaa) || root_style.getPropertyValue(aaa);
						if (!(bbb && bbb.length)) {
						aaa = val.replace(/var\([^\,\)\/]*?[\)\,\/]([^\)]*?)\)/,`$1`).trim();
						//if (/^var\(/.test(aaa)) aaa = aaa.replace(/^var\(/,'');
						opt_val++;
						if (aaa.indexOf('var(') < 0) {
							if (aaa.indexOf('(') < 0 && aaa.indexOf(')') > -1) val = aaa.replace(/\)+$/,'').trim();
							val = aaa;
							continue;
						} else {
							val = aaa;
							continue;
						}
						} else {
							opt_val = 0;
							/**
							aaa = val.replace(/var\(${aaa}\,[^\)]*?\)/,bbb).trim();
							val = aaa;
							continue;
							*/
						}
						} else {
						bbb = val.substr(ccc,aaa).trim();
						aaa = bbb;
						attr = aaa;
						bbb = rule.style.getPropertyValue(aaa) || root_style.getPropertyValue(aaa);
						}
						if (opt_val && !(bbb && bbb.length)) { console.log('bailing at color = '+val); return []; }
						if (!opt_val) {
							col = val.replace(/var\(.*?\)/,bbb).trim();
						} else if (opt_val == 1 && bbb.indexOf('--') > -1) {
							col = bbb.replace(/\)/,'').trim();
							bbb = rule.style.getPropertyValue(col) || root_style.getPropertyValue(col);
							col = val.replace(/var\(.*?\)\)/,bbb).trim();
						} else {
							col = val.replace(/var\(.*?\)\)/,bbb).trim();
						}
						if (col.indexOf('(') < 0 && col.indexOf(')') > -1) col = col.replace(/\)+$/,'').trim();
						//if (/\)\)/.test(col)) col = col.replace(/\)$/,'').trim();
						val = col;
						chg_var++;
					}
					if (chg_var > 1) {
						//val = bbb;
						chg_var = 0;
						attr = attr2;
					}
					} else {
						val = col;
					}
					if (!val) return [];
					if (val.substr(0,3).indexOf('rgb') > -1) {
					if (!/\d+/.test(val)) return [];
					fgarr = getRGBarr(val);
					if (!fgarr) return [];
					if (!g_keep_colors)
						fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					else
						fgr1 = [255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3]];
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					fgr = 'rgba('+fgr1+')';
					if (fgr1[0] != fgarr[0] || fgr1[1] != fgarr[1] || fgr1[2] != fgarr[2]) {
					m_sty[fgarr] = fgr1;
					m_sty[fgr1] = fgr1;
					}
					} else if (val.substr(0,1).indexOf('#') > -1) {
					let b = val.length == 4 ? val+'f' : val+'ff';
					fgarr = hexToRGBA(b);
					if (!g_keep_colors)
						fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					else
						fgr1 = [255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3]];
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					fgr = 'rgba('+fgr1+')';
					if (fgr1[0] != fgarr[0] || fgr1[1] != fgarr[1] || fgr1[2] != fgarr[2]) {
					m_sty[fgarr] = fgr1;
					m_sty[fgr1] = fgr1;
					}
					} else if (val.substr(0,3).indexOf('hsl') > -1) {
					if (!/\d+/.test(val)) return [];
					let c = getHSLarr(val);
					if (!c) return [];
					fgarr = hslToRGB(c);
					if (!g_keep_colors)
						fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					else
						fgr1 = [255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3]];
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					fgr = 'rgba('+fgr1+')';
					if (fgr1[0] != fgarr[0] || fgr1[1] != fgarr[1] || fgr1[2] != fgarr[2]) {
					m_sty[fgarr] = fgr1;
					m_sty[fgr1] = fgr1;
					}
					} else if (/^\w+$/.test(val)) {
					var a;
					a = namedColors.get(val);
					if (a && a != undefined) { 
					let b = a.length == 4 ? a+'f' : a+'ff';
					fgarr = hexToRGBA(b);
					if (!g_keep_colors)
						fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					else
						fgr1 = [255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3]];
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					}
					fgr = 'rgba('+fgr1+')';
					if (fgr1[0] != fgarr[0] || fgr1[1] != fgarr[1] || fgr1[2] != fgarr[2]) {
					m_sty[fgarr] = fgr1;
					m_sty[fgr1] = fgr1;
					}
					}
					if (attr == false) attr = attr2;
					return [attr,fgr,chg_var];
				}


			if ((g_skip_css != 99 || cfg.pseudoAB) && !(/\b(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)\b/i.test(key) || (rule.style.backgroundImage && /(\/|http|url)/i.test(rule.style.backgroundImage)) || (rule.style.src && /(\/|http|url)/i.test(rule.style.src))))
			if (/\:(after|before|hover|selection)\b/i.test(key)) {
				if (rule.style.color && rule.style.color.indexOf('calc\(') < 0) {
					let ret = setRuleColor(rule,'color',rule.style.color,g_change_vars);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_skip_css_colors) {
						skip_this.push(key.replace(/.*\.(\w+)[^\s]+$/g,`$1`));
						skip_this.push(key.replace(/.*\#(\w+)[^\s]+$/g,`$1`));
						}
						if (g_change_vars && ret[2]) {
							rule.style.setProperty('color',rule.style.color,'important');
							rule.style.setProperty(ret[0],ret[1],'important');
						} else {
							rule.style.setProperty('color',ret[1],'important');
						}
					}
				}
				if (rule.style.backgroundColor && rule.style.backgroundColor.indexOf('calc\(') < 0) {
					let ret = setRuleColor(rule,'background-color',rule.style.backgroundColor,g_change_vars);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_change_vars && ret[2]) {
							rule.style.setProperty('background-color',rule.style.backgroundColor,'important');
							rule.style.setProperty(ret[0],ret[1],'important');
						} else {
							rule.style.setProperty('background-color',ret[1],'important');
						}
					}
				}
				if (rule.style.borderColor && !/^(none|0px)$/i.test(rule.style.borderWidth) && rule.style.borderColor.indexOf('calc\(') < 0) {
					let ret = setRuleColor(rule,'border-color',rule.style.borderColor,g_change_vars);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_change_vars && ret[2]) {
							rule.style.setProperty('border-color',rule.style.borderColor,'important');
							rule.style.setProperty(ret[0],ret[1],'important');
						} else {
							rule.style.setProperty('border-color',ret[1],'important');
						}
					}
				}
			} else if ((g_skip_css == false || g_skip_css == 1998) && !/\:(after|before|hover|selection)\b/i.test(key)) {
			if (rule.style.color && rule.style.color.indexOf('calc\(') < 0) {
			let ret = setRuleColor(rule,'color',rule.style.color,g_change_vars);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_skip_css_colors > 10) {
				skip_this.push(key.replace(/.*\.(\w+)$/g,`$1`));
				skip_this.push(key.replace(/.*\#(\w+)$/g,`$1`));
				}
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1]);
				}
				rule.style.setProperty('color',ret[1],'important');
			}
			}
			if (rule.style.backgroundColor && rule.style.backgroundColor.indexOf('calc\(') < 0) {
			let ret = setRuleColor(rule,'background-color',rule.style.backgroundColor,g_change_vars);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1]);
				rule.style.setProperty('background-color',ret[1],bimp);
				} else {
				rule.style.setProperty('background-color',ret[1],'important');
				}
			}
			}
			if (rule.style.borderColor && !/^(none|0px)$/i.test(rule.style.borderWidth) && rule.style.borderColor.indexOf('calc\(') < 0) {
			let ret = setRuleColor(rule,'border-color',rule.style.borderColor,g_change_vars);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1]);
				rule.style.setProperty('border-color',ret[1],bimp);
				} else {
				rule.style.setProperty('border-color',ret[1],'important');
				}
			}
			}
		}
		}
		if (/(\bbody|\bhtml|\[s__)/i.test(key) && b_bdone != true && cfg.threshold > 0 && cfg.size > 0 && rule.style.fontSize) {
			if (key.indexOf('[s__') > -1) continue;
			var rt, rt1;
			rt1 = rule.style.fontSize;
			if (/var\(/i.test(rt1))
				rt = getVarValue(rt1);
			else
				rt = rt1;
			if (/[\d\.]+.*?px/i.test(rt)) {
			let nfz = parseInt(rt);
			if (nfz <= cfg.threshold && nfz > 1) {
			txtrul = key+' { font-size: '+f2_sizes[nfz]+' !important; }';
			n_rulecount++;
			b_bdone = true;
			if (!cfg.ssrules) m_done[key] = 3;
			}
			}
		}
		if (m_done[key] < 3 && cfg.threshold > 0 && cfg.size > 0 && rule.style.fontSize) {
			m_done[key]++;
			var rt, rt1;
			rt1 = rule.style.fontSize;
			if (/var\(/i.test(rt1))
				rt = getVarValue(rt1);
			else
				rt = rt1;
			if (/[\d\.]+.*?px/i.test(rt)) {
			let nfz = parseInt(rt);
			if (nfz <= cfg.threshold && nfz > 1) {
			txtrul = key+' { '+f_sizes[nfz]+' }';
			n_rulecount++;
			}
			} else if (/[\d\.]+.*?rem/i.test(rt)) {
			let nfz = parseInt(parseFloat(rt)*body_nfz);
			if (nfz <= cfg.threshold && nfz > 1) {
			txtrul = key+' { '+f_sizes[nfz]+' }';
			n_rulecount++;
			}
			} else if (/[\d\.]+.*?pt/i.test(rt)) {
			let nfz = parseInt(parseFloat(rt)*1.333334);
			if (nfz <= cfg.threshold && nfz > 1) {
			txtrul = key+' { '+f_sizes[nfz]+' }';
			n_rulecount++;
			}
			}
		}
		if (!txtrul && m_done[key] < 3 && cfg.threshold > 0 && cfg.size > 0 && rule.style.fontSize) {
				m_done[key]++;
				var rt,rt1;
				rt1 = rule.style.fontsize;
				if (/var\(/i.test(rt1))
					rt = getVarValue(rt1);
				else
					rt = rt1;
				if (/\d+.*?px/i.test(rt)) {
				let fsz = parseInt(rt);
				if (fsz > 1 && fsz <= cfg.threshold) {
					txtrul = key + ' { ' + f_sizes[fsz] + ' }';
					}
				}
		}
		if (cfg.forcePlhdr && cfg.forceIInv) {
		if (rule.style.content && !/invert\(1/i.test(rule.style.filter) && /url\(/i.test(rule.style.content))
			rule.style.setProperty('filter','invert(1)','important');
		}
		}
		if (!b_sec && txtrul) {
			style_node.sheet.insertRule(txtrul, 0);
			b_sec = false;
		}

		}
		} catch (error) {
			console.log('cssrules security   !');
			console.log(error);
			b_sec = true;
		}
	}
	if (n_rulecount < 3) n_rulecount = 0;
	} catch (e) { }
	} else {
		g_skip_css_colors = false;
	}

	if (!cfg.fontFamilyName || !cfg.fontFamily) {
		let rul = 'var(--g_btvfont)';
		if (style_node.sheet != undefined) {
		let rl = style_node.sheet.cssRules;
		let x = 0;
		for (x = 0; x < rl.length; x++ )
			if (rl[x].cssText.indexOf(rul) > -1) break;
		if (x < rl.length)
			style_node.sheet.deleteRule(x);
		}
	} else {
		let fntFmly = `*{font-family:var(--g_btvfont)!important;}`;
		if (cfg.fontFamily) {
			document.documentElement.style.setProperty('--g_btvfont',cfg.fontFamilyName);
			g_fntRule = true;
		} else {
			fntFmly = '';
			document.documentElement.style.setProperty('--g_btvfont','');
			g_fntRule = false;
		}
		style_node.sheet.insertRule(fntFmly, 0);
	}

		if (cfg.forcePlhdr && cfg.normalInc) {
		let ms = null;
		let cmap = [];
		b_noemo = false;
		if (doc.body != null && doc.body.innerText != null)
			ms = doc.body.innerText.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/mgu);
		if (ms) {
			var totemo = '';
			for (let str of ms) { totemo += str; if(!cmap.includes(str)) cmap.push(str); }
			if (totemo.replaceAll(/[®©✓✔✕✖✗✘]+/mgu, '').length < 3) b_noemo = true;
		} else {
			b_noemo = true;
		}
		}

		var zoom_mode = false, orig_val = [], t_zoom = 0, t_zc = 0, l_z = [], orig_cursor = '';

			window.addEventListener("mousemove", mousemove);
			window.addEventListener("mouseover", mousemove);
			window.addEventListener("mouseenter", mousemove);
			window.addEventListener("mouseleave", mouseout);
			window.addEventListener("mouseout", mouseout);
			window.addEventListener("keyup", keyup);
			window.addEventListener("keydown", keydown);

			function keyup(e) {
				if (e.keyCode == g_zoom_keycode && e.getModifierState("NumLock")) {
					zoom_mode = false;
					t_zc = Date.now();
					document.documentElement.style.cursor = orig_cursor;
					if (g_continue_speech != true)
						speakText("",1);
				} else if (e.keyCode == 27 && e.getModifierState("NumLock")) {
					speechToggle();
				}
			}

			function keydown(e) {
				if (e.keyCode == g_zoom_keycode && e.getModifierState("NumLock")) {
					zoom_mode = true;
					t_zc = Date.now();
					if (!/zoom\-(in|out)/.test(document.documentElement.style.cursor)) {
						orig_cursor = document.documentElement.style.cursor;
						if (parseFloat(document.documentElement.style.getPropertyValue('--g_zoom')) > 1.0)
							document.documentElement.style.cursor = 'zoom-in';
						else
							document.documentElement.style.cursor = 'zoom-out';
					}
				}
			}

			function mousemove(e) {
				if (e.buttons == 0) {
				if (!zoom_mode) return;
				if (zoom_mode && Date.now() - t_zc > 10000) {
					zoom_mode = false;
					document.documentElement.style.cursor = orig_cursor;
					return;
				}
				let targ = getTarget(e);
				if (l_z.includes(targ)) return;
				let val = [];
				if (Date.now()-t_zoom > 260) {
				t_zoom = Date.now();
				let b_skip = false;
				val[0] = targ.className;
				val[2] = targ.style.textShadow;
				val[3] = targ.style.position;
				val[4] = targ.style.zIndex;
				val[1] = targ.style.transformOrigin;
				val[10] = targ.style.padding;
				val[12] = targ.style.border;
				val[5] = ''; val[6] = ''; val[7] = '';
				if (targ.parentNode && targ.parentNode.style) {
					val[5] = targ.parentNode.style.zIndex;
					if (targ.parentNode.getBoundingClientRect().width == targ.getBoundingClientRect().width) {
						targ.parentNode.style.zIndex = '9999999';
						if (targ.parentNode.parentNode && targ.parentNode.parentNode.style) {
							val[6] = targ.parentNode.parentNode.style.zIndex;
							if (targ.parentNode.parentNode.getBoundingClientRect().width == targ.getBoundingClientRect().width) { 
								targ.parentNode.parentNode.style.zIndex = '9999999';
								if (targ.parentNode.parentNode.parentNode && targ.parentNode.parentNode.parentNode.style) {
									val[7] = targ.parentNode.parentNode.parentNode.style.zIndex;
									if (targ.parentNode.parentNode.parentNode.getBoundingClientRect().width == targ.getBoundingClientRect().width) {
										targ.parentNode.parentNode.parentNode.style.zIndex = '9999999';
									}
								}
							}
						}
					}
				}
				let tnode = getTopNode(targ);
				let tnodes = Array.from(tnode.getElementsByTagName('*'));
				let idx = tnodes.findIndex(o => /btvenlarge/.test(o.className));
				if (idx > -1) b_skip = true;
				if (!b_skip) {
				orig_val.push(val);
				let nzo = parseFloat(document.documentElement.style.getPropertyValue('--g_zoom'));
				let gcs = getComputedStyle(targ);
				targ.style.zIndex = '99999';
				targ.style.position = 'relative';
				if (!/^(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)$/i.test(targ.nodeName) && !((gcs.backgroundImage && /(\/|http|url)/i.test(gcs.backgroundImage)) || (gcs.src && /(\/|http|url)/i.test(gcs.src)) || (gcs.content && /(\/|http|url)/i.test(gcs.content))))
					targ.style.padding = g_zoom_padding;
				targ.style.transformOrigin = e.offsetX+'px '+e.offsetY+'px';
				let co = getRGBarr(gcs.color) || [127,127,127,1.0];
				co[3] = 0.5;
				targ.style.border = '2px dotted rgba('+co+')';
				co[3] = 1;
				let brt = calcBrightness(co);
				if (brt < 129)
					co = [255,255,255,0.9];
				else
					co = [0,0,0,0.9];
				targ.style.textShadow = '0 0 2px rgba('+co+'), 0 0 4px rgba('+co+'), 0 0 6px rgba('+co+'), 0 0 8px rgba('+co+'), 0 0 10px rgba('+co+'), 0 0 14px rgba('+co+')';
				if (targ.className && targ.className != undefined)
					targ.setAttribute('class', targ.className+ ' btvenlarge ');
				else
					targ.setAttribute('class', ' btvenlarge ');
				l_z.push(targ);
				if (!/(0|false)/i.test(g_speech_language)) {
				let stxt = targ.textContent;
				speakText("",1);
				let speak_arr = stxt.split(u_fullstop);
				for (let spe of speak_arr) {
					g_sp_timeout = setTimeout(speechResume,10000);
					setTimeout(speakText(spe), 10);
				}
				}
				}
				}
				}
			}

			function mouseout(e) {
				if (e.buttons == 0)
				if (Date.now() - t_zoom > 260) {
				let val = [];
				if (orig_val && l_z) {
					for (let x = 0; x < l_z.length; x++) {
						let targ = l_z.pop();
						let val = orig_val.pop();
						targ.setAttribute('class', val[0]);
						targ.style.textShadow = val[2];
						targ.style.position = val[3];
						targ.style.padding = val[10];
						targ.style.border = val[12];
						targ.style.transformOrigin = val[1];
						targ.style.zIndex = val[4];
						if (targ.parentNode && targ.parentNode.style) {
							targ.parentNode.style.zIndex = val[5];
							if (targ.parentNode.parentNode && targ.parentNode.parentNode.style) {
								targ.parentNode.parentNode.style.zIndex = val[6];
								if (targ.parentNode.parentNode.parentNode && targ.parentNode.parentNode.parentNode.style) {
									targ.parentNode.parentNode.parentNode.style.zIndex = val[7];
								}
							}
						}
					}
				}
				if (zoom_mode && Date.now() - t_zc > 10000) zoom_mode = false;
				document.documentElement.style.cursor = orig_cursor;
				}
			}

			function getTarget(e){
				if (e.target) return e.target;
				else if (e.srcElement) return e.srcElement;
			}

	const process = async (nodes, mutation = false) =>
	{
		b_ctext = {};
		b_chimg = {};
		b_iimg = {};
		b_dim = {};
		b_emo = {};
		b_idone = {};
		images = [];
		img_area = {};
		n_imgcount = 0;

		var nn_style, nn_reg;
		var n_inv = 0;
		var bdy_attr = '', bdy_val = '';

		if (!cfg.forcePlhdr && cfg.advDimming){
			nn_style = ';filter:revert!important;';
			nn_reg = /revert/g;
		} else if (cfg.forcePlhdr && cfg.forceIInv) {
			nn_style = ';filter:invert(1)!important;';
			nn_reg = /invert\(1/g;
		} else {
			nn_style = '';
			nn_reg = /\<\&\%/;
		}

		let node_count = 0;
		if (cfg.forceIInv && cfg.forcePlhdr) {
		let gcs = getComputedStyle(document.body);
		b_iimg[-1] = await isImage(document.body, -1, img_area, gcs, b_imgforce);
		}
		if (mutation) node_count = parseInt(1000*Date.now());

		function getGradient(style) {
			let gs = style.backgroundImage;
			let cos = style.backgroundImage.split(/rgba?\(/g);
			for (let co of cos) {
				if (co.trim().length < 3) continue;
				let bp = co.indexOf('\)');
				let c = co.substring(0,bp).match(/[\d\.]+/ig);
				if (!c || c.length < 3 || (/(at|deg|px)/i.test(co) && c.length < 3)) continue;
				let rgb_a = false;
				if (c.length == 4) rgb_a = true;
				if (c[3] == undefined || c[3] == 0) { c[3] = 1; rgb_a = false; }
				let c2 = [ 255-c[0],255-c[1],255-c[2],c[3] ];
				let rgbs = "rgb";
				if (rgb_a) rgbs = "rgba";
				let cstr = rgbs+"("+c[0]+", "+c[1]+", "+c[2];
				let rstr1 = "("+c2[0]+", "+c2[1]+", "+c2[2];
				if (rgb_a) {
					cstr = cstr + ", "+c[3]+")";
					rstr1 = rstr1 + ", "+c2[3]+")";
				} else {
					cstr = cstr + ")";
					rstr1 = rstr1 + ")";
				}
				let rstr = rstr1;
				if (rgbs == "rgb")
					rstr = "bgr"+rstr1;
				else
					rstr = "abgr"+rstr1;
				gs = gs.replace(cstr,rstr);
			}
			let gs1 = gs.replaceAll('abgr','rgba');
			let gs2 = gs1.replaceAll('bgr','rgb');
			return gs2;
		}

		function isCustomElement(el) {
			const isAttr = el.getAttribute('is');
			let ret = el.localName.includes('-') || isAttr && isAttr.includes('-');
			ret = ret || el.shadowRoot;
			return ret;
		}

		function querySelectorAllShadows(selector, el = document.body) {
			const childShadows = Array.from(el.querySelectorAll('*')).
				map(el => el.shadowRoot).filter(Boolean);
			const childResults = childShadows.map(child => querySelectorAllShadows(selector, child));
			const result = Array.from(el.querySelectorAll(selector));
			return result.concat(childResults).flat();
		}

		function attachStyle(c) {
			if (c.nodeType == 11 && !c.getElementById('_btv_')) {
				let sn = document.createElement('style');
				let tn = document.createTextNode('');
				tn.nodeValue = css_node.nodeValue;
				sn.appendChild(tn);
				sn.setAttribute('id', '_btv_');
				c.appendChild(sn);
			}
		}

		function processShadow(c, nodes) {
			let chn = querySelectorAllShadows('*',c);
			for (let c2 of chn) {
				if ((!c2.host || c2.host == undefined) && isCustomElement(c2)) {
					if (c2.attachShadow && c2.shadowRoot) {
						c = c2.shadowRoot;
						if (c && c != undefined) {
							nodes.push(c2);
							nodes_to_observe.push(c);
							attachStyle(c);
							processShadow(c, nodes);
						}
					}
				} else if (c2 && c2 != undefined) {
					if (c2.attachShadow && c2.shadowRoot) {
						c = c2.shadowRoot;
						if (c && c != undefined) {
							nodes.push(c2);
							nodes_to_observe.push(c);
							attachStyle(c);
							processShadow(c, nodes);
						}
					} else {
						nodes.push(c2);
					}
				}
			}
		}

		if (Object.entries(map).length < 1 || mutation) {
			let nc = node_count;
			var n;
			for (n of nodes) {
			nc++;
			map.set(n, nc);
			let t = n.nodeName.toUpperCase();
			let chln = n.getElementsByTagName('*');
			b_chk[nc] = chln.length;
			if (n.shadowRoot && n.shadowRoot != undefined)
			if ((!n.host || n.host == undefined) && isCustomElement(n)) {
				if (n.attachShadow) {
				let c = n.shadowRoot;
				if (c != null && c != undefined) {
				nodes_to_observe.push(c);
				attachStyle(c);
				processShadow(c, nodes);
				}
				}
			}
			//if (n.getAttribute('_btvdone_')) nodes_to_skip.push(n);
			if (tags_to_skip.includes(t) || (cfg.skipHeadings && hdr_tags.includes(t))) {
				nodes_to_skip.push(n);
				nodes_to_skip.push(...Array.from(chln));
			}
			let tn = n.textContent || n.nodeValue || n.value;
			if (tn && tn != undefined && tn.trim)
				b_ctext[nc] = tn.trim().length;
			else
				b_ctext[nc] = 0;

			let gcs = getComputedStyle(n);
			if (/^(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)$/.test(t) || (gcs.backgroundImage && /(\/|http|url)/i.test(gcs.backgroundImage)) || (gcs.src && /(\/|http|url)/i.test(gcs.src)))
				b_iimg[nc] = await isImage(n, nc, img_area, gcs, b_imgforce);
			else
				b_iimg[nc] = false;
			if (cfg.pseudoAB) {
			if (cfg.forcePlhdr && cfg.forceIInv) {
			let gcsa = getComputedStyle(n,':before');
			if ((gcsa.backgroundImage && !/\b(gradient|none)/i.test(gcsa.backgroundImage) && /(\/|http|url)/i.test(gcsa.backgroundImage)) || (gcsa.content && /(\/|http|url)/i.test(gcsa.content))) {
				var im;
				if (gcsa.backgroundImage && /(\/|http|url)/i.test(gcsa.backgroundImage))
					im = gcsa.backgroundImage;
				else
					im = gcsa.content;
				let arr = await getBgImage(n, gcsa, im);
				if (arr[0] && arr[1])
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvinvertb_ ');
					else
						n.setAttribute('class', ' _btvinvertb_ ');
			}
			gcsa = getComputedStyle(n,':after');
			if ((gcsa.backgroundImage && !/\b(gradient|none)/i.test(gcsa.backgroundImage) && /(\/|http|url)/i.test(gcsa.backgroundImage)) || (gcsa.content && /(\/|http|url)/i.test(gcsa.content))) {
				var im;
				if (gcsa.backgroundImage && /(\/|http|url)/i.test(gcsa.backgroundImage))
					im = gcsa.backgroundImage;
				else
					im = gcsa.content;
				let arr = await getBgImage(n, gcsa, im);
				if (arr[0] && arr[1])
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvinverta_ ');
					else
						n.setAttribute('class', ' _btvinverta_ ');
			}
			}
			let gcsa = getComputedStyle(n,':before');
			if (gcsa.content && gcsa.content != undefined && gcsa.content != 'none' && gcsa.fontSize && gcsa.fontSize.indexOf('px') > -1)
				if (cfg.threshold > parseInt(gcsa.fontSize))
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvfontb_ ');
					else
						n.setAttribute('class', ' _btvfontb_ ');
			gcsa = getComputedStyle(n,':after');
			if (gcsa.content && gcsa.content != undefined && gcsa.content != 'none' && gcsa.fontSize && gcsa.fontSize.indexOf('px') > -1)
				if (cfg.threshold > parseInt(gcsa.fontSize))
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvfonta_ ');
					else
						n.setAttribute('class', ' _btvfonta_ ');
			if (cfg.advDimming || (cfg.forcePlhdr && parentStyle(n, /invert\(1/g, nodes_behind_inv)))
				document.documentElement.style.setProperty('--g_beforeafter_color','#fff');
			else
				document.documentElement.style.setProperty('--g_beforeafter_color','#000');

			}
			if (b_iimg[nc]) {
				images.push(n);
				let img_children = Array.from(chln);
				if (img_area[nc] >= 0 && img_area[nc] < 900000000)
					n_imgcount++;
				if (n.parentNode && b_iimg[map.get(n.parentNode)]) {
					if (map.get(n.parentNode) == undefined)
						map.set(n.parentNode, map.get(nodes[0])+nodes.indexOf(n.parentNode));
					b_chimg[map.get(n.parentNode)] = true;
				}
			}
			if (mutation)
			if (cfg.forcePlhdr && cfg.normalInc) {
				let ps = parentStyle(n,/invert\(1/g,nodes_behind_inv);
				if (ps) nodes_behind_inv.push(...Array.from(chln));
			}
			}
		}

		let save_nc = node_count;
		let node = doc.body;
		let footr = null;
		if (cfg.forcePlhdr && b_html != true) {
		if (g_foot_re) {
		var pn,n,ftr_done = false,bcol = '';
		let dh = document.body.getBoundingClientRect().bottom;
		let t = document.body.getElementsByTagName('footer');
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			for (n of t) {
				let c = topNode(n);
				if (c < tc) {
					tc = c;
					tn = n;
				}
			}
			if (tn.nodeName != 'BODY') {
				bcol = tn.style.backgroundColor;
				tn.style.setProperty('filter','invert(1)', 'important');
				footr = tn;
				ftr_done = true;
			}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if (/footer/i.test(n.id) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			for (n of t) {
				let c = topNode(n);
				if (c < tc) {
					tc = c;
					tn = n;
				}
			}
			if (tn.nodeName != 'BODY') {
				bcol = tn.style.backgroundColor;
				tn.style.setProperty('filter','invert(1)', 'important');
				footr = tn;
				ftr_done = true;
			}
		}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if (/footer/i.test(n.className) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			for (n of t) {
				let c = topNode(n);
				if (c < tc) {
					tc = c;
					tn = n;
				}
			}
			if (tn.nodeName != 'BODY') {
				bcol = tn.style.backgroundColor;
				tn.style.setProperty('filter','invert(1)', 'important');
				footr = tn;
				ftr_done = true;
			}
		}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if (/foot/i.test(n.id) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			for (n of t) {
				let c = topNode(n);
				if (c < tc) {
					tc = c;
					tn = n;
				}
			}
			if (tn.nodeName != 'BODY') {
				bcol = tn.style.backgroundColor;
				tn.style.setProperty('filter','invert(1)', 'important');
				footr = tn;
				ftr_done = true;
			}
		}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if (/foot/i.test(n.className) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			for (n of t) {
				let c = topNode(n);
				if (c < tc) {
					tc = c;
					tn = n;
				}
			}
			if (tn.nodeName != 'BODY') {
				bcol = tn.style.backgroundColor;
				tn.style.setProperty('filter','invert(1)', 'important');
				footr = tn;
				ftr_done = true;
			}
		}
		}
		if (footr) {
			let bc = getComputedStyle(footr).backgroundColor;
			if (bcol && bc == bcol) {
				bcol = getRGBarr(bcol);
				bcol[0] = 255-bcol[0];
				bcol[1] = 255-bcol[1];
				bcol[2] = 255-bcol[2];
				if (bcol[3] == undefined) bcol[3] = 1;
				footr.style.setProperty('background-color','rgba('+bcol+')','important');
			} else if (bc == 'rgba(0, 0, 0, 0)') {
				if (finalLightness > 0.5 && !cfg.advDimming)
					footr.style.setProperty('background-color','white','important');
				//let chn = footr.getElementsByTagName('*');
				//for (let n of chn) 
				//	if (n.nodeName != 'A')
				//	n.style.setProperty('color','black','important');
			}
			footr.style.setProperty('height', 'auto','important');
		}
		}
		if (node == undefined || node == null)
			node = document.body; //document.getElementsByTagName('BODY')[0];

		if (!(node == undefined || node == null)) {
		let pnode = document.documentElement; //doc.getElementsByTagName('HTML')[0];
		if (!(pnode == undefined || pnode == null)) {

		node_count = map.get(node);
		let tag = node.nodeName.toUpperCase();

			var htm;
			htm = pnode;
			if (htm.style.getPropertyValue('filter').indexOf('invert\(1') < 0)
				htm.style.setProperty('filter','invert(1)','important');
			if (cfg.forceIInv) {
			var hdrs;
			if (!b_html)
				hdrs = Array.from(document.body.getElementsByTagName('HEADER'));
			else
				hdrs = Array.from(htm.getElementsByTagName('HEADER'));
			var hdr;
			let b_hdr = hdrs.length > 0 && parseInt(hdrs[0].getBoundingClientRect().top) < parseInt(window.innerHeight)/2;
			let n_hdrs = hdrs.length;
			if (b_hdr && n_hdrs < 5) {
				hdr = hdrs[0];
				if (hdr == undefined || hdr == null) hdr = hdrs[1];
			} else if (!b_hdr) {
				if (!b_html)
					hdrs = Array.from(document.body.getElementsByTagName('*'));
				else
					hdrs = Array.from(htm.getElementsByTagName('*'));
				b_hdr = false;
				for (hdr of hdrs) {
				if (hdr && hdr != undefined && (/header/i.test(hdr.id) || /header/i.test(hdr.className))) {
					b_hdr = true; break;
				}
				}
			}
			if (!b_hdr) hdr = null;
			var n_c;
			for (let img of images) {
//				if (/INPUT/i.test(img.nodeName) && (img.type == null || !/image/i.test(img.type))) continue;
			if (g_svg_bg_white)
				if (/SVG/i.test(img.nodeName) && /dontinvert/i.test(g_svg_bg_white)) continue;
			let sects = Array.from(img.getElementsByTagName('SECTION'));
			let arts =  Array.from(img.getElementsByTagName('ARTICLE'));
			if (sects.length > 2 || arts.length > 2 || img == footr) continue;
			let p_s = parentStyle(img,/invert\(1/g,nodes_behind_inv);
			if (p_s) {
				img.style.setProperty('filter','unset', 'important');
				continue;
			}
			n_c = map.get(img);
			let cst = getComputedStyle(img);
			if (cst.filter != 'unset' && /^(INPUT|SELECT|TEXT|TEXTAREA)$/i.test(img.nodeName) && g_okinput.test(img.type)) {
				img.style.setProperty('filter','unset', 'important');
				continue;
			}
			let bgim = cst.backgroundImage;
			if (!bgim || bgim == 'none')
				bgim = '';
			let imsrc = img.src ? img.src : '';
			if (!imsrc || imsrc == 'none')
				imsrc = '';
			if (!/^(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)$/i.test(img.nodeName) && !bgim && !imsrc) { b_iimg[n_c] = false; continue; }
			if (!b_imgforce[n_c] || b_ctext[n_c] > 95)
			if (!/^(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)$/i.test(img.nodeName))
			if (!/(background.*page|banner|page.*background|slide)/ig.test(img.className) && ((imsrc != undefined && imsrc && imsrc != 'none' && !/(\/|http|url)/ig.test(imsrc)) || (bgim != undefined && bgim != '' && bgim != 'none' && !/(\/|http|url)/ig.test(bgim)) || (b_ctext[n_c] > 95 && !b_imgforce[n_c])) || (((img_area[n_c] > 0 && img_area[n_c] < g_min_image_size && img.textContent.indexOf(' ') > -1 && !/button/i.test(img.className)) || /nav/i.test(img.className)) && !b_imgforce[n_c] && img_area[n_c] < g_min_image_size && img_area[n_c] > 0)) {
				if (!(hdr && hdr.contains(img))) {
				img.style.setProperty('filter','unset', 'important');
				continue;
				}
			} else if (b_ctext[n_c] > 95 && (img_area[n_c] <= 50000 || !b_imgforce[n_c])) {
				img.style.setProperty('filter','unset', 'important');
				continue;
			}
			let isty = img.style.getPropertyValue('filter');
			var pisty = '';
			if (img.parentNode && img.parentNode.style) pisty = img.parentNode.style.getPropertyValue('filter');
			if (pisty == undefined || pisty == null) pisty = '';
			if (isty == undefined || isty == null) isty = '';
			let bnav = false;
			let pch = img;
			if (cfg.skipNavSection && hdr != null && hdr.contains(img)) {
				bnav = true;
			} else if (cfg.skipNavSection) {
			while (pch != null && pch != undefined && pch.nodeName != 'BODY') {
				if (pch && /(HEADER|NAV)/i.test(pch.nodeName)) {
					if (pch.nodeName == 'NAV' || (pch.nodeName == 'HEADER' && n_hdrs < 5)) {
					bnav = true;
					break;
					}
				}
				pch = pch.parentNode;
			}
			}
			if (bnav) {
				img.style.setProperty('filter','unset','important');
				continue;
			}
			if (g_svg_bg_white)
			if (/(\.png|png$|png|\.svg|svg$|svg)/ig.test(bgim) || /(\.png|png$|png|\.svg|svg$|svg)/ig.test(imsrc) || /SVG/i.test(img.nodeName)) {
				if (/dontinvert/i.test(g_svg_bg_white)) continue;
				img.style.setProperty('background-color','#fff','important');
			}
			if (!nn_reg.test(isty) && !nn_reg.test(pisty) && !p_s && (!containsImage(img, images) || b_imgforce[n_c] || ((!b_chimg[n_c] && hdr != null && hdr.contains(img)) || /image/i.test(img.type) || bgim || imsrc || b_chimg[n_c])))
				if (!(/^(UL|OL)/i.test(img.nodeName) && img.childNodes.length < 4)) {
					img.style.setProperty('filter','invert(1)','important');
					let chldn = Array.from(img.getElementsByTagName('*'));
					nodes_behind_inv.push(...chldn);
					n_inv++;
				}
			}
			hdrs.length = 0;
			}
			b_html = true;
			if (g_anegative == true)
				css_node.nodeValue += style_rule;
		}
		let gcs = getComputedStyle(node);
		if (cfg.forceOpacity && !b_opa && !cfg.start3 && cfg.skipLinks) {
			b_opa = true;
			bdy_attr = 'background';
			bdy_val = '#fff';
			if (g_anegative == false) await getBgImage(node, gcs, gcs.backgroundImage);
		} else if (!b_opa) {
			b_opa = true;
			if (g_anegative == false) await getBgImage(node, gcs, gcs.backgroundImage);
			if (/gradient/i.test(gcs.backgroundImage)) {
				bdy_attr = 'background';
				bdy_val = getGradient(gcs);
			} else if (img_area[-1] != undefined && img_area[-1] > g_min_image_size*100 && gcs.backgroundImage && gcs.backgroundImage != undefined && gcs.backgroundImage != 'none') {
			bdy_attr = 'background-blend-mode';
			bdy_val = 'difference';
			let fsty = gcs.getPropertyValue('background-color');
			if (fsty && fsty != 'none') {
			if (fsty.indexOf('var(') > -1) fsty = getVarValue(fsty);
 			let bcol = getRGBarr(fsty);
			let brt = calcColorfulness(bcol);
			if (brt > g_min_colorfulness) {
			bdy_attr = 'backdrop-filter';
			bdy_val = 'invert(1)';
			} else {
			node.style.setProperty('background-color','#fff');
			}
			} else {
			node.style.setProperty('background-color','#fff');
			}
			} else {
			let fsty = gcs.getPropertyValue('background-color');
			if (fsty == null || fsty == '' || fsty == 'rgba(0, 0, 0, 0)' || fsty == 'none') {
			} else {
			let bcol = getRGBarr(fsty);
			let brt = calcColorfulness(bcol);
			var fgr = [];
			if (brt < g_min_colorfulness) {
			fgr = applyColorMatrix([255-bcol[0], 255-bcol[1], 255-bcol[2]]);
			bcol = fgr;
			} else {
			bcol[0] = 255 - bcol[0];
			bcol[1] = 255 - bcol[1];
			bcol[2] = 255 - bcol[2];
			}
			if (bcol[3] == undefined || bcol[3] == 0) bcol[3] = 1;
			fsty = 'rgba('+bcol+')';
			bdy_attr = 'background-color';
			bdy_val = fsty;
			}
			}
		}
		}
		}
		b_idone = {};

		if (cfg.advDimming)
			if (!cfg.ssrules && n_imgcount > 2) {
			for (let img of images) {
				let pn = img;
				let lastn = pn;
				while (pn && !/\b(BODY|HTML)/i.test(pn.nodeName)) {
					lastn = pn;
					if (pn instanceof Element) {
					let nsty = lastn.getAttribute('style');
					if (!b_iimg[map.get(lastn)] && nsty != null && !nn_reg.test(nsty) && ((nsty+nn_style).length > 0))
						//lastn.setAttribute('style',nsty+nn_style);
						lastn.style.setProperty('filter','revert','important');
					else if (!b_iimg[map.get(lastn)] && nsty == null && nn_style)
						lastn.style.setProperty('filter','revert','important');
						//lastn.setAttribute('style',nn_style);
					let cn = map.get(lastn);
					b_dim[cn] = true;
					}
					pn = lastn.parentNode;
				}
				node = lastn;
				node_count = map.get(node);
				if (b_dim[node_count]) continue;
				b_dim[node_count] = true;
			}
		}
		b_dim = {};
		node_count = save_nc;
		node = nodes[node_count];

		let setAttribs = node => {

			let tag = String(node.nodeName.toUpperCase());
			let pnode = node.parentNode;
			let sk = false;
			let is_einput = /\b(INPUT|SELECT|TEXT|TEXTAREA)\b/.test(tag);
			var style, is_oinput, is_xinput;

			//if (tags_to_skip.includes(tag) || nodes_to_skip.includes(node) || (cfg.skipHeadings && hdr_tags.includes(tag))) return;
			if (nodes_to_skip.includes(node)) return;

			if (/I?FRAME\b/i.test(tag)) {
				let fsty = node.style.getPropertyValue('filter');
				if (fsty == null) fsty = '';
				if (!/invert\(1/g.test(fsty) && cfg.forcePlhdr)
					node.style.setProperty('filter','invert(1)','important');
			}

			node_count = map.get(node);

			if (is_einput) {
				is_xinput = node.type && g_nokinput.test(node.type);
				is_oinput = node.type && g_okinput.test(node.type);
			}

			if (is_einput && is_oinput)
			if (cfg.input_border && !node.getAttribute('b__'))
				if (!(!cfg.start3 && cfg.skipLinks))
					node.setAttribute('b__', '');

			if (n_rulecount > 0) {
			style = getComputedStyle(node);
			if (style.fontSize)
				if (f2_sizes.includes(style.fontSize))
					sk = true;
				else
					sk = false;
			} else {
			style = getComputedStyle(node);
			}

			let col_arr = getRGBarr(style.color);

			if (col_arr && cfg.forceOpacity)
			if (col_arr[3] > 0 && col_arr[3] < 1) {
				col_arr[3] = 1;
				let c = 'rgba('+col_arr+')';
				node.style.setProperty('color',c,'important');
			}

			let g_n_inv = false;
			let skip_colors = false;
			let ftr = false;
			let nimp = false;
			if (cfg.normalInc && cfg.forcePlhdr) {
			g_n_inv = nodes_behind_inv.includes(node);
			ftr = g_foot_re && footr && footr.contains(node);
			if (g_foot_re)
				g_n_inv = g_n_inv || ftr;
			if (g_skip_css_colors)
			if (node.id && skip_this.includes(node.id)) {
				nimp = true;
				if (g_skip_css_colors > 99) skip_colors = true;
			} else {
				let cns = node.className.toString().split(' ');
				let idx = skip_this.findIndex(o => o == cns[0]) || skip_this.findIndex(o => o == cns[1]) || skip_this.findIndex(o => o == cns[2]) || skip_this.findIndex(o => o == cns[3]) || skip_this.findIndex(o => o == cns[4]);
				if (idx > -1) {
				nimp = true;
				if (g_skip_css_colors > 99) skip_colors = true;
				}
			}

			if (skip_colors_nodes.includes(node)) {
				skip_colors = true;
				if (skip_colors_top_nodes.includes(node)) {
					node.style.setProperty('filter','invert(1)','important');
					if (cfg.forceIInv) 
					for (let im of images) {
						if (im && node.contains(im) && im != node)
							im.style.setProperty('filter','unset','important');
					}
				} else if (!nodes_behind_inv.includes(node)) {
					nodes_behind_inv.push(node);
				}
			} else if (!nimp && !ftr && (!b_iimg[node_count] || style.filter.indexOf('invert\(1') < 0) && !g_n_inv) {
				var cs,pcs;
				let err = false;
				try {
				cs = style;
				pcs = getComputedStyle(pnode);
				} catch (e) { err = true; }
				if (!err || (err && node.shadowRoot)) {
				var fg,fg2,bg,bg2,bog,bog2,fgk;
				if (node.shadowRoot) {
				fg = !colors_to_skip.includes(cs.color) ? cs.color : '';
				bg = cs.backgroundColor;
				bog = cs.borderTopColor || cs.borderRightColor || cs.borderBottomColor || cs.borderLeftColor;
				bog = /^(none|0px)$/i.test(cs.borderWidth) ? '' : bog;
				fgk = cs.color;
				} else {
				fg = !colors_to_skip.includes(cs.color) ? cs.color : '';
				fg2 = !colors_to_skip.includes(pcs.color) ? pcs.color : '';
				bg = cs.backgroundColor;
				bg2 = pcs.backgroundColor;
				bog = cs.borderTopColor || cs.borderRightColor || cs.borderBottomColor || cs.borderLeftColor;
				bog = /^(none|0px)$/i.test(cs.borderWidth) ? '' : bog;
				bog2 = pcs.borderTopColor || pcs.borderRightColor || pcs.borderBottomColor || pcs.borderLeftColor;
				bog2 = /^(none|0px)$/i.test(pcs.borderWidth) ? '' : bog2;
				fgk = cs.color;
				}
				var fgbrt, bgbrt, fgp = false, bgp = false, scol;
				if (cfg.doGradients) {
				if (fg == fg2 && bg == bg2 && bog == bog2 && cs.backgroundImage.indexOf('gradient') < 0 && pcs.backgroundImage.indexOf('gradient') < 0) {
				} else {
				if (fg) {
					let fgarr = getRGBarr(fg);
					let fgarr2 = fg2 ? getRGBarr(fg2) : [];
					let fg_imp  = '';
					if (!g_keep_colors) fg_imp = 'important';
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || g_keep_colors || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					bgbrt = calcBrightness(fgarr);
					if (bgbrt < g_max_fg_brightness) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						node.style.setProperty('color','rgba('+fgr+')',fg_imp);
						fgp = true;
						m_fcol.set(node, fgarr);
						}
					} else {
					let fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					fgbrt = calcBrightness(fgr);
					if (fgbrt >= 0) {
						m_fcol.set(node, fgarr);
						node.style.setProperty('color','rgba('+fgr+')',fg_imp);
						fgp = true;
						m_sty[fgarr] = fgr;
						m_sty[fgr] = fgr;
					}
					}
					}
					} else {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					m_fcol.set(node, fgarr);
					node.style.setProperty('color','rgba('+fgr+')',fg_imp);
					fgp = true;
					}
					}
				}
				if (bog) {
					let bo_arr = [];
					if (cs.borderColor == cs.borderLeftColor && cs.borderColor == cs.borderRightColor && cs.borderColor == cs.borderTopColor && cs.borderColor == cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderWidth)) {
					bo_arr.push(cs.borderColor)
					} else {
					if (cs.borderTopColor && !/^(none|0px)$/i.test(cs.borderTopWidth)) bo_arr.push(cs.borderTopColor);
					if (cs.borderLeftColor && !/^(none|0px)$/i.test(cs.borderLeftWidth)) bo_arr.push(cs.borderLeftColor);
					if (cs.borderRightColor && !/^(none|0px)$/i.test(cs.borderRightWidth)) bo_arr.push(cs.borderRightColor);
					if (cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderBottomWidth)) bo_arr.push(cs.borderBottomColor);
					}
					let b_imp  = '';
					if (!g_keep_colors) b_imp = 'important';
					for (bog of bo_arr) {
					let fgarr = getRGBarr(bog);
					let fgarr2 = bog2 ? getRGBarr(bog2) : [];
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || g_keep_colors || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					var fgr;
					let cf = calcColorfulness(fgarr);
					if (cf < g_max_border) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						m_bocol.set(node, fgarr);
						}
					} else {
						fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
						fgr[3] = fgarr[3];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
						m_bocol.set(node, fgarr);
						m_sty[fgarr] = fgr;
						m_sty[fgr] = fgr;
						}
					}
					} else {
						fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					}
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt >= 0 && (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3])) {
						m_bocol.set(node, fgarr);
						if (bog == cs.borderColor) {
							node.style.setProperty('border-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderTopColor) {
							node.style.setProperty('border-top-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderBottomColor) {
							node.style.setProperty('border-bottom-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderLeftColor) {
							node.style.setProperty('border-left-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderRightColor) {
							node.style.setProperty('border-right-color','rgba('+fgr+')',b_imp);
						}
					}
					}
					}
					}
				}
				if (bg && (!/(\(0\, 0\, 0\, 0\)|transparent)/i.test(bg) || style.backgroundImage.indexOf('gradient') > -1)) {
					let bg_attr = 'background';
					let bg_imp  = '';
					if (!g_keep_colors) bg_imp = 'important';
					if (style.backgroundImage && style.backgroundImage != undefined && !/(gradient|none)/i.test(style.backgroundImage)) bg_attr = 'background-color';
					if (style.backgroundImage.indexOf('gradient') > -1) {
					if (b_cdone[node_count] != true) {
						let gs2 = getGradient(style);
						node.style.setProperty('background',gs2,'important');
						b_cdone[node_count] = true;
						}
						let fgarr = getRGBarr(style.color);
						let fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						node.style.setProperty('color','rgba('+fgr+')','important');
						skip_colors = true;
					} else {
					let fgarr = getRGBarr(bg);
					let fgarr2 = bg2 ? getRGBarr(bg2) : [];
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					let cf = calcColorfulness(fgarr);
					bgbrt = calcBrightness(fgarr);
					if (cf < g_min_colorfulness || bgbrt > g_min_bg_brightness) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
						bgp = true;
						m_bcol.set(node, fgarr);
						}
					} else {
					let fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt > 0) {
						m_bcol.set(node, fgarr);
						node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
						bgp = true;
						m_sty[fgarr] = fgr;
					}
					}
					}
					} else {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					bgbrt = calcBrightness(fgr);
					m_bcol.set(node, fgarr);
					node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
					bgp = true;
					}
					}
					if (g_keep_colors && b_ctext[node_count] < g_bg_threshold && b_ctext[node_count] > 0) {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					fgarr = getRGBarr(fgk);
					if (calcBrightness(fgr) > g_min_bg_brightness) {
					m_bcol.set(node, fgr);
					node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
//					m_fcol.set(node, fgarr);
//					node.style.setProperty('color','rgba('+(255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2])+', '+fgarr[3]+')',bg_imp);
//					scol = (255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2]);
//					if (style.color.indexOf(scol) < 0)
//						node.style.setProperty('color','rgba('+(255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2])+', '+fgarr[3]+')','important');
					skip_colors = true;
					}
					}
					}
				}
				}
				} else {
				if (fg == fg2 && bg == bg2 && bog == bog2) {
				} else {
					if (fg) {
					let fgarr = getRGBarr(fg);
					let fgarr2 = fg2 ? getRGBarr(fg2) : [];
					let fg_imp  = '';
					if (!g_keep_colors) fg_imp = 'important';
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || g_keep_colors || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					bgbrt = calcBrightness(fgarr);
					if (bgbrt < g_max_fg_brightness) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						node.style.setProperty('color','rgba('+fgr+')',fg_imp);
						fgp = true;
						m_fcol.set(node, fgarr);
						}
					} else {
					let fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					fgbrt = calcBrightness(fgr);
					if (fgbrt >= 0) {
						m_fcol.set(node, fgarr);
						node.style.setProperty('color','rgba('+fgr+')',fg_imp);
						fgp = true;
						m_sty[fgarr] = fgr;
						m_sty[fgr] = fgr;
					}
					}
					}
					} else {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					m_fcol.set(node, fgarr);
					node.style.setProperty('color','rgba('+fgr+')',fg_imp);
					fgp = true;
					}
					}
				}
				if (bog) {
					let bo_arr = [];
					if (cs.borderColor == cs.borderLeftColor && cs.borderColor == cs.borderRightColor && cs.borderColor == cs.borderTopColor && cs.borderColor == cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderWidth)) {
					bo_arr.push(cs.borderColor)
					} else {
					if (cs.borderTopColor && !/^(none|0px)$/i.test(cs.borderTopWidth)) bo_arr.push(cs.borderTopColor);
					if (cs.borderLeftColor && !/^(none|0px)$/i.test(cs.borderLeftWidth)) bo_arr.push(cs.borderLeftColor);
					if (cs.borderRightColor && !/^(none|0px)$/i.test(cs.borderRightWidth)) bo_arr.push(cs.borderRightColor);
					if (cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderBottomWidth)) bo_arr.push(cs.borderBottomColor);
					}
					let b_imp  = '';
					if (!g_keep_colors) b_imp = 'important';
					for (bog of bo_arr) {
					let fgarr = getRGBarr(bog);
					let fgarr2 = bog2 ? getRGBarr(bog2) : [];
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || g_keep_colors || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					var fgr;
					let cf = calcColorfulness(fgarr);
					if (cf < g_max_border) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						m_bocol.set(node, fgarr);
						}
					} else {
						fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
						fgr[3] = fgarr[3];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
						m_bocol.set(node, fgarr);
						m_sty[fgarr] = fgr;
						m_sty[fgr] = fgr;
						}
					}
					} else {
						fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					}
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt >= 0 && (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3])) {
						m_bocol.set(node, fgarr);
						if (bog == cs.borderColor) {
							node.style.setProperty('border-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderTopColor) {
							node.style.setProperty('border-top-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderBottomColor) {
							node.style.setProperty('border-bottom-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderLeftColor) {
							node.style.setProperty('border-left-color','rgba('+fgr+')',b_imp);
						} else if (bog == cs.borderRightColor) {
							node.style.setProperty('border-right-color','rgba('+fgr+')',b_imp);
						}
					}
					}
					}
					}
				}
				if (bg && (!/(\(0\, 0\, 0\, 0\)|transparent)/i.test(bg) || style.backgroundImage.indexOf('gradient') > -1)) {
					let bg_attr = 'background';
					let bg_imp  = '';
					if (!g_keep_colors) bg_imp = 'important';
					if (style.backgroundImage && style.backgroundImage != undefined && !/(gradient|none)/i.test(style.backgroundImage)) bg_attr = 'background-color';

					let fgarr = getRGBarr(bg);
					let fgarr2 = bg2 ? getRGBarr(bg2) : [];
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[fgarr] == undefined || fgarr[0] != m_sty[fgarr][0] || fgarr[1] != m_sty[fgarr][1] || fgarr[2] != m_sty[fgarr][2] || fgarr[3] != m_sty[fgarr][3]) {
					let cf = calcColorfulness(fgarr);
					bgbrt = calcBrightness(fgarr);
					if (cf < g_min_colorfulness || bgbrt > g_min_bg_brightness) {
					if (m_sty[fgarr] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						var fgr;
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = m_sty[fgarr];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
						fgr[3] = fgarr[3];
						node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
						bgp = true;
						m_bcol.set(node, fgarr);
						}
					} else {
					let fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt > 0) {
						m_bcol.set(node, fgarr);
						node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
						bgp = true;
						m_sty[fgarr] = fgr;
					}
					}
					}
					} else {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					bgbrt = calcBrightness(fgr);
					m_bcol.set(node, fgarr);
					node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
					bgp = true;
					}
					}
					if (g_keep_colors && b_ctext[node_count] < g_bg_threshold && b_ctext[node_count] > 0) {
					let fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					fgarr = getRGBarr(fgk);
					if (calcBrightness(fgr) > g_min_bg_brightness) {
					m_bcol.set(node, fgr);
					node.style.setProperty(bg_attr,'rgba('+fgr+')',bg_imp);
//					scol = fgr[0]+', '+fgr[1]+', '+fgr[2];
//					if (bg_imp == '' && style.getPropertyValue(bg_attr).indexOf(scol) < 0)
//						node.style.setProperty(bg_attr,'rgba('+fgr+')','important');
//					m_fcol.set(node, fgarr);
//					node.style.setProperty('color','rgba('+(255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2])+', '+fgarr[3]+')',bg_imp);
//					scol = (255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2]);
//					if (style.color.indexOf(scol) < 0)
//						node.style.setProperty('color','rgba('+(255-fgarr[0])+', '+(255-fgarr[1])+', '+(255-fgarr[2])+', '+fgarr[3]+')','important');
					skip_colors = true;
					}
					}
				}
				}
				}
			}
			}
			}

			if (!is_einput)
			if ((node.children.length == 1 && b_ctext[node_count] <= b_ctext[map.get(node.firstElementChild)]) || (node.children.length > 1 && b_ctext[node_count] <= b_ctext[map.get(node.firstElementChild)]+b_ctext[map.get(node.lastElementChild)]))
				return;

			if (!cfg.skipNavSection && b_chk[node_count] > 5) {
				if (tag == 'SECTION') {
					let snw = style.getPropertyValue('width');
					if (/\d+.*?px/.test(snw)) {
						let nw = parseInt(snw);
						if (!isNaN(nw) && nw/window.innerWidth < 0.8 && nw/window.innerWidth > 0.3) {
							let nwidth = ';width: calc( ' + snw + ' + ' + cfg.size + '% );';
							if (style.display.length == 0) nwidth += 'display:table;';
							let nsty = node.getAttribute('style');
							if (nsty == null) nsty = '';
							if ((nsty+nwidth).length > 0)
								node.setAttribute('style', nsty + nwidth);
						}
					}
				} else if (tag == 'NAV') {
					var nwidth = '';
					var nheight = '';
					let sw = style.getPropertyValue('width');
					if (/\d+.*?px/.test(sw)) {
						let nw = parseInt(sw);
						nwidth = ';width: calc( ' + sw + ' + ' + cfg.size + '% );';
						if (pnode != null && pnode.getBoundingClientRect && node.firstElementChild != null) {
							if (node.firstElementChild.getBoundingClientRect().left - pnode.getBoundingClientRect().left > 180)
								nwidth = nwidth + 'margin-left:-'+cfg.size/2+'%;';
						}
						if (isNaN(nw) || nw/parseInt(window.innerWidth) < 0.6)
							nwidth = '';
					}
					let sh = style.getPropertyValue('height');
					let sfz = parseInt(style.getPropertyValue('font-size'));
					if (sh && sfz*2.75 < parseInt(sh))
						nheight = '';
					else if (sfz < cfg.threshold)
						nheight = ';height:' + h_sizes[sfz] + ';';
					let nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
					if ((nsty+nheight+nwidth).length > 0)
						node.setAttribute('style', nsty + nheight + nwidth);
				}
			}

			if (cfg.start3)
			if (!node.hasAttribute(focalAnchors.attrNameContainer) && b_ctext[node_count] > 1) {
				//if (doc_obs != undefined && doc_obs != null)
				//	doc_obs.disconnect();
				focalAnchors.toggleAnchorsByRef(node, false, cfg.skipLinks, cfg.weight);
				//if (doc_obs != undefined && doc_obs != null)
				//	doc_obs.observe(document.body, { childList: true, subtree: true });
			}

			if (!sk || is_oinput)
			if (cfg.threshold > 0 && (!b_iimg[node_count] || b_ctext[node_count] > 0)) {
				let nsty = node.getAttribute('style');
				if (nsty == null) nsty = '';
				let sfz = style.fontSize;
				let nfz = parseInt(sfz);
				if (parseFloat(sfz) <= cfg.threshold) {
					if (/font-size[^;]*important/ig.test(nsty)) {
						let rsty = nsty.replace(/font-size[^\;]*important/ig,'');
						node.setAttribute('style',rsty);
						nsty = node.getAttribute('style');
						if (nsty == null) nsty = '';
					}
					if (/line-height[^;]*important/ig.test(nsty)) {
						let rsty = nsty.replace(/line-height[^\;]*important/ig,'');
						node.setAttribute('style',rsty);
						nsty = node.getAttribute('style');
						if (nsty == null) nsty = '';
					}
					node.setAttribute('s__', nfz);
					if (style.fontSize == sfz) {
						node.style.setProperty('font-size',f2_sizes[nfz],'important');
					if (!cfg.skipHeights)
						node.style.setProperty('line-height', h_sizes[nfz],"important");
					if (cfg.advDimming) {
						if (!nn_reg.test(nsty) || cfg.ssrules)
							node.style.setProperty('filter',str_style,'important');
					}
					if (cfg.forceOpacity)
						node.style.setProperty('opacity',str_style2,'important');
					} else if (nn_reg.test(nsty) && cfg.advDimming && cfg.ssrules) {
						nsty += 'filter:'+str_style+'!important;';
						node.setAttribute('style',nsty);
						nsty = node.getAttribute('style');
						if (nsty == null) nsty = '';
					}
				}
				if (!cfg.skipHeights && b_ctext[node_count] > 0 && parseInt(style.lineHeight) <= nfz) {
					let rsty = nsty;
					rsty += ';line-height:115%!important;';
					node.setAttribute('style',rsty);
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
				}
			}

			if (cfg.threshold > 0 && (!b_iimg[node_count] || b_ctext[node_count] > 0 || (is_einput && is_oinput))) {
				let nsty = node.getAttribute('style');
				if (nsty == null) nsty = '';
				if (cfg.normalInc2 && skip_colors != true)
				if (style.color || style.backgroundColor || style.borderColor) {
					var pcol, ocol, cola;
					if (style.color && !colors_to_skip.includes(style.color)) {
					let col = getRGBarr(style.color);
					col = [parseInt(col[0]), parseInt(col[1]), parseInt(col[2]), parseInt(col[3])];
					let cful = calcColorfulness(col);
					ocol = col;
					pcol = '';
					if (b_idone[ocol] == undefined && col && cful > 34) {
						pcol = colorblindFg(col, cfg, g_n_inv, /invert\(1/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						node.style.setProperty('color', pcol,'important');
					}
					}
					if (style.backgroundColor && !colors_to_skip.includes(style.backgroundColor)) {
					let col = getRGBarr(style.backgroundColor);
					col = [parseInt(col[0]), parseInt(col[1]), parseInt(col[2]), parseInt(col[3])];
					let cful = calcColorfulness(col);
					ocol = col;
					pcol = '';
					if (b_idone[ocol] == undefined && col && cful > 34) {
						pcol = colorblindBg(col, cfg, g_n_inv, /invert\(1/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1 && pcol != style.color) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						node.style.setProperty('background-color', pcol,'important');
					}
					}
					if (style.borderColor && !colors_to_skip.includes(style.borderColor)) {
					let bog = style.borderTopColor || style.borderRightColor || style.borderBottomColor || style.borderLeftColor;
					let col = getRGBarr(bog);
					col = [parseInt(col[0]), parseInt(col[1]), parseInt(col[2]), parseInt(col[3])];
					let cful = calcColorfulness(col);
					ocol = col;
					pcol = '';
					if (b_idone[ocol] == undefined && col && cful > 34) {
						pcol = colorblindFg(col, cfg, g_n_inv, /invert\(1/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						if (bog == style.borderColor)
							node.style.setProperty('border-color',pcol,'important');
						else if (bog == style.borderTopColor)
							node.style.setProperty('border-top-color',pcol,'important');
						else if (bog == style.borderBottomColor)
							node.style.setProperty('border-bottom-color',pcol,'important');
						else if (bog == style.borderLeftColor)
							node.style.setProperty('border-left-color',pcol,'important');
						else if (bog == style.borderRightColor)
							node.style.setProperty('border-right-color',pcol,'important');
					}
					}
				}
				if (!cfg.skipHeights && !node.hasAttribute('s__') && (b_ctext[node_count] > 2 || (node.type && is_oinput)) && (b_chk[node_count] < g_max_child || (cfg.start3 && node.hasAttribute(focalAnchors.attrNameContainer) && b_chk[node_count] < g_max_child*12)))
					node.setAttribute('h__', 1);
				if (cfg.makeCaps) {
					if (g_eng)
						node.style.setProperty('font-variant-caps', 'small-caps');
					else
						node.style.setProperty('text-transform', 'uppercase');
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
				}

				if (cfg.forcePlhdr && cfg.forceIInv && !b_noemo) {
				if (b_emo[node_count] != true && node.children.length < 10) {
					if (/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/umg.test(node.textContent)) {
					//if (doc_obs != undefined && doc_obs != null)
					//doc_obs.disconnect();
					let chldn = Array.from(node.children);
					for (let ch of chldn) { b_emo[map.get(ch)] = true; }
					//let srt = node.innerHTML.replaceAll(/([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)/umg, '<span style="filter:invert(1);">$1</span>');
					//invertEmojis(node);
					focalAnchors.toggleAnchorsByRef(node, true);
					//node.innerHTML = srt;
					b_emo[node_count] = true;
					//if (doc_obs != undefined && doc_obs != null)
					//	doc_obs.observe(document.body, { childList: true, subtree: true });
					}
				}
				}
				if (is_einput && b_dim[node_count] != true) {
					b_dim[node_count] = true;
					if (!is_xinput) {
					if (!(cfg.input_border && !cfg.start3 && cfg.skipLinks))
					if ((node.value || tag == 'SELECT') && style.getPropertyValue('width')) {
					var nwidth = style.getPropertyValue('width');
					if (tag == 'INPUT' && node.type == 'text' && node.value.length < 50 && parseInt(nwidth) < 100)
						nwidth = ';width: calc( ' + nwidth + ' + ' + (node.value.length/3).toFixed(1) + 'em )!important;';
					else
						nwidth = ';width: calc( ' + nwidth + ' + ' + (cfg.size/2).toFixed(1) + '% )!important;';
					if (style.height && parseInt(style.height) <= parseInt(cfg.threshold)*2.25)
						nwidth += ';height:'+cfg.threshold*2.25+'px!important;';
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
					nsty += nwidth;
					if (nsty && !cfg.skipHeights)
						node.setAttribute('style', nsty);
					}
					if (!node.disabled && cfg.strength % 2 != 0 && (is_einput || is_oinput)) {
					let txtcolor = style.color;
					if (txtcolor == null || txtcolor.length < 1) txtcolor = 'rgb(0,0,0)';
					let txt_brt = calcBrightness(getRGBarr(txtcolor));
					let bg_color = style.backgroundColor;
					if (/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
						bg_color = getBgColor(pnode);
					var bg_brt;
					if (!/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
						bg_brt = calcBrightness(getRGBarr(bg_color));
					else
						bg_brt = 176;
					if (txt_brt > bg_brt)
						txtcolor = 'rgb(255, 255, 255)';
					else
						txtcolor = 'rgb(0, 0, 0)';
					node.style.setProperty('color',txtcolor,'important');
					skip_colors = true;
					if (cfg.forcePlhdr && cfg.forceIInv)
						node.style.setProperty('filter','unset','important');
					}
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
					if (cfg.advDimming)
						node.style.setProperty('filter','revert','important');
					}
				}
			}
/**
			if (cfg.makeCaps)
			if (node.nextSibling != null && !(node.nextSibling instanceof Element) && /\#text/i.test(node.nextSibling.nodeName) && /\bBODY/i.test(pnode.nodeName)) {
				let nxtTxt = node.nextSibling.wholeText;
				let upperTxt = nxtTxt.toUpperCase();
				node.nextSibling.textContent = upperTxt;
			}
*/
			if (cfg.underlineLinks && tag == 'A') {
				node.setAttribute('u__', '');
				node.style.setProperty('text-decoration','underline');
			}

			if (str300 || ftr || skip_colors) return;

			if (b_ctext[node_count] < 1) return;

			let color = style.getPropertyValue('color');

			if (colors_to_skip.includes(color) && !(g_black.includes(color) && cfg.skipBlack))
				return;

			let rgba_arr = getRGBarr(color);

			if (!rgba_arr)
				return;

			/*let img_offset = 0;

			if (b_iimg[node_count] || nodes_behind_img.includes(node))
				img_offset += 60;
			if (is_link || pnode.nodeName == 'A')
				img_offset += 60;*/
			let bg_transp = false;

			let bg_color = style.backgroundColor;
			if (/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
				bg_color = getBgColor(pnode);
			
			function getBgColor(pnode) {
				let bg_color = 'transparent';
				if (pnode instanceof Element) bg_color = getComputedStyle(pnode).backgroundColor;
				while (pnode && !/\bHTML/i.test(pnode.nodeName) && /(0\, 0\, 0\, 0|transparent)/i.test(bg_color)) {
					if (pnode instanceof Element) bg_color = getComputedStyle(pnode).backgroundColor;
					pnode = pnode.parentNode;
				}
				return bg_color;
			}

			if (/(0\, 0\, 0\, 0|transparent)/i.test(bg_color)) {
				bg_transp = true;
				if (cfg.advDimming && cfg.forcePlhdr) {
				if (finalLightness > 0.5)
					bg_color = 'rgb(0, 0, 0)';
				else
					bg_color = 'rgb(255, 255, 255)';
				} else {
				if (finalLightness < 0.5)
					bg_color = 'rgb(0, 0, 0)';
				else
					bg_color = 'rgb(255, 255, 255)';
				}
			}/** else {
				if (b_chk[node_count] >= 2)
					node.style.setProperty('background-color',bg_color);
			}*/

			let fg_brt = calcBrightness(rgba_arr);

			let bg_arr = getRGBarr(bg_color);
			if (bg_arr[3] > 0.0 && bg_arr[3] < 1.0) bg_arr[3] = 1.0;

			bg_brt = calcBrightness(bg_arr);
			if (cfg.skipBlack && g_black.includes(color) && bg_brt < g_min_bg_brightness) {
				node.style.setProperty('color','rgb(255, 255, 255)','important');
				color = 'rgb(255, 255, 255)';
				fg_brt = 255;
			}

			let bg_threshold = cfg.strength*1 + g_bg_threshold*1;

			let contrast = Math.abs(bg_brt - fg_brt);

			if (cfg.skipColoreds) {
				let fg_colorfulness   = calcColorfulness(rgba_arr);
				let min_contrast      = cfg.strength / 3;

				if ((contrast > min_contrast || cfg.strength > 200) && fg_colorfulness > g_min_colorfulness)
					return;
			}

			if (bg_threshold > fg_brt) {
				let bstl = '';
				if (fg_brt < bg_brt)
					bstl = 'rgb(0, 0, 0)';
				else
					bstl = 'rgb(255, 255, 255)';
				if (g_n_inv)
					if (bstl == 'rgb(0, 0, 0)')
						bstl = 'rgb(255, 255, 255)';
					else if (bstl == 'rgb(255, 255, 255)')
						bstl = 'rgb(0, 0, 0)';
				if (bstl)
					if (!g_keep_colors)
						node.style.setProperty('color',bstl,'important');
					else
						node.style.setProperty('color',bstl);
			}
		};

		const iterateBigArr = (arr) => {
			if (doc_obs != undefined && doc_obs != null)
				doc_obs.disconnect();
			for (let el of arr) {
				setAttribs(el);
			}
			if (doc_obs != undefined && doc_obs != null)
				doc_obs.observe(document.body, { childList: true, subtree: true });
		}

		iterateBigArr(nodes);

		if (cfg.advDimming && !cfg.ssrules)
			document.body.style.setProperty('filter','unset','important');
		if (bdy_attr && bdy_val)
			document.body.style.setProperty(bdy_attr, bdy_val, 'important');
	}

	await process(nodes);

	var nnodes;
	const observer = mutations => {
		let new_nodes = [];

		mutations.forEach(mut => {
			for (let node of mut.addedNodes) {
				if (!(node instanceof Element))
					continue;

				nnodes = Array.from(node.getElementsByTagName('*'));

				new_nodes.push(node);

				if (nnodes.length) new_nodes.push(...nnodes);
			}
		});

		if(new_nodes.length) {
			var hi = null, dep = 9999;
			for (let n of new_nodes) {
				let d = topNode(n);
				if (d < dep) {
					dep = d;
					hi = n;
				}
			}
			if (hi && hi != undefined) {
				let pch = hi.parentNode;
				let c = hi;
				while (pch && !/^(BODY|HTML)$/i.test(pch.nodeName)) {
					if (c instanceof Element) {
						new_nodes.push(c);
						//c.setAttribute('_btvdone_','1');
					}
					c = pch;
					pch = pch.parentNode;
				}
			}
			b_html = false;
			setTimeout(() => process(new_nodes, true), 15);
		}

	};

	if (doc_obs != undefined && doc_obs != null) {
		doc_obs.observe(document.body, { childList: true, subtree: true });
	} else {
		doc_obs = new MutationObserver(observer);
		doc_obs.observe(document.body, { childList: true, subtree: true });
	}
	if (nodes_to_observe.length > 0)
	for (let c of nodes_to_observe) {
	new MutationObserver(observer).observe(c, { childList: true, subtree: true });
	}

	t_end = Date.now();

	console.log('Time processing = '+((t_end-t_start)/1000.0).toFixed(2) + ' seconds');

}

var timerid2 = setTimeout(changeBrightnessContrast, 1000);
var g_brt, g_ctr;

function changeBrightnessContrast() {

	chrome.storage.local.get(["url","abrightness","acontrast","azoom","afont"]).then((res) => {

	let url_g = window.location.href.indexOf('#full_url') > -1 ? window.location.href : window.location.hostname || window.location.href;
	let url = url_g.trim();

	let url1 = '';
	if (res.url != undefined && res.url)
		url1 = res.url.trim();

	let brt = document.documentElement.style.getPropertyValue("--g_brightness");
	let ctr = document.documentElement.style.getPropertyValue("--g_contrast");
	let zoo = parseFloat(document.documentElement.style.getPropertyValue("--g_zoom"));
	let fnt = document.documentElement.style.getPropertyValue("--g_btvfont");

	if (url1 == url && (brt != res.abrightness || ctr != res.acontrast || zoo != parseFloat(res.azoom) || fnt != res.afont))
	if ((!isNaN(parseInt(res.abrightness)) && !isNaN(parseInt(res.acontrast)) && !isNaN(parseFloat(res.azoom))) || res.afont) {

	g_brt = res.abrightness;
	g_ctr = res.acontrast;

	if (parseFloat(res.azoom) >= 0.0099)
		document.documentElement.style.setProperty('--g_zoom',Math.abs(parseFloat(res.azoom)));
	else
		document.documentElement.style.setProperty('--g_zoom',1.75);

	if (res.afont) {
		document.documentElement.style.setProperty('--g_btvfont',res.afont);
		let rul = `*{font-family:var(--g_btvfont)!important;}`;
		if (!g_fntRule) {
			style_node.sheet.insertRule(rul,0);
			g_fntRule = true;
		}
	} else if (g_fntRule) {
		document.documentElement.style.setProperty('--g_btvfont','');
		g_fntRule = false;
		let rul = 'var(--g_btvfont)';
		let rl = style_node.sheet.cssRules;
		let x = 0;
		for (x = 0; x < rl.length; x++ )
			if (rl[x].cssText.indexOf(rul) > -1) break;
		if (x < rl.length)
			style_node.sheet.deleteRule(x);
	}

	document.documentElement.style.setProperty('--g_brightness',g_brt);
	document.documentElement.style.setProperty('--g_contrast', g_ctr);

	let f_brt = parseInt(g_brt)/100;
	let f_ctr = parseInt(g_ctr)/100;

	g_brightness = f_brt;
	g_contrast = f_ctr;

	g_m = multiplyMatrices(Matrix.identity(), Matrix.brightness(f_brt));
	g_m2 = multiplyMatrices(g_m, Matrix.contrast(f_ctr));
	g_m = multiplyMatrices(g_m2, Matrix.invertNHue());

	if (m_fcol != undefined)
	for (let [n, col] of m_fcol.entries()) {
		let bgbrt = calcBrightness(col);
		var fgr;
		if (bgbrt < g_max_fg_brightness) {
		let fgcol = [ 255-col[0], 255-col[1], 255-col[2] ];
		fgr = applyColorMatrix(fgcol);
		} else {
		fgr = [ 255-col[0], 255-col[1], 255-col[2] ];
		}
		fgr[3] = col[3];
		let nsty = n.getAttribute('style');
		if (nsty == null) nsty = '';
		let rsty = nsty.replace(/color[^\;]*/ig, 'color:rgba('+fgr+')!important;');
		n.setAttribute('style',rsty);
	}

	if (m_bcol != undefined)
	for (let [n, col] of m_bcol.entries()) {
		let cf = calcColorfulness(col);
		let bgbrt = calcBrightness(col);
		var fgr;
		if (cf < g_min_colorfulness || bgbrt > g_min_bg_brightness) {
			let fgcol = [ 255-col[0], 255-col[1], 255-col[2] ];
			fgr = applyColorMatrix(fgcol);
		} else {
			fgr = [ 255-col[0], 255-col[1], 255-col[2] ];
		}
		fgr[3] = col[3];
		let nsty = n.getAttribute('style');
		if (nsty == null) nsty = '';
		let rsty = nsty.replace(/background-color[^\;]*/ig, 'background-color:rgba('+fgr+')!important;');
		n.setAttribute('style',rsty);
		let scol = fgr[0]+', '+fgr[1]+', '+fgr[2];
		if (n.style.backgroundColor.indexOf(scol) < 0)
			n.style.setProperty('background-color','rgba('+fgr[0]+', '+fgr[1]+', '+fgr[2]+', '+fgr[3]+')','important');
	}

	if (m_bocol != undefined)
	for (let [n, col] of m_bocol.entries()) {
		let cf = calcColorfulness(col);
		var fgr;
		if (cf < g_max_border) {
			let fgcol = [ 255-col[0], 255-col[1], 255-col[2] ];
			fgr = applyColorMatrix(fgcol);
		} else {
			fgr = [ 255-col[0], 255-col[1], 255-col[2] ];
		}
		fgr[3] = col[3];
		let nsty = n.getAttribute('style');
		if (nsty == null) nsty = '';
		let rsty = nsty.replace(/border-color[^\;]*/ig, 'border-color:rgba('+fgr+')!important;');
		n.setAttribute('style',rsty);
	}

	chrome.storage.local.remove(["url","abrightness","acontrast","azoom","afont"]);
	}

	});
	timerid2 = setTimeout(changeBrightnessContrast, 1500);
}

window.onload = init;
