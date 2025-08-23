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
try {
if (stop) { window.speechSynthesis.cancel(); g_sp_timeout = setTimeout(speechResume,10000); return; }
var textlines = tex.split(u_fullstop);
for (var i= 0; i < textlines.length; i++) {
if (textlines[i].search(/\s+/g) > -1)
	textlines[i] = textlines[i].replaceAll(/\s+/g,' ');
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
try {
setTimeout(speechSynthesis.speak(u), 10);
} catch (e) {}
}

} catch (e) {}

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
	if (h == null || s == null) return [];
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
	if (hsl_str == null || hsl_str.length < 5) return [];
	let hsl = hsl_str.match(/[\%\.\d]+/g);
	if (hsl == null || hsl.length < 3) return [];
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
	if (rgba_str == null || rgba_str.length < 5) return [];
	let rgb = rgba_str.match(/[\.\d]+/g);
	if (rgb[3] == undefined)
		rgb[3] = 1;
	else if (rgb[3] > 1 && rgb[3] <= 100)
		rgb[3] = rgb[3] / 100;
	//rgb[3] = rgb[3] == undefined ? 1 : rgb[3] > 1 && rgb[3] <= 100 ? rgb[3]/100 : rgb[3];
	return rgb;
}

function clamp(x, min, max) {
	return Math.min(max, Math.max(min, x));
}

function applyColorMatrix([r, g, b]) {
	if (g_keep_colors && g_brightness == 1.0 && g_contrast == 1.0)
		if (calcColorfulness([r,g,b]) > g_min_colorfulness) return [r,g,b];
	const rgb = [r / 255, g / 255, b / 255, 1, 1];
	const result = [  rgb[0]*g_m[0][0]+rgb[1]*g_m[0][1]+rgb[2]*g_m[0][2]+g_m[0][3]+g_m[0][4]  ,  rgb[0]*g_m[1][0]+rgb[1]*g_m[1][1]+rgb[2]*g_m[1][2]+g_m[1][3]+g_m[1][4]  ,  rgb[0]*g_m[2][0]+rgb[1]*g_m[2][1]+rgb[2]*g_m[2][2]+g_m[2][3]+g_m[2][4]  ];
	return [0, 1, 2].map((i) =>
	clamp(Math.round(result[i] * 255), 0, 255));
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
var b_fnlLgt;
let g_nokinput = /(checkbox|color|hidden|image|radio|range|submit)/i;
let g_okinput = /(date|email|month|number|password|search|select|tel|text|time|url|week)/i;
let color_map = ['color', 'background-color', 'background', 'background-image', 'border-color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color' ];
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
var g_max_text;
var g_btvfont;
var g_tags_to_skip;

var g_skiplinks_nstart3;

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
			caps = 'text-transform:uppercase!important;'+sty;
		} else if (!/\w/.test(words[0]) && wordID == 1) {
			spos = words[1].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty;
		} else {
			boldNum = 0;
		}
		} else if (g_start3_caps.substr(0,4).indexOf('para') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			boldNum = 0;
		} else if (/\w/.test(words[0]) && wordID == 0) {
			spos = words[0].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty;
		} else if (!/\w/.test(words[0]) && wordID == 1) {
			spos = words[1].search(/\w/);
			boldNum = 1;
			caps = 'text-transform:uppercase!important;'+sty;
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
			sCaps = 'text-transform:uppercase!important;'+sty;
		} else if (words[0].search(/\p{L}/gu) > -1 && wordID == 0) {
			spos = words[0].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty;
		} else if (words[0].search(/\p{L}/gu) < 0 && wordID == 1) {
			spos = words[1].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty;
		} else {
			boldNum = 0;
		}
		} else if (g_start3_caps.substr(0,4).indexOf('para') > -1) {
		if (g_s3_reg.test(g_s3_prev) || g_s3_reg.test(node.parentNode.nodeName)) {
			boldNum = 0;
		} else if (words[0].search(/\p{L}/gu) > -1 && wordID == 0) {
			spos = words[0].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty;
		} else if (words[0].search(/\p{L}/gu) < 0 && wordID == 1) {
			spos = words[1].search(/\p{L}/gu);
			boldNum = 1;
			sCaps = 'text-transform:uppercase!important;'+sty;
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
			//if (mtrIndic.includes(word.charCodeAt(4))) boldNum =Math.min(word.length,6);
			//if (mtrIndic.includes(word.charCodeAt(5))) boldNum =Math.min(word.length,7);
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
		if ((/span/i.test(tag) && /filter.*invert/i.test(node.parentNode.getAttribute('style'))) || (/span/i.test(ptag) && /filter.*invert/i.test(node.parentNode.parentNode.getAttribute('style'))))
			bold.setAttribute('style', 'color:white!important;');
		else
			bold.setAttribute('style', 'filter:var(--g_filter_invert);color:white!important;');
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
	let cont = gcs.content;
	let itag = ch.nodeName.toUpperCase();
	switch (itag) {
	case 'IMG':
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
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		imar[nc] = wi*he;
		if (wi > 499 && he > 99) b_imgforce[nc] = true;
		return true;
	case 'VIDEO':
	case 'EMBED':
	case 'OBJECT':
	case 'CANVAS':
		if (g_tags_to_skip.indexOf(itag) < 0) return false;
		wi = parseInt(ch.width);
		he = parseInt(ch.height);
		if (!wi && !he) {
		wi = parseInt(parseInt(ch.getBoundingClientRect().width)/10);
		he = parseInt(parseInt(ch.getBoundingClientRect().height)/10);
		}
		imar[nc] = wi*he;
		return true;
	default:
	if ( gcs != null && bgim != '' && bgim != 'none' && gcs.display != 'none' && !/(aspx?|html?|php)[\"\'\)]/i.test(bgim) && /(http|url)/i.test(bgim)) {
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
	} else if (chsrc != undefined && chsrc && gcs.display != 'none' && /image/i.test(ch.type) && !/(aspx?|html?|php)[\"\'\)]/i.test(chsrc) && /(http|url)/i.test(chsrc)) {
		var im, src, src1;
                im = new Image();
		if (/var\(/i.test(chsrc))
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
	} else if (cont != undefined && cont && gcs.display != 'none' && !/(aspx?|html?|php)[\"\'\)]/i.test(cont) && /(http|url)/i.test(cont)) {
		var im, src, src1;
                im = new Image();
		if (/var\(/i.test(cont))
			src1 = getVarValue(cont);
		else
			src1 = cont;
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
	let pch = node.parentElement;
	let b_found = false;
	let ns = [node];
	while (pch && !/\b(BODY|HTML)/i.test(pch.nodeName)) {
		if (pch) {
		ns.push(pch);
		if (reg.test(getComputedStyle(pch).filter)) {
			b_found = true; break;
		}
		}
		pch = pch.parentElement;
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
	let pch = node.parentElement;
	let c = 0;
	while (pch && !/^(BODY|HTML)$/i.test(pch.nodeName)) {
		pch = pch.parentElement;
		c++;
	}
	return c;
}

function getTopNode(node) {
	let pch = node.parentElement;
	let c = node;
	while (pch && !/\b(BODY|HTML)/i.test(pch.nodeName)) {
		c = pch;
		pch = pch.parentElement;
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

	let boldw = cfg.weight;
	let bold = '';
	g_skiplinks_nstart3 = cfg.skipLinks && !cfg.start3;

	if (!g_skiplinks_nstart3)
	if (!cfg.start3 || boldw < 400)
	if (boldw != 400)
		bold = `*{font-weight:${boldw}!important};`;

	let underline = '';
	if (cfg.underlineLinks)
		underline = '[u__]{text-decoration:underline!important}';

	if (!cfg.forcePlhdr)
		color_black = '';

	g_eng = false;
	var lang;
	if (cfg.start3 || cfg.makeCaps) {
		lang = document.documentElement.lang;
		if (lang == null || lang.length == 0)
			g_eng = true;
		else if (/^en/i.test(lang))
			g_eng = true;
	} else {
		g_eng = true;
	}

	if (cfg.makeCaps)
		if (g_eng)
			sCaps = 'font-variant-caps:small-caps!important;';
		else
			sCaps = 'text-transform:uppercase!important;';

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
	let glo = '';
	if (cfg.customCss)
		cust = cfg.customCssText;
	if (cfg.globalCss && cfg.globalCss != undefined)
		glo = cfg.globalCss;

	let size_inc = '';
	let c = 0, cd = 0;
	let cc = 0;
	let height_inc = 1;
	var pcent;

	let n_zoo = Math.abs(parseFloat(cfg.strength)/100).toFixed(2);
	if (cust && /\-\-g_zoom[\W\:]+/.test(cust)) {
		let cs = cust;
		cs = cs.replace(/[\w\W]*g_zoom[\W\:]+([0-9\.]+)[\w\W]*/g,`$1`);
		n_zoo = parseFloat(cs);
	} else if (glo && /\-\-g_zoom[\W\:]+/.test(glo)) {
		let cs = glo;
		cs = cs.replace(/[\w\W]*g_zoom[\W\:]+([0-9\.]+)[\w\W]*/g,`$1`);
		n_zoo = parseFloat(cs);	
	} else if (cfg.strength == 0) {
		n_zoo = 1.75;
	}

	document.documentElement.style.setProperty('--g_zoom',n_zoo);

	g_mag = ".btvenlarge:hover { position: relative; overflow: visible;-webkit-transform: scale(var(--g_zoom));-moz-transform: scale(var(--g_zoom));-o-transform: scale(var(--g_zoom));-ms-transform: scale(var(--g_zoom));transform: scale(var(--g_zoom));-webkit-transition: all .2s ease-in-out;-moz-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;-ms-transition: all .2s ease-in-out;z-index: 19999;} .btvenlarge {position: relative; overflow: hidden;z-index: 1000; }";

	g_anegative = false;
	if (cust && cust.indexOf('--g_avoid_negative') > -1) {
		if (/\-\-g_avoid_negative[^\;]*(false|0)\;/.test(cust))
			g_anegative = false;
		else if (/\-\-g_avoid_negative[^\;]*wait\;/.test(cust))
			g_anegative = -99;
		else
			g_anegative = true;
	} else if (glo && glo.indexOf('--g_avoid_negative') > -1) {
		if (/\-\-g_avoid_negative[^\;]*(false|0)\;/.test(glo))
			g_anegative = false;
		else if (/\-\-g_avoid_negative[^\;]*wait\;/.test(glo))
			g_anegative = -99;
		else
			g_anegative = true;
	}

	g_smaller_text = false;
	if (cust && cust.indexOf('--g_smaller_text') > -1) {
		if (!/\-\-g_smaller_text[^\;]*(false|0)\;/.test(cust))
			g_smaller_text = true;
		else
			g_smaller_text = false;
	} else if (glo && glo.indexOf('--g_smaller_text') > -1) {
		if (!/\-\-g_smaller_text[^\;]*(false|0)\;/.test(glo))
			g_smaller_text = true;
		else
			g_smaller_text = false;
	}

	b_fnlLgt = false;
	if (cust && cust.indexOf('--g_final_lightness') > -1) {
		let cs = cust.replace(/[\w\W]*g_final_lightness[\W\:]+([0-9\.]+)[\w\W]*/g,`$1`);
		if (cs) {
			finalLightness = parseFloat(cs);
			b_fnlLgt = true;
		}
	}

	if (cfg.size > 0 && cfg.threshold > 0) {
		height_inc = (1.07 + 0.225*cfg.size/cfg.threshold).toFixed(2);
		while (c < cfg.threshold) {
			++c;
			cd = c;
			if (g_skiplinks_nstart3) {
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
				size_inc += `line-height: ${height_inc}em!important;${sCaps}${dim}}\n`;
			else
				size_inc += `${sCaps}${dim}}\n`;
			size_inc += `[h__='${c}']{line-height:115%!important;min-height: ${height_inc}em!important}`;
			if (!cfg.skipHeights)
				f_sizes[c] = ";font-size: " + cc2 + "px!important;"+sCaps+"line-height: " + height_inc + "em!important;" + dim;
			else
				f_sizes[c] = ";font-size: " + cc2 + "px!important;"+sCaps+ dim;
			h_sizes[c] = `${height_inc}em`;
			if (cc2.substr(-2,2).indexOf('.0') > -1) cc2 = parseInt(cc2);
			f2_sizes[c] = cc2 + "px";
			if (c > 9)
				size_inc += "[style*='font-size: "+c+"'],[style*='font-size:"+c+"'] { "+f_sizes[c]+" }";
			else
				size_inc += "[style*='font-size: "+c+"px'],[style*='font-size:"+c+"px'] { "+f_sizes[c]+" }";
		}
	}
	str_style = `brightness(${brght}) contrast(${ctrst})`;
	str_style2 = '1';

	g_globalCss = '';
	if (glo)
		g_globalCss = glo;

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

	if (document.getElementById('_btv_')) {
		if (g_loader != null) {
			g_loader.remove();
			g_loader = null;
		}
		return;
	}

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
	var idx;
	if (/#full_url/i.test(window.location.href))
		idx = bl.findIndex(x => x.url === window.location.href);
	else
		idx = bl.findIndex(x => x.url === url);

	if (idx > -1) {
		let cnode = document.getElementById("_btv_");
		if (style_node.hasChildNodes()) {
			style_node.removeChild(cnode);
		}
		cnode.remove();
		if (g_loader != null) {
			g_loader.remove();
			g_loader = null;
		}
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
			if (g_loader != null) {
				g_loader.remove();
				g_loader = null;
			}
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
	try {

	css_node.nodeValue = getCSS(cfg);

	let nodes = [];

	if (document.body) {
		nodes = Array.from(document.body.getElementsByTagName('*'));
	} else {
		if (g_loader != null) {
			g_loader.remove();
			g_loader = null;
		}
		return;
	}

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
	let m_imp = {};
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
	let img_dat = new Map();
	let orig_colors = {};
	let orig_font = {};
	let toset_colors = [];
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
	let root_n_style = document.documentElement.style;
	root_style = getComputedStyle(document.documentElement);
	let browser_sfz = 'px';
	if (root_style.fontSize && /\d.*?px/i.test(root_style.fontSize))
		browser_sfz = root_style.fontSize;
	var b_opa = false;
	var n_sleep_sec = 0;
	if (!b_fnlLgt) {
	let rc = root_style.backgroundColor;
	let body_style = getComputedStyle(document.body);
	let bc = body_style.backgroundColor;
	let rootcolor = getRGBarr(rc);
	let bodycolor = getRGBarr(bc);
	while (n_sleep_sec < 10 && rc.indexOf('(0, 0, 0, 0') > -1 && bc.indexOf('(0, 0, 0, 0') > -1) {
		if (root_style.backgroundColor != rc || body_style.backgroundColor != bc) {
		rc = root_style.backgroundColor;
		bc = body_style.backgroundColor;
		rootcolor = getRGBarr(rc);
		bodycolor = getRGBarr(bc);
		} else if (root_style.backgroundColor == rc && body_style.backgroundColor == bc) {
			break;
		}
		await waitDelay(98);
		n_sleep_sec++;
	}
	if (rootcolor && bodycolor) {
	let rootLightness   = 1 -  rootcolor[3] + rootcolor[3] * calcBrightness(rootcolor)/255;
	finalLightness  = Math.abs((1 - bodycolor[3]) * rootLightness + bodycolor[3] * calcBrightness(bodycolor)/255);
	finalLightness = Math.sqrt(finalLightness);
	}
	}
        if (window.self == window.top)
		chrome.storage.local.set({lightness: finalLightness, default_size: browser_sfz});
	console.log(n_sleep_sec+' wait\tDark / Light = '+finalLightness.toFixed(2));
	if (cfg.forcePlhdr || cfg.advDimming)
	if (finalLightness < 0.5)  {
		if (cfg.advDimming && cfg.forcePlhdr) {
			var cs = css_node.nodeValue;
			var rcs = cs.replaceAll(/filter.*?brightness.*?contrast.*?\;/mg,'');
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
			var rcs = cs.replaceAll(/filter.*?brightness.*?contrast.*?\;/mg,'');
			css_node.nodeValue = rcs;
		}
	}
	if (cfg.advDimming)
		document.documentElement.style.setProperty('--g_beforeafter_color','#fff');
	else if (cfg.forcePlhdr)
		document.documentElement.style.setProperty('--g_beforeafter_color','#000');

	if (cfg.forcePlhdr)
		if (g_anegative)
			document.documentElement.style.setProperty('--g_filter_invert','invert(0)');
		else
			document.documentElement.style.setProperty('--g_filter_invert','invert(1)');

	let style_rule = "";
	if (cfg.forcePlhdr && cfg.forceIInv) {
	style_rule += "CANVAS,EMBED,IMG,OBJECT,SVG,VIDEO,INPUT[type='image'] { filter:var(--g_filter_invert); }";
	style_rule += "._btvinvertb_:before,._btvinverta_:after { filter:var(--g_filter_invert); }";
	style_rule += "[style*='background-image:url'],[style*='background-image:var'],[style*='background-image: url'],[style*='background-image: var']  { filter:var(--g_filter_invert); }";
	style_rule += "[style*='background:url'],[style*='background: url'] { filter:var(--g_filter_invert); }";
	style_rule += "body[style*='background-image:url'],body[style*='background-image:var'],body[style*='background-image: url'],body[style*='background-image: var'] { filter:unset; }";
	style_rule += "[style*='background-image:none'],[style*='background-image: none'] { filter:unset; }";
	style_rule += "[style*='background-image:url'] > :is(img,svg,video,input[type='image']), [style*='background-image:var'] > :is(img,svg,video,input[type='image']), [style*='background-image: url'] > :is(img,svg,video,input[type='image']), [style*='background-image: var'] > :is(img,svg,video,input[type='image']) { filter:unset; }";
	style_rule += "[style*='background:url'] > :is(img,svg,video,input[type='image']), [style*='background: url'] > :is(img,svg,video,input[type='image']) { filter:unset; }";
	style_rule += "frame,iframe { filter:var(--g_filter_invert); }";
	style_rule += "._btvbgimageb0:before { background-image:var(--g_bg_imageb0)!important; }";
	style_rule += "._btvbgimageb1:before { background-image:var(--g_bg_imageb1)!important; }";
	style_rule += "._btvbgimageb2:before { background-image:var(--g_bg_imageb2)!important; }";
	style_rule += "._btvbgimageb3:before { background-image:var(--g_bg_imageb3)!important; }";
	style_rule += "._btvbgimageb4:before { background-image:var(--g_bg_imageb4)!important; }";
	style_rule += "._btvbgimageb5:before { background-image:var(--g_bg_imageb5)!important; }";
	style_rule += "._btvbgimagea0:after { background-image:var(--g_bg_imagea0)!important; }";
	style_rule += "._btvbgimagea1:after { background-image:var(--g_bg_imagea1)!important; }";
	style_rule += "._btvbgimagea2:after { background-image:var(--g_bg_imagea2)!important; }";
	style_rule += "._btvbgimagea3:after { background-image:var(--g_bg_imagea3)!important; }";
	style_rule += "._btvbgimagea4:after { background-image:var(--g_bg_imagea4)!important; }";
	style_rule += "._btvbgimagea5:after { background-image:var(--g_bg_imagea5)!important; }";
	}
	if (cfg.pseudoAB)
		style_rule += "._btvfontb_:before,._btvfonta_:after { "+f_sizes[1]+"; color: var(--g_beforeafter_color) !important; }";

	css_node.nodeValue += style_rule;

	style_node.appendChild(css_node);

	if ((cfg.customCss && cfg.customCssText) || g_globalCss) {

	let docs = getComputedStyle(document.documentElement);

	if (docs.getPropertyValue('--g_keep_colors')) {
	g_keep_colors = docs.getPropertyValue('--g_keep_colors');
	if (/\b(false|0)\b/i.test(g_keep_colors.trim())) g_keep_colors = false;
	} else {
	g_keep_colors = false;
	}
	if (docs.getPropertyValue('--g_min_colorfulness'))
	g_min_colorfulness = docs.getPropertyValue('--g_min_colorfulness');
	else if (g_keep_colors)
	g_min_colorfulness = 15;
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
	if (/\b(false|0)\b/i.test(g_foot_re.trim())) g_foot_re = false;
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
	g_max_fg_brightness = 256;
	if (docs.getPropertyValue('--g_skip_css')) {
	g_skip_css = docs.getPropertyValue('--g_skip_css');
	} else {
	g_skip_css = false;
	}
	if (docs.getPropertyValue('--g_skip_css_colors')) {
	g_skip_css_colors = docs.getPropertyValue('--g_skip_css_colors');
	if (/\b(false|0)\b/i.test(g_skip_css_colors.trim())) g_skip_css_colors = false;
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
	if (/\b(false|0)\b/i.test(g_svg_bg_white.trim())) g_svg_bg_white = false;
	} else {
	g_svg_bg_white = false;
	}
	if (docs.getPropertyValue('--g_start3_caps')) {
	g_start3_caps = docs.getPropertyValue('--g_start3_caps');
	if (/(fast|faster|line|para)/i.test(g_start3_caps))
		g_start3_caps = g_start3_caps.replaceAll(/[\'\"]/g,'');
	else
		g_start3_caps = 'font-variant-caps:small-caps!important;';
	} else {
	g_start3_caps = '';
	}
	if (docs.getPropertyValue('--g_load_crossorigin')) {
	g_load_crossorigin = docs.getPropertyValue('--g_load_crossorigin');
	if (/\b(false|0)\b/i.test(g_load_crossorigin.trim())) g_load_crossorigin = false;
	g_max_text = parseInt(g_load_crossorigin);
	} else {
	g_load_crossorigin = false;
	g_max_text = 95;
	}
	if (docs.getPropertyValue('--g_speech_language'))
	g_speech_language = docs.getPropertyValue('--g_speech_language');
	else
	g_speech_language = document.documentElement.lang;
	if (docs.getPropertyValue('--g_continue_speech')) {
	g_continue_speech = docs.getPropertyValue('--g_continue_speech');
	if (/\b(false|0)\b/i.test(g_continue_speech.trim())) g_continue_speech = false;
	} else {
	g_continue_speech = false;
	}
	if (docs.getPropertyValue('--g_change_vars')) {
	g_change_vars = docs.getPropertyValue('--g_change_vars');
	if (/\b(false|0)\b/i.test(g_change_vars.trim())) g_change_vars = false;
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
	if (docs.getPropertyValue('--g_btvfont'))
	g_btvfont = docs.getPropertyValue('--g_btvfont');
	else
	g_btvfont = '';
	if (docs.getPropertyValue('--g_tags_to_include'))
	g_tags_to_skip = docs.getPropertyValue('--g_tags_to_include');
	else
	g_tags_to_skip = '';

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
		g_max_fg_brightness = 256;
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
		g_max_text = 95;
		g_btvfont = '';
		g_tags_to_skip = '';
	}

	if (g_tags_to_skip && g_tags_to_skip != undefined) {
		let gtags = 'CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO';
		let farr = [];
		for (let tg of tags_to_skip) {
			if (g_tags_to_skip.indexOf(tg) > -1) {
				let repl = gtags.replaceAll(tg,'');
				gtags = repl;
			} else {
				farr.push(tg);
			}
		}
		tags_to_skip = farr.slice();
		g_tags_to_skip = gtags;
	} else {
		g_tags_to_skip = 'CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO';
	}

	if (g_load_delay > 0) {
		let n = g_load_delay - 100*n_sleep_sec;
		if (n > 0)
			await waitDelay(n);
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
	let basic_colors_to_skip = colors_to_skip.slice();

	let g_white = [
		'rgb(255, 255, 255)',
		'white',
	];

	let g_black = [
		'rgb(0, 0, 0)',
		'black',
	];
	if (cfg.skipBlack)
		colors_to_skip.push(...g_black);

	if (cfg.skipWhites)
		colors_to_skip.push(...g_white);

	let min_imgs = g_continue_speech > 0 ? g_continue_speech : 15;
	let min_lcontent = g_continue_speech ? parseInt(g_continue_speech) % 100 : 3;
	var n_important = 0;
	var n_total = 0;
	var b_imp='', bg_imp='', fg_imp='';
	let b_css_error = false;
	let b_fast = g_start3_caps.indexOf('fast') > -1;
	let b_faster = g_start3_caps.indexOf('faster') > -1;
	orig_font.length = 0;

	var doc = document;
	//m_sty['rgb(255, 255, 255)'] = 'rgb(0, 0, 0)';
	if (g_max_css_rules > 0) {
	let rn = 0;
	let b_sec = false;
	let body_nfz = 16;
	let b_bdone = false;
	let b_skip_css_cond1 = /1998/.test(g_skip_css);
	let b_skip_css_cond2 = b_skip_css_cond1 || /\b(false|0)\b/i.test(g_skip_css);
	let m_ssdone = {};
	let bdy_classid = [];
	let bimp = /imp/.test(g_skip_css) ? 'important' : '';
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
		if (sheet.ownerNode.id == '_btv_') continue;
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
		document.head.insertBefore(s,style_node);
		m_ssdone[sheet.href] = true;
		continue;
		}
		rules = sheet.cssRules;
		} catch (e) {
		console.log('Error : '+e);
		if (g_load_crossorigin && sheet.href && sheet.href.indexOf(window.location.origin) < 0 && m_ssdone[sheet.href] != true) {
		console.log('should not happen');
		m_ssdone[sheet.href] = true;
		b_css_error = true;
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
		var fgr,fgr1,fgarr,imp;
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
		if (/\!\s*?important/.test(value) || bimp)
			imp = 'important';
		else
			imp = '';
		if (/\b(body|html)\b/i.test(key) && b_bdone != true && cfg.threshold > 0 && cfg.size > 0 && rule.style.fontSize) {
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
			if (!cfg.ssrules) {
				rule.style.setProperty('font-size',f2_sizes[nfz],'important');
				m_done[key] = 3;
			}
			b_bdone = true;
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
					n_rulecount++;
					}
				}
		}
		if (cfg.forcePlhdr && cfg.normalInc)
		if (b_skip != true && m_done[key] < 3 && (rule.style.color || (rule.style.backgroundColor || rule.style.background))) {
		if (/\b(BODY|HTML)\b/i.test(key) || bdy_classid.includes(key)) continue;
			m_done[key]++;
			var aaa, bbb;

				function setRuleColor(rule,attr,val,chg_var,im) {
					var fgarr = [],fgr,fgr1 = [],aaa,bbb,ccc,opt_val,attr2,var_match,col,at,colo1;
					col = rule.style.getPropertyValue(attr);
					val = val.trim();
					if (m_sty[val] && m_sty[val] != undefined)
						return [attr,m_sty[val],chg_var];
					var_match = col.indexOf('var\(') > -1 ? col.match(/var\(/g).length : 0;
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
					} else if (var_match > 0 && b_skip_css_cond1) {
					
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
						val = col;
						chg_var++;
					}
					if (chg_var > 1) {
						chg_var = 0;
						attr = attr2;
					}
					} else {
						val = col;
					}
					if (!val || basic_colors_to_skip.includes(val)) return [];
					if (val.substr(0,3).indexOf('rgb') > -1) {
					if (!/\d+/.test(val)) return [];
					fgarr = getRGBarr(val);
					if (!fgarr) return [];
					fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					} else if (val.substr(0,1).indexOf('#') > -1) {
					let b = val.length == 4 ? val+'f' : val+'ff';
					fgarr = hexToRGBA(b);
					fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					} else if (val.substr(0,3).indexOf('hsl') > -1) {
					if (!/\d+/.test(val)) return [];
					let c = getHSLarr(val);
					if (!c) return [];
					fgarr = hslToRGB(c);
					fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					} else if (/^\w+$/.test(val)) {
					var a;
					a = namedColors.get(val);
					if (a && a != undefined) { 
					let b = a.length == 4 ? a+'f' : a+'ff';
					fgarr = hexToRGBA(b);
					fgr1 = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr1[3] = fgarr[3];
					if (cfg.normalInc2) {
						fgr = colorblindFg(fgr1, cfg, false, false, 10);
						fgr1 = getRGBarr(fgr);
					}
					}
					}
					if (attr == false) attr = attr2;
					if (fgr1 && fgr1 != undefined)
					if (fgr1[0] != fgarr[0] || fgr1[1] != fgarr[1] || fgr1[2] != fgarr[2]) {
						if (fgr1[3] == 1) {
							fgr = 'rgb('+fgr1[0]+', '+fgr1[1]+', '+fgr1[2]+')';
						} else {
							fgr = 'rgba('+fgr1[0]+', '+fgr1[1]+', '+fgr1[2]+', '+fgr1[3]+')';
						}
						if (fgarr[3] == 1)
							colo1 = 'rgb('+fgarr[0]+', '+fgarr[1]+', '+fgarr[2]+')';
						else
							colo1 = 'rgba('+fgarr[0]+', '+fgarr[1]+', '+fgarr[2]+', '+fgarr[3]+')';
						m_imp[fgr] = colo1;
						m_sty[colo1] = fgr;
						if (im) n_important++;
						n_total++;
					}
					return [attr,fgr,chg_var];
				}


			if ((b_skip_css_cond2 || cfg.pseudoAB) && !(/\b(CANVAS|EMBED|IMG|OBJECT|SVG|VIDEO)\b/i.test(key) || /(http|url)/i.test(rule.style.backgroundImage+rule.style.src+rule.style.content)))
			if (/\:(after|before|hover|selection)\b/i.test(key)) {
				if (/\:hover/.test(key) && !/\:link/.test(key)) imp = 'important';
				if (rule.style.color && rule.style.color.indexOf('calc\(') < 0) {
					let ret = setRuleColor(rule,'color',rule.style.color,g_change_vars,imp);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_skip_css_colors) {
						skip_this.push(key.replace(/.*\.(\w+)[^\s]+$/g,`$1`));
						skip_this.push(key.replace(/.*#(\w+)[^\s]+$/g,`$1`));
						}
						if (g_change_vars && ret[2]) {
							rule.style.setProperty('color',rule.style.color,imp);
							rule.style.setProperty(ret[0],ret[1],imp);
						} else {
							rule.style.setProperty('color',ret[1],imp);
						}
					}
				}
				if ((rule.style.backgroundColor && rule.style.backgroundColor.indexOf('calc\(') < 0) || (rule.style.background && rule.style.background.indexOf('calc\(') < 0)) {
					var bgattr,bgrule,ret;
					if (!rule.style.backgroundColor) {
					bgattr = 'background';
					bgrule = rule.style.background;
					} else {
					bgattr = 'background-color';
					bgrule = rule.style.backgroundColor;
					}
					ret = setRuleColor(rule,bgattr,bgrule,g_change_vars,imp);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_change_vars && ret[2]) {
							rule.style.setProperty(bgattr,bgrule,imp);
							rule.style.setProperty(ret[0],ret[1],imp);
						} else {
							rule.style.setProperty(bgattr,ret[1],imp);
						}
					}
				}
				if (rule.style.borderColor && !/^(none|0px)$/i.test(rule.style.borderWidth) && rule.style.borderColor.indexOf('calc\(') < 0) {
					let ret = setRuleColor(rule,'border-color',rule.style.borderColor,g_change_vars,imp);
					if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
						if (g_change_vars && ret[2]) {
							rule.style.setProperty('border-color',rule.style.borderColor,imp);
							rule.style.setProperty(ret[0],ret[1],imp);
						} else {
							rule.style.setProperty('border-color',ret[1],imp);
						}
					}
				}
			} else if (b_skip_css_cond2 && !/\:(after|before|hover|selection)\b/i.test(key)) {
			if (rule.style.color && rule.style.color.indexOf('calc\(') < 0) {
			let ret = setRuleColor(rule,'color',rule.style.color,g_change_vars,imp);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_skip_css_colors > 10) {
				skip_this.push(key.replace(/.*\.(\w+)$/g,`$1`));
				skip_this.push(key.replace(/.*#(\w+)$/g,`$1`));
				}
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1],'important');
				}
				rule.style.setProperty('color',ret[1],imp);
			}
			}
			if ((rule.style.backgroundColor && rule.style.backgroundColor.indexOf('calc\(') < 0) || (rule.style.background && rule.style.background.indexOf('calc\(') < 0)) {
			var bgattr,bgrule,ret;
			if (!rule.style.backgroundColor) {
			bgattr = 'background';
			bgrule = rule.style.background;
			} else {
			bgattr = 'background-color';
			bgrule = rule.style.backgroundColor;
			}
			ret = setRuleColor(rule,bgattr,bgrule,g_change_vars,imp);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1],'important');
				rule.style.setProperty(bgattr,ret[1],imp);
				} else {
				rule.style.setProperty(bgattr,ret[1],imp);
				}
			}
			}
			if (rule.style.borderTopColor || rule.style.borderRightColor || rule.style.borderBottomColor || rule.style.borderLeftColor || (rule.style.borderColor && !/^(none|0px)$/i.test(rule.style.borderWidth) && rule.style.borderColor.indexOf('calc\(') < 0)) {
			var bo_arr = [], bog,batt;
			if (!rule.style.borderColor || /(none|undefined)/.test(rule.style.borderColor)) {
			if (rule.style.borderTopColor || rule.style.borderRightColor || rule.style.borderBottomColor || rule.style.borderLeftColor) {
			if (rule.style.borderTopColor && !/^(none|0px)$/i.test(rule.style.borderTopWidth)) bo_arr.push([rule.style.borderTopColor,'border-top-color']);
			if (rule.style.borderLeftColor && !/^(none|0px)$/i.test(rule.style.borderLeftWidth)) bo_arr.push([rule.style.borderLeftColor,'border-left-color']);
			if (rule.style.borderRightColor && !/^(none|0px)$/i.test(rule.style.borderRightWidth)) bo_arr.push([rule.style.borderRightColor,'border-right-color']);
			if (rule.style.borderBottomColor && !/^(none|0px)$/i.test(rule.style.borderBottomWidth)) bo_arr.push([rule.style.borderBottomColor,'border-bottom-color']);
			for ([bog,batt] of bo_arr) {
				let ret = setRuleColor(rule,batt,bog,g_change_vars,imp);
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1],'important');
				rule.style.setProperty(batt,ret[1],imp);
				} else {
				rule.style.setProperty(batt,ret[1],imp);
				}
			}
			}
			} else {
			let ret = setRuleColor(rule,'border-color',rule.style.borderColor,g_change_vars,imp);
			if (ret && ret != undefined && ret[0] != undefined && ret[1] != undefined) {
				if (g_change_vars && ret[2]) {
				rule.style.setProperty(ret[0],ret[1],'important');
				rule.style.setProperty('border-color',ret[1],imp);
				} else {
				rule.style.setProperty('border-color',ret[1],imp);
				}
			}
			}
			}
		}
		}
		if (cfg.forcePlhdr && cfg.forceIInv) {
		if (rule.style.content && !/invert/i.test(rule.style.filter) && /url\(/i.test(rule.style.content))
			rule.style.setProperty('filter','var(--g_filter_invert)',imp);
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
	//if (n_rulecount < 3) n_rulecount = 0;
	} catch (e) { b_css_error = true; }
	} else if (g_skip_css_colors == undefined) {
		g_skip_css_colors = false;
	}

	if ((!cfg.fontFamilyName || !cfg.fontFamily) && !g_btvfont) {
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
		let rul = `*{font-family:var(--g_btvfont)!important;}`;
		if (cfg.fontFamily) {
			document.documentElement.style.setProperty('--g_btvfont',cfg.fontFamilyName);
			g_fntRule = true;
		} else if (!g_btvfont) {
			rul = '';
			document.documentElement.style.setProperty('--g_btvfont','');
			g_fntRule = false;
		}
		style_node.sheet.insertRule(rul, 0);
		css_node.nodeValue += rul;
	}

		if (cfg.forcePlhdr && cfg.normalInc && !/\bemo\b/i.test(g_skip_css)) {
		let ms = null;
		let cmap = [];
		b_noemo = false;
		if (doc.body != null && doc.body.innerText != null)
			ms = doc.body.innerText.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/mgu);
		if (ms) {
			var totemo = '';
			for (let str of ms) { totemo += str; if(!cmap.includes(str)) cmap.push(str); }
			let brepl = totemo;
			if (totemo.replaceAll(/[®©✓✔✕✖✗✘]+/mgu, '').length < 3)
				if (brepl.indexOf('®') > -1 || brepl.indexOf('©') > -1)
					b_noemo = true;
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
					if (!g_continue_speech)
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
				if (g_tags_to_skip.indexOf(targ.nodeName.toUpperCase()) < 0 && !/(http|url)/i.test(gcs.backgroundImage+gcs.content+gcs.src))
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
		b_opa = false;

		var nn_style, nn_reg;
		var n_inv = 0;
		var bdy_attr = '', bdy_val = '', bdy_ix;
		let n_bgimagea = 0, n_bgimageb = 0;

		if (!cfg.forcePlhdr && cfg.advDimming){
			nn_style = ';filter:revert;';
			nn_reg = /revert/g;
		} else if (cfg.forcePlhdr && cfg.forceIInv) {
			nn_style = ';filter:invert(1);';
			nn_reg = /invert/g;
		} else {
			nn_style = '';
			nn_reg = /\<\&\%/;
		}

		let node_count = 0;
		if (cfg.forceIInv && cfg.forcePlhdr) {
		let gcs = getComputedStyle(document.body);
		bdy_ix = -1;
		b_iimg[-1] = await isImage(document.body, -1, img_area, gcs, b_imgforce);
		if (!b_iimg[-1]) {
			gcs = getComputedStyle(document.documentElement);
			b_iimg[-2] = await isImage(document.documentElement, -2, img_area, gcs, b_imgforce);
			if (b_iimg[-2]) bdy_ix = -2;
		}
		}
		if (mutation) node_count = parseInt(1000*Date.now());

		function getShadow(attr,style) {
			let gs = style.getPropertyValue(attr);
			let cos = gs.split(/rgba?\(/g);
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
			b_chk[nc] = n.children.length;
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
			if (tags_to_skip.includes(t) || (cfg.skipHeadings && hdr_tags.includes(t))) {
				nodes_to_skip.push(n);
				nodes_to_skip.push(...Array.from(n.getElementsByTagName('*')));
			}
			let tn = n.textContent || n.nodeValue || n.value;
			if (tn && tn != undefined && tn.trim)
				b_ctext[nc] = tn.trim().length;
			else
				b_ctext[nc] = 0;

			let gcs = getComputedStyle(n);
			if (orig_font[nc] == undefined) orig_font[nc] = gcs.fontSize;
//			if (gcs.color && !/(none|undefined)/.test(gcs.color)) orig_colors[nc] = [gcs.color,gcs.backgroundColor||gcs.background,gcs.borderTopColor||gcs.borderRightColor||gcs.borderBottomColor||gcs.borderLeftColor,gcs.borderWidth];
			if (g_tags_to_skip.indexOf(t) > -1 || /(http|url)/i.test(gcs.backgroundImage+gcs.content+gcs.src)) {
				let x = img_dat.get(t+gcs.backgroundImage+gcs.content+gcs.src);
				if (x && x != undefined) {
					[ b_iimg[nc], img_area[nc], b_imgforce[nc] ] = x;
				} else {
					b_iimg[nc] = await isImage(n, nc, img_area, gcs, b_imgforce);
					img_dat.set(t+gcs.backgroundImage+gcs.content+gcs.src, [ b_iimg[nc],img_area[nc],b_imgforce[nc] ]);
				}
			} else {
				b_iimg[nc] = false;
			}
			if (cfg.pseudoAB) {
			if (cfg.forcePlhdr && cfg.forceIInv) {
			let gcsa = getComputedStyle(n,':before');
			if (/(http|url)/i.test(gcsa.backgroundImage+gcsa.content)) {
				var im;
				if (/(http|url)/i.test(gcsa.backgroundImage))
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
			if (/(http|url)/i.test(gcsa.backgroundImage+gcsa.content)) {
				var im;
				if (/(http|url)/i.test(gcsa.backgroundImage))
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
			if (gcsa.content && gcsa.content != undefined && gcsa.content != 'none' && !b_iimg[nc] && gcsa.content.length > min_lcontent && gcsa.fontSize && gcsa.fontSize.indexOf('px') > -1)
				if (cfg.threshold > parseInt(gcsa.fontSize))
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvfontb_ ');
					else
						n.setAttribute('class', ' _btvfontb_ ');
			gcsa = getComputedStyle(n,':after');
			if (gcsa.content && gcsa.content != undefined && gcsa.content != 'none' && !b_iimg[nc] && gcsa.content.length > min_lcontent && gcsa.fontSize && gcsa.fontSize.indexOf('px') > -1)
				if (cfg.threshold > parseInt(gcsa.fontSize))
					if (n.className && n.className != undefined)
						n.setAttribute('class', n.className+ ' _btvfonta_ ');
					else
						n.setAttribute('class', ' _btvfonta_ ');
			}
			if (b_iimg[nc]) {
				images.push(n);
				let img_children = Array.from(n.getElementsByTagName('*'));
				if (img_area[nc] >= 0 && img_area[nc] < 99000000)
					n_imgcount++;
				if (n.parentElement && map.get(n.parentElement) > 0 && b_iimg[map.get(n.parentElement)])
					b_chimg[map.get(n.parentElement)] = true;
			}
			if (mutation)
			if (cfg.forcePlhdr && cfg.forceIInv) {
				let ps = parentStyle(n,/invert/g,nodes_behind_inv);
				if (ps) nodes_behind_inv.push(...Array.from(n.getElementsByTagName('*')));
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
			var gcs;
			for (n of t) {
				gcs = getComputedStyle(n);
				if (parseInt(gcs.height) == 0 || parseInt(gcs.width) == 0) continue;
				let c = topNode(n);
				if (c < tc) {
					bcol = gcs.backgroundColor;
					tc = c;
					tn = n;
				}
			}
			if (!/(body|html)/i.test(tn.nodeName)) {
				ftr_done = true;
				tn.style.setProperty('filter','var(--g_filter_invert)');
				footr = tn;
			}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if ((/footer/i.test(n.className) || /footer/i.test(n.id)) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			var gcs;
			for (n of t) {
				gcs = getComputedStyle(n);
				if (parseInt(gcs.height) == 0 || parseInt(gcs.width) == 0) continue;
				let c = topNode(n);
				if (c < tc) {
					bcol = gcs.backgroundColor;
					tc = c;
					tn = n;
				}
			}
			if (!/(body|html)/i.test(tn.nodeName)) {
				ftr_done = true;
				tn.style.setProperty('filter','var(--g_filter_invert)');
				footr = tn;
			}
		}
		}
		if (!ftr_done) {
		t = [];
		for (n of nodes) {
		if ((/foot/i.test(n.id) || /foot/i.test(n.className)) && n.getBoundingClientRect().bottom > dh*0.98) t.push(n);
		}
		if (t.length > 0) {
			let tc = 111111;
			let tn = n;
			var gcs;
			for (n of t) {
				gcs = getComputedStyle(n);
				if (parseInt(gcs.height) == 0 || parseInt(gcs.width) == 0) continue;
				let c = topNode(n);
				if (c < tc) {
					bcol = gcs.backgroundColor;
					tc = c;
					tn = n;
				}
			}
			if (!/(body|html)/i.test(tn.nodeName)) {
				ftr_done = true;
				tn.style.setProperty('filter','var(--g_filter_invert)');
				footr = tn;
			}
		}
		}
		if (footr) {
			if (bcol)
			if (/(0, 0, 0, 0|transparent)/.test(bcol)) {
				if (!b_iimg[-1])
					b_iimg[-2] = await isImage(document.documentElement, -1, img_area, gcs, b_imgforce);
				if (!b_iimg[-1] && !b_iimg[-2]) {
				if (finalLightness > 0.5 && !cfg.advDimming)
					footr.style.setProperty('background-color','white','important');
				}
			} else if (!/(0, 0, 0, 0|none|transparent|undefined)/.test(bcol)) {
				if (!g_keep_colors && m_imp[bcol] != undefined && (n_total > 0 || (!n_total && (b_css_error || g_skip_css || !g_max_css_rules)))) {
				bcol = getRGBarr(bcol);
				bcol = applyColorMatrix([ 255-bcol[0], 255-bcol[1], 255-bcol[2] ]);
				if (bcol[3] == undefined) bcol[3] = 1;
				footr.style.setProperty('background-color','rgba('+bcol+')','important');
				}
			}
			//footr.style.setProperty('height', 'auto','important');
		}
		}
		if (node == undefined || node == null)
			node = document.body;

		if (!(node == undefined || node == null)) {
		let pnode = document.documentElement;
		if (!(pnode == undefined || pnode == null)) {

		if (/imp/.test(g_skip_css) || !n_total || (n_total > 0 && parseFloat(n_important/n_total) > 0.1))
			b_imp = bg_imp = fg_imp = 'important';
		node_count = map.get(node);
		let tag = node.nodeName.toUpperCase();

			var htm;
			htm = pnode;
			if (htm.style.getPropertyValue('filter').indexOf('invert') < 0)
				htm.style.setProperty('filter','var(--g_filter_invert)','important');
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
					hdrs = nodes;
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
			if (g_svg_bg_white)
				if (/SVG/i.test(img.nodeName) && /dontinvert/i.test(g_svg_bg_white)) {
					img.style.setProperty('filter','unset');
					continue;
				}
			let sects = Array.from(img.getElementsByTagName('SECTION'));
			let arts =  Array.from(img.getElementsByTagName('ARTICLE'));
			if (sects.length > 2 || arts.length > 2 || img == footr) continue;
			let p_s = parentStyle(img,/invert/g,nodes_behind_inv);
			if (p_s) {
				img.style.setProperty('filter','unset');
				continue;
			}
			n_c = map.get(img);
			let cst = getComputedStyle(img);
			if (cst.filter != 'unset' && /^(INPUT|SELECT|TEXT|TEXTAREA)$/i.test(img.nodeName) && g_okinput.test(img.type)) {
				img.style.setProperty('filter','unset');
				continue;
			}
			let bgim = cst.backgroundImage;
			if (!bgim || bgim == 'none')
				bgim = '';
			let imsrc = img.src ? img.src : '';
			if (!imsrc || imsrc == 'none')
				imsrc = '';
			let cosrc = '';
			if (g_tags_to_skip.indexOf(img.nodeName.toUpperCase()) < 0 && !bgim && !imsrc)
				if (!/(http|url)/i.test(cst.content)) {
				b_iimg[n_c] = false; continue;
				} else {
				cosrc = cst.content;
				}
			let bgsrco = bgim+imsrc+cosrc;
			if (!b_imgforce[n_c] || b_ctext[n_c] > g_max_text)
			if (g_tags_to_skip.indexOf(img.nodeName.toUpperCase()) < 0)
			if (!/(background.*page|banner|page.*background|slide)/ig.test(img.className) && (!/(http|url)/ig.test(bgsrco) || (b_ctext[n_c] > g_max_text && !b_imgforce[n_c])) || (((img_area[n_c] > 0 && img_area[n_c] < g_min_image_size && img.textContent.indexOf(' ') > -1 && !/button/i.test(img.className)) || /nav/i.test(img.className)) && !b_imgforce[n_c] && img_area[n_c] < g_min_image_size && img_area[n_c] > 0)) {
				if (!(hdr && hdr.contains(img))) {
				img.style.setProperty('filter','unset');
				continue;
				}
			} else if (b_ctext[n_c] > g_max_text && (img_area[n_c] <= 50000 || !b_imgforce[n_c])) {
				img.style.setProperty('filter','unset');
				continue;
			}
			let isty = img.style.getPropertyValue('filter');
			var pisty = '';
			if (img.parentElement && img.parentElement.style) pisty = img.parentElement.style.getPropertyValue('filter');
			if (pisty == undefined || pisty == null) pisty = '';
			if (isty == undefined || isty == null) isty = '';
			let bnav = false;
			let pch = img;
			if (cfg.skipNavSection && hdr != null && hdr.contains(img)) {
				bnav = true;
			} else if (cfg.skipNavSection) {
			while (pch != null && pch != undefined && !/^body$/i.test(pch.nodeName)) {
				if (pch && /^(HEADER|NAV)$/i.test(pch.nodeName)) {
					if (/^nav$/i.test(pch.nodeName) || (/^header$/i.test(pch.nodeName) && n_hdrs < 5)) {
					bnav = true;
					break;
					}
				}
				pch = pch.parentElement;
			}
			}
			if (bnav) {
				img.style.setProperty('filter','unset');
				continue;
			}
			if (g_svg_bg_white)
			if (/(\.png|png$|png|\.svg|svg$|svg)/ig.test(bgsrco) || /SVG/i.test(img.nodeName)) {
				if (/dontinvert/i.test(g_svg_bg_white)) {
					img.style.setProperty('filter','unset');
					continue;
				}
				img.style.setProperty('background-color','#fff','important');
			}
			if (!nn_reg.test(isty) && !nn_reg.test(pisty) && !p_s && (!containsImage(img, images) || b_imgforce[n_c] || ((!b_chimg[n_c] && hdr != null && hdr.contains(img)) || /image/i.test(img.type) || bgsrco || b_chimg[n_c])))
				if (!(/^(UL|OL)/i.test(img.nodeName) && img.childNodes.length < 4)) {
					if (g_max_text % 2 == 0 && b_ctext[n_c] > 0 && b_ctext[n_c] < g_max_text) {
						let cncopy = [];
						for (let cn of img.childNodes) {
							if (cn.nodeType == Node.TEXT_NODE) {
								let sp = document.createElement('span');
								sp.textContent = cn.textContent;
								sp.style.setProperty('filter','invert(1)');
								cncopy.push(sp);
								continue;
							}
							cncopy.push(cn);
						}
						img.textContent = '';
						for (let cn of cncopy) {
							img.appendChild(cn);
						}
					}
					img.style.setProperty('filter','var(--g_filter_invert)');
					let chldn = Array.from(img.getElementsByTagName('*'));
					nodes_behind_inv.push(...chldn);
					n_inv++;
				}
			}
			//hdrs.length = 0;
			}
			b_html = true;
		}
		if (cfg.forceOpacity && !b_opa && g_skiplinks_nstart3) {
			b_opa = true;
			bdy_attr = 'background';
			bdy_val = '#fff';
			if (g_anegative != true) {
				let gcs = getComputedStyle(node);
				await getBgImage(node, gcs, gcs.backgroundImage);
			}
		} else if (!b_opa) {
			var gcs;
			b_opa = true;
			if (bdy_ix == -1)
				node = document.body;
			else
				node = document.documentElement;
			gcs = getComputedStyle(node);
			if (g_anegative != true)
				await getBgImage(node, gcs, gcs.backgroundImage);
			if (/gradient/i.test(gcs.backgroundImage)) {
				bdy_attr = 'background';
				bdy_val = getGradient(gcs);
			} else if (img_area[bdy_ix] != undefined && img_area[bdy_ix] > g_min_image_size*100 && gcs.backgroundImage && gcs.backgroundImage != undefined && gcs.backgroundImage != 'none') {
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

		b_dim = {};
		node_count = save_nc;
		node = nodes[node_count];
		toset_colors.length = 0;

		let setAttribs = node => {

			let tag = String(node.nodeName.toUpperCase());
			let pnode = node.parentElement;
			let sk = false;
			let is_einput = /\b(INPUT|SELECT|TEXT|TEXTAREA)\b/.test(tag);
			var style, is_oinput, is_xinput;

			//if (tags_to_skip.includes(tag) || nodes_to_skip.includes(node) || (cfg.skipHeadings && hdr_tags.includes(tag))) return;
			if (nodes_to_skip.includes(node)) return;

			if (/I?FRAME\b/i.test(tag)) {
				let fsty = node.style.getPropertyValue('filter');
				if (fsty == null) fsty = '';
				if (!/invert/g.test(fsty) && cfg.forcePlhdr)
					node.style.setProperty('filter','var(--g_filter_invert)','important');
				return;
			}

			node_count = map.get(node);
			toset_colors[node_count] = [];

			if (is_einput) {
				is_xinput = node.type && g_nokinput.test(node.type);
				is_oinput = node.type && g_okinput.test(node.type);
			}

			if (is_einput && is_oinput)
			if (cfg.input_border && !node.getAttribute('b__'))
				if (!g_skiplinks_nstart3)
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

			if (cfg.forceOpacity) {
			let col_arr = getRGBarr(style.color);
			if (col_arr[3] > 0 && col_arr[3] < 1) {
				col_arr[3] = 1;
				let c = 'rgba('+col_arr+')';
				node.style.setProperty('color',c,'important');
			}
			if (parseFloat(style.opacity) > 0 && parseFloat(style.opacity) < 1)
				node.style.setProperty('opacity','1','important');
			}

			let g_n_inv = false;
			let skip_contrast = false;
			let ftr = false;
			let nimp = false;
			let s_b = false;
			if (cfg.normalInc && cfg.forcePlhdr) {
			g_n_inv = nodes_behind_inv.includes(node);
			ftr = g_foot_re && footr && footr.contains(node);
			if (g_foot_re)
				g_n_inv = g_n_inv || ftr;
			if (g_skip_css_colors)
			if (node.id && skip_this.includes(node.id)) {
				nimp = true;
				if (g_skip_css_colors > 99) skip_contrast = true;
			} else {
				let cns = node.className.toString().split(' ');
				let idx = skip_this.findIndex(o => o == cns[0]) || skip_this.findIndex(o => o == cns[1]) || skip_this.findIndex(o => o == cns[2]) || skip_this.findIndex(o => o == cns[3]) || skip_this.findIndex(o => o == cns[4]);
				if (idx > -1) {
				nimp = true;
				if (g_skip_css_colors > 99) skip_contrast = true;
				}
			}

			if (style.textShadow && !/(none|undefined)/.test(style.textShadow)) {
				let gs2 = getShadow('text-shadow',style);
				node.style.setProperty('text-shadow',gs2,'important');
			}
			if (skip_colors_nodes.includes(node)) {
				skip_contrast = true;
				if (skip_colors_top_nodes.includes(node)) {
					node.style.setProperty('filter','var(--g_filter_invert)');
					if (cfg.forceIInv) 
					for (let im of images) {
						if (im && node.contains(im) && im != node)
							im.style.setProperty('filter','unset');
					}
				} else if (!nodes_behind_inv.includes(node)) {
					nodes_behind_inv.push(node);
				}
			} else if (!nimp && !ftr && (((b_chk[node_count] > 0 || b_ctext[node_count] > 0) && b_faster) || !b_faster) && (!b_iimg[node_count] || style.filter.indexOf('invert') < 0) && !g_n_inv) {
				if (style.boxShadow && !/(none|undefined)/.test(style.boxShadow)) {
					let gs2 = getShadow('box-shadow',style);
					node.style.setProperty('box-shadow',gs2,'important');
				}
				if (cfg.doGradients) {
					var gs2,fgarr,fgr,bg_attr;
					let b_gd = 0;
					let gcsa = style;
					if (gcsa && gcsa != undefined && /gradient/.test(gcsa.backgroundImage)) {
						gs2 = getGradient(gcsa);
						toset_colors[node_count][3] = [gs2,'important'];
						b_cdone[node_count] = true;
						fgarr = getRGBarr(gcsa.backgroundColor);
						fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						toset_colors[node_count][1] = ['rgba('+fgr+')','important'];
					}
					gcsa = getComputedStyle(node,':before');
					if (!b_gd && gcsa && gcsa != undefined && /gradient/.test(gcsa.backgroundImage)) {
						gs2 = getGradient(gcsa);
						b_cdone[node_count] = true;
						let str1 = '--g_bg_imageb'+n_bgimageb;
						let str2 = ' _btvbgimageb'+n_bgimageb;
						root_n_style.setProperty(str1,gs2);
						if (node.className && node.className != undefined)
							node.setAttribute('class', node.className+ str2);
						else
							node.setAttribute('class', str2);
						b_gd = 1;
						fgarr = getRGBarr(gcsa.backgroundColor);
						fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						toset_colors[node_count][1] = ['rgba('+fgr+')','important'];
					}
					gcsa = getComputedStyle(node,':after');
					if (!b_gd && gcsa && gcsa != undefined && /gradient/.test(gcsa.backgroundImage)) {
						gs2 = getGradient(gcsa);
						b_cdone[node_count] = true;
						let str1 = '--g_bg_imagea'+n_bgimagea;
						let str2 = ' _btvbgimagea'+n_bgimagea;
						root_n_style.setProperty(str1,gs2);
						if (node.className && node.className != undefined)
							node.setAttribute('class', node.className+ str2);
						else
							node.setAttribute('class', str2);
						b_gd = 2;
						fgarr = getRGBarr(gcsa.backgroundColor);
						fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						toset_colors[node_count][1] = ['rgba('+fgr+')','important'];
					}
					if (b_gd)
						if (b_gd == 1)
							n_bgimageb++;
						else
							n_bgimagea++;
				}
				var cs,pcs;
				let err = false;
				try {
				cs = style;
				pcs = getComputedStyle(pnode);
				} catch (e) { err = true; }
				if (!err || (err && node.shadowRoot)) {
				var fg,fg2,bg,bg2,bog,bog2;
				if (node.shadowRoot) {
				fg = cs.color.indexOf('rgb') < 0 ? '' : cs.color;
				bg = cs.backgroundColor.indexOf('rgb') < 0 ? '' : cs.backgroundColor;
				bog = cs.borderTopColor || cs.borderRightColor || cs.borderBottomColor || cs.borderLeftColor;
				bog = /^(none|0px)$/i.test(cs.borderWidth) ? '' : bog;
				} else {
				fg = cs.color.indexOf('rgb') < 0 ? '' : cs.color;
				fg2 = pcs.color.indexOf('rgb') < 0 ? '' : pcs.color;
				bg = cs.backgroundColor.indexOf('rgb') < 0 ? '' : cs.backgroundColor;
				bg2 = pcs.backgroundColor.indexOf('rgb') < 0 ? '' : pcs.backgroundColor;
				bog = cs.borderTopColor || cs.borderRightColor || cs.borderBottomColor || cs.borderLeftColor;
				bog = /^(none|0px)$/i.test(cs.borderWidth) ? '' : bog;
				bog2 = pcs.borderTopColor || pcs.borderRightColor || pcs.borderBottomColor || pcs.borderLeftColor;
				bog2 = /^(none|0px)$/i.test(pcs.borderWidth) ? '' : bog2;
				}
				var fgbrt, bgbrt, fgp = false, bgp = false, bogp = false;
				var bfg = null,bbg = null,bbog = null;
				let nsty = node.getAttribute('style');
				if (nsty) {
					bfg = nsty.indexOf('color') > -1 && nsty.indexOf('-color') < 0;
					bbog = nsty.indexOf('border') > -1;
					bbg = nsty.indexOf('background') > -1;
				}
				if (fg == fg2 && bg == bg2 && bog == bog2 && ((b_ctext[node_count] == b_ctext[map.get(pnode)] && !b_fast) || b_fast) && cs.backgroundImage.indexOf('gradient') < 0 && pcs.backgroundImage.indexOf('gradient') < 0) {
				} else {
				if (fg && (bfg || m_imp[fg] == undefined)) {
					let fgarr = getRGBarr(fg);
					let fgarr2 = fg2 ? getRGBarr(fg2) : [];
					let fgr = [];
					if (!((cfg.skipWhites && g_white.includes(fg)) || (cfg.skipBlack && g_black.includes(fg)))) {
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2]) {
					if (m_sty[fg] == undefined || g_keep_colors || (m_sty[fg] != undefined && fg != m_sty[fg])) {
					bgbrt = calcBrightness(fgarr);
					if (bgbrt < g_max_fg_brightness) {
					if (m_sty[fg] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = getRGBarr(m_sty[fg]);
						if (fg != m_sty[fg]) {
						fgr[3] = fgarr[3];
						toset_colors[node_count][0] = ['rgba('+fgr+')',fg_imp];
						fgp = true;
						m_fcol.set(node, fgarr);
						}
					} else if (m_sty[fg] == undefined) {
					fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					fgbrt = calcBrightness(fgr);
					if (fgbrt >= 0) {
						m_fcol.set(node, fgarr);
						toset_colors[node_count][0] = ['rgba('+fgr+')',fg_imp];
						fgp = true;
						//m_imp[m_sty[fg]] = fg;
					}
					}
					}
					} else {
					fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					m_fcol.set(node, fgarr);
					toset_colors[node_count][0] = ['rgba('+fgr+')',fg_imp];
					fgp = true;
					}
					}
					}
					} else if (m_sty[fg] == undefined) {
					if (g_black.includes(fg) && (cfg.skipBlack || !cfg.skipWhites))
						fgr = [ 255, 255, 255, 1 ];
					else if (g_white.includes(fg) && (cfg.skipWhites || !cfg.skipBlack))
						fgr = [ 0, 0, 0, 1 ];
					m_fcol.set(node, fgarr);
					toset_colors[node_count][0] = ['rgba('+fgr+')',fg_imp];
					fgp = true;
					s_b = true;
					}
					if (!s_b && fgp && g_keep_colors && m_sty[fg] == undefined) {
					fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					if (calcColorfulness(fgr) > g_min_colorfulness) {
						m_fcol.set(node, fgr);
						toset_colors[node_count][0] = ['rgba('+fgr+')',fg_imp];
					}
					}
				}
				if (bog && (bbog || m_imp[bog] == undefined)) {
					let bo_arr = [];
					if (cs.borderColor == cs.borderLeftColor && cs.borderColor == cs.borderRightColor && cs.borderColor == cs.borderTopColor && cs.borderColor == cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderWidth)) {
					bo_arr.push([4,cs.borderColor]);
					} else {
					if (cs.borderTopColor && !/^(none|0px)$/i.test(cs.borderTopWidth)) bo_arr.push([5,cs.borderTopColor]);
					if (cs.borderLeftColor && !/^(none|0px)$/i.test(cs.borderLeftWidth)) bo_arr.push([7,cs.borderLeftColor]);
					if (cs.borderRightColor && !/^(none|0px)$/i.test(cs.borderRightWidth)) bo_arr.push([8,cs.borderRightColor]);
					if (cs.borderBottomColor && !/^(none|0px)$/i.test(cs.borderBottomWidth)) bo_arr.push([6,cs.borderBottomColor]);
					}
					let fgr = [], fgarr = [],idx;
					for ([idx,bog] of bo_arr) {
					let fgarr2 = bog2 ? getRGBarr(bog2) : [];
					fgarr = getRGBarr(bog);
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[bog] == undefined || g_keep_colors || (m_sty[bog] != undefined && bog != m_sty[bog])) {
					let cf = calcColorfulness(fgarr);
					if (cf < g_max_border) {
					if (m_sty[bog] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = getRGBarr(m_sty[bog]);
						if (bog != m_sty[bog]) {
						fgr[3] = fgarr[3];
						m_bocol.set(node, fgarr);
						bogp = true;
						}
					} else if (m_sty[bog] == undefined) {
						fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
						fgr[3] = fgarr[3];
						if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
						m_bocol.set(node, fgarr);
						bogp = true;
						}
						//m_imp[m_sty[bog]] = bog;
					}
					} else if (bbog || m_imp[bog] == undefined) {
						fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					}
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt >= 0 && (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2] || fgr[3] != fgarr[3])) {
						m_bocol.set(node, fgarr);
						bogp = true;
						toset_colors[node_count][idx] = ['rgba('+fgr+')',b_imp];
					}
					}
					}
					}
					if (bogp && g_keep_colors && m_sty[bog] == undefined) {
					fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					if (calcColorfulness(fgr) > g_min_colorfulness) {
						m_bocol.set(node, fgr);
						toset_colors[node_count][4] = ['rgba('+fgr+')',b_imp];
					}
					}
				}
				if (bg && (bbg || m_imp[bg] == undefined) && (!/(\(0\, 0\, 0\, 0\)|transparent)/i.test(bg) && style.backgroundImage.indexOf('gradient') < 0)) {
					let bg_attr = 2;
					let fgr = [], fgarr = [];
					if (style.backgroundImage && style.backgroundImage != undefined && !/(gradient|none)/i.test(style.backgroundImage)) bg_attr = 1;
					/**
					if (cfg.doGradients && style.backgroundImage.indexOf('gradient') > -1) {
					if (b_cdone[node_count] != true) {
						let gs2 = getGradient(style);
						toset_colors[node_count][3] = [gs2,'important']; //node.style.setProperty('background-image',gs2,'important');
						if (!fgp) {
						fgarr = getRGBarr(fg);
						fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						toset_colors[node_count][0] = ['rgba('+fgr+')','important']; //node.style.setProperty('color','rgba('+fgr+')','important');
						}
						fgarr = getRGBarr(bg);
						fgr = [ 255-fgarr[0],255-fgarr[1],255-fgarr[2],fgarr[3] ];
						toset_colors[node_count][1] = ['rgba('+fgr+')','important']; //node.style.setProperty('background-color','rgba('+fgr+')','important');
						skip_contrast = true;
						b_cdone[node_count] = true;
					}
					} else {*/
					let fgarr2 = bg2 ? getRGBarr(bg2) : [];
					fgarr = getRGBarr(bg);
					if (fgarr[0] != 255-fgarr2[0] || fgarr[1] != 255-fgarr2[1] || fgarr[2] != 255-fgarr2[2])
					if (m_sty[bg] == undefined || (m_sty[bg] != undefined && bg != m_sty[bg])) {
					let cf = calcColorfulness(fgarr);
					bgbrt = calcBrightness(fgarr);
					if (cf < g_min_colorfulness || bgbrt > g_min_bg_brightness) {
					if (m_sty[bg] != undefined || (b_idone[fgarr] != undefined && cfg.normalInc2)) {
						if (cfg.normalInc2 && b_idone[fgarr] != undefined)
							fgr = b_idone[fgarr];
						else
							fgr = getRGBarr(m_sty[bg]);
						if (bg != m_sty[bg]) {
						fgr[3] = fgarr[3];
						toset_colors[node_count][bg_attr] = ['rgba('+fgr+')',bg_imp];
						bgp = true;
						m_bcol.set(node, fgarr);
						}
					} else if (m_sty[bg] == undefined) {
					fgr = applyColorMatrix([255-fgarr[0], 255-fgarr[1], 255-fgarr[2]]);
					fgr[3] = fgarr[3];
					if (fgr[0] != fgarr[0] || fgr[1] != fgarr[1] || fgr[2] != fgarr[2]) {
					bgbrt = calcBrightness(fgr);
					if (bgbrt > 0) {
						m_bcol.set(node, fgarr);
						toset_colors[node_count][bg_attr] = ['rgba('+fgr+')',bg_imp];
						bgp = true;
						//m_imp[m_sty[bg]] = bg;
					}
					}
					}
					} else {
					fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					bgbrt = calcBrightness(fgr);
					m_bcol.set(node, fgarr);
					toset_colors[node_count][bg_attr] = ['rgba('+fgr+')',bg_imp];
					bgp = true;
					}
					}
					if (g_keep_colors && (bgp || m_sty[bg] != undefined)) {
					fgr = [ 255-fgarr[0], 255-fgarr[1], 255-fgarr[2], fgarr[3] ];
					if (calcColorfulness(fgr) > g_min_colorfulness) {
						m_bcol.set(node, fgr);
						toset_colors[node_count][2] = ['rgba('+fgr+')',bg_imp];
					}
					}
				}
				}
			}
			}
			}

			if (!is_einput)
			if ((b_chk[node_count] == 1 && b_ctext[node_count] <= b_ctext[map.get(node.firstElementChild)]) || (b_chk[node_count] > 1 && b_ctext[node_count] <= b_ctext[map.get(node.firstElementChild)]+b_ctext[map.get(node.lastElementChild)]))
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
						if (isNaN(nw) || nw/parseInt(window.innerWidth) < 0.6 || nw/parseInt(window.innerWidth) > 0.95) {
							nwidth = '';
						} else {
							nwidth = ';width: calc( ' + sw + ' + ' + cfg.size + '% );';
							if (pnode != null && pnode.getBoundingClientRect && node.firstElementChild != null) {
								if (node.firstElementChild.getBoundingClientRect().left - pnode.getBoundingClientRect().left > 180)
									nwidth = nwidth + 'margin-left:-'+cfg.size/2+'%;';
							}
						}
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
			if (cfg.threshold > 0 && cfg.size > 0 && (!b_iimg[node_count] || b_ctext[node_count] > 0)) {
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
					if (cfg.advDimming)
						if (!nn_reg.test(nsty) || cfg.ssrules)
							node.style.setProperty('filter',str_style,'important');
					} else if (nn_reg.test(nsty) && cfg.advDimming && cfg.ssrules) {
						nsty += 'filter:'+str_style+'!important;';
						node.setAttribute('style',nsty);
						nsty = node.getAttribute('style');
						if (nsty == null) nsty = '';
					}
				}
			}

			if (cfg.threshold > 0 && (!b_iimg[node_count] || b_ctext[node_count] > 0 || (is_einput && is_oinput))) {
				let nsty = node.getAttribute('style');
				if (nsty == null) nsty = '';
				if (cfg.normalInc2 && skip_contrast != true)
				if (style.color || style.backgroundColor || style.borderColor) {
					var pcol, ocol, cola;
					if (style.color && !colors_to_skip.includes(style.color)) {
					let col = getRGBarr(style.color);
					col = [parseInt(col[0]), parseInt(col[1]), parseInt(col[2]), parseInt(col[3])];
					let cful = calcColorfulness(col);
					ocol = col;
					pcol = '';
					if (b_idone[ocol] == undefined && col && cful > 34) {
						pcol = colorblindFg(col, cfg, g_n_inv, /invert/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						toset_colors[node_count][0] = [pcol,'important']; //node.style.setProperty('color', pcol,'important');
					}
					}
					if (style.backgroundColor && !colors_to_skip.includes(style.backgroundColor)) {
					let col = getRGBarr(style.backgroundColor);
					col = [parseInt(col[0]), parseInt(col[1]), parseInt(col[2]), parseInt(col[3])];
					let cful = calcColorfulness(col);
					ocol = col;
					pcol = '';
					if (b_idone[ocol] == undefined && col && cful > 34) {
						pcol = colorblindBg(col, cfg, g_n_inv, /invert/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1 && pcol != style.color) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						toset_colors[node_count][1] = [pcol,'important']; //node.style.setProperty('background-color', pcol,'important');
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
						pcol = colorblindFg(col, cfg, g_n_inv, /invert/g.test(style.filter), n_inv);
						cola = getRGBarr(pcol);
					} else if (b_idone[ocol] != undefined && col && cful > 34) {
						cola = b_idone[ocol];
						pcol = 'rgba('+cola+')';
					}
					if (pcol.substr(0,4).indexOf('rgba') > -1) {
						b_idone[ocol] = cola;
						b_idone[cola] = cola;
						if (bog == style.borderColor)
							toset_colors[node_count][4] = [pcol,'important']; //node.style.setProperty('border-color',pcol,'important');
						else if (bog == style.borderTopColor)
							toset_colors[node_count][5] = [pcol,'important']; //node.style.setProperty('border-top-color',pcol,'important');
						else if (bog == style.borderBottomColor)
							toset_colors[node_count][6] = [pcol,'important']; //node.style.setProperty('border-bottom-color',pcol,'important');
						else if (bog == style.borderLeftColor)
							toset_colors[node_count][7] = [pcol,'important']; //node.style.setProperty('border-left-color',pcol,'important');
						else if (bog == style.borderRightColor)
							toset_colors[node_count][8] = [pcol,'important']; //node.style.setProperty('border-right-color',pcol,'important');
					}
					}
				}
				if (!cfg.skipHeights && !node.hasAttribute('s__') && (b_ctext[node_count] > 2 || (node.type && is_oinput)) && (b_chk[node_count] < g_max_child || (cfg.start3 && node.hasAttribute(focalAnchors.attrNameContainer) && b_chk[node_count] < g_max_child*12)))
					node.setAttribute('h__', 1);
				/**if (cfg.makeCaps) {
					if (g_eng)
						node.style.setProperty('font-variant-caps', 'small-caps');
					else
						node.style.setProperty('text-transform', 'uppercase');
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
				}*/

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
					if (!(cfg.input_border && g_skiplinks_nstart3))
					if ((node.value || tag == 'SELECT') && style.getPropertyValue('width') && cfg.size > 0 && cfg.threshold > 0) {
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
					if (!node.disabled && (!toset_colors[node_count][0] || toset_colors[node_count][0] == undefined) && (is_einput || is_oinput)) {
					let txtcolor = style.color;
					if (txtcolor == null || txtcolor.length < 1) txtcolor = 'rgb(0,0,0)';
					let txt_brt = calcBrightness(getRGBarr(txtcolor));
					let bg_color = style.backgroundColor;
					var lgn;
					if (/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
						bg_color = getBgColor(node);
					var bg_brt = 176;
					if (!/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
						bg_brt = calcBrightness(getRGBarr(bg_color));
					if (txt_brt > bg_brt)
						txtcolor = 'rgb(255, 255, 255)';
					else
						txtcolor = 'rgb(0, 0, 0)';
					toset_colors[node_count][0] = [txtcolor,'important']; //node.style.setProperty('color',txtcolor,'important');
					skip_contrast = true;
					if (cfg.forcePlhdr && cfg.forceIInv)
						node.style.setProperty('filter','unset');
					}
					nsty = node.getAttribute('style');
					if (nsty == null) nsty = '';
					if (cfg.advDimming)
						node.style.setProperty('filter','revert','important');
					}
				}
			}

			if (cfg.underlineLinks && tag == 'A') {
				node.setAttribute('u__', '');
				node.style.setProperty('text-decoration','underline');
			}

			if (str300 || ftr || skip_contrast || b_ctext[node_count] < 1)
				return;

			let color = style.color;

			let rgba_arr = getRGBarr(color);

			if (basic_colors_to_skip.includes(color) || !rgba_arr)
				return;

			let bg_transp = false;

			let bg_color = style.backgroundColor;
			if (/(0\, 0\, 0\, 0|transparent)/i.test(bg_color))
				bg_color = getBgColor(node);
			
			function getBgColor(n) {
				let pnode = n.parentElement;
				let bg_color = 'transparent';
				while (pnode && /(\(0\, 0\, 0\, 0\)|transparent)/i.test(bg_color)) {
					bg_color = getComputedStyle(pnode).backgroundColor;
					pnode = pnode.parentElement;
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
			}

			let fg_brt = calcBrightness(rgba_arr);

			let bg_arr = getRGBarr(bg_color);

			bg_brt = calcBrightness(bg_arr);
			if (!bg_transp)
			if (bg_arr[3] != 1 && bg_arr[3] != 0) {
				bg_brt = (1-bg_arr[3])*bg_brt/bg_arr[3];
			} else if (bg_arr[3] == 0) {
				bg_arr[3] = 1;
				bg_brt = calcBrightness(bg_arr);
			}

			/**if (!s_b && cfg.skipBlack && g_black.includes(color) && bg_brt < g_min_bg_brightness) {
				node.style.setProperty('color','rgb(255, 255, 255)','important');
				color = 'rgb(255, 255, 255)';
				rgba_arr = [255, 255, 255, 1];
				fg_brt = 255;
			}*/

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
				if (bg_brt > fg_brt || bg_brt > 121)
					bstl = 'rgb(0, 0, 0)';
				else
					bstl = 'rgb(255, 255, 255)';
				if (bstl && style.color.indexOf(bstl) < 0)
					toset_colors[node_count][0] = [bstl,'important'];
			}
		};

		const iterateBigArr = (arr) => {
			var el, el_count, nc;
			if (doc_obs != undefined && doc_obs != null)
				doc_obs.disconnect();
			for (el of arr) {
				setAttribs(el);
				if (!b_fast) {
					nc = map.get(el);
					if (nc && nc != undefined && toset_colors[nc] && toset_colors[nc] != undefined) {
						for (el_count = 0; el_count < 9; el_count++) {
							if (toset_colors[nc][el_count] && toset_colors[nc][el_count] != undefined) el.style.setProperty(color_map[el_count],toset_colors[nc][el_count][0],toset_colors[nc][el_count][1]);
						}
					}
				}
			}
			if (b_fast) {
				for (el of arr) {
					nc = map.get(el);
					if (nc && nc != undefined && toset_colors[nc] && toset_colors[nc] != undefined) {
						for (el_count = 0; el_count < 9; el_count++) {
							if (toset_colors[nc][el_count] && toset_colors[nc][el_count] != undefined) el.style.setProperty(color_map[el_count],toset_colors[nc][el_count][0],toset_colors[nc][el_count][1]);
						}
					}
				}
			}
			if (doc_obs != undefined && doc_obs != null)
				doc_obs.observe(document.body, { childList: true, subtree: true });
		}

		iterateBigArr(nodes);

		if (cfg.advDimming) {
			if (!cfg.ssrules || n_imgcount > min_imgs) {
			for (let img of images) {
				let pn = img;
				let lastn = pn;
				lastn.style.setProperty('filter','revert','important');
				while (pn && !/\b(BODY|HTML)\b/i.test(pn.nodeName)) {
					lastn = pn;
					let nsty = lastn.getAttribute('style');
					if (!b_iimg[map.get(lastn)] && nsty != null && !nn_reg.test(nsty) && (nsty.length > 0))
						lastn.style.setProperty('filter','revert','important');
					else if (!b_iimg[map.get(lastn)] && nsty == null)
						lastn.style.setProperty('filter','revert','important');
					let cn = map.get(lastn);
					b_dim[cn] = true;
					pn = lastn.parentElement;
				}
				node = lastn;
				node_count = map.get(node);
				if (b_dim[node_count]) continue;
				b_dim[node_count] = true;
			}
			}
			if (!cfg.ssrules)
				document.body.style.setProperty('filter','unset','important');
		}
		if (cfg.forcePlhdr) {
			if (bdy_ix != undefined)
				if (bdy_ix == -1)
					document.body.style.setProperty(bdy_attr, bdy_val, 'important');
				else
					document.documentElement.style.setProperty(bdy_attr, bdy_val, 'important');
			if (g_anegative)
				document.documentElement.style.setProperty('--g_filter_invert','invert(1)');
		}
		if (g_loader != null) {
			g_loader.remove();
			g_loader = null;
		}
	}

	await process(nodes);

function changeBrightnessContrast() {

	chrome.storage.local.get(["url","abrightness","acontrast","azoom","asize","athresh","aweight","afont","awidget"]).then((res) => {

	let url_g = window.location.href.indexOf('#full_url') > -1 ? window.location.href : window.location.hostname || window.location.href;
	let url = url_g.trim();

	let url1 = '';
	if (res.url != undefined && res.url)
		url1 = res.url.trim();

	let brt = document.documentElement.style.getPropertyValue("--g_brightness");
	let ctr = document.documentElement.style.getPropertyValue("--g_contrast");
	let zoo = parseFloat(document.documentElement.style.getPropertyValue("--g_zoom"));
	let fnt = document.documentElement.style.getPropertyValue("--g_btvfont");

	if (url1 == url && res.awidget)
	if ((!isNaN(parseInt(res.abrightness)) && !isNaN(parseInt(res.acontrast)) && !isNaN(parseInt(res.asize)) && !isNaN(parseInt(res.athresh)) && !isNaN(parseInt(res.aweight)) && !isNaN(parseFloat(res.azoom))) || res.afont) {

	if (g_style_orig == undefined) g_style_orig = css_node.nodeValue;

	g_brt = res.abrightness;
	g_ctr = res.acontrast;

	if (res.awidget.indexOf('strength') > -1)
	if (parseFloat(res.azoom) >= 0.0099)
		document.documentElement.style.setProperty('--g_zoom',Math.abs(parseFloat(res.azoom)));
	else
		document.documentElement.style.setProperty('--g_zoom',1.75);

	if (fnt != res.afont)
	if (res.afont) {
		document.documentElement.style.setProperty('--g_btvfont',res.afont);
		let rul = `*{font-family:var(--g_btvfont)!important;}`;
		if (!g_fntRule) {
			style_node.sheet.insertRule(rul, 0);
			css_node.nodeValue += rul;
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

	if (/(brightness|contrast)/.test(res.awidget)) {

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
	}

	if (/(size|threshold|weight)/.test(res.awidget))
	if (g_size != res.asize || g_thresh != res.athresh || g_weight != res.aweight) {
		let c = 0, cd = 0;
		let cc = 0;
		let height_inc = 1, size_inc = '';
		var pcent, line_sizes = [], f_sizes2 = [], f2_sizes2 = [];
		let m_ssdone = {};

		g_size = parseInt(res.asize);
		g_thresh = parseInt(res.athresh);
		g_weight = parseInt(res.aweight);

		if (!g_skiplinks_nstart3)
		if (!cfg.start3 || g_weight < 400)
		if (g_weight != 400)
			size_inc += `*{font-weight:${g_weight}!important};`;

		height_inc = (1.07 + 0.225*g_size/g_thresh).toFixed(2);
		while (c < g_thresh) {
			++c;
			cd = c;
			if (g_skiplinks_nstart3) {
				cc = (g_size*0.2) + (parseFloat(g_thresh*1.075) - (2*c/11))*(100+((g_weight+400) % 900))/900;
				pcent = Math.abs((2.5*g_size) - (c*20/g_thresh))*(100+((g_weight+400) % 900))/900;
			} else {
				cc = (g_size*0.2) + parseFloat(g_thresh*1.075) - (2*cd/11);
				pcent = Math.abs((2.5*g_size) - (cd*20/g_thresh));
			}
			if (parseFloat(cc) < c && !g_smaller_text) { cc = c; }
			if (parseFloat(cc) > g_thresh) cc = g_thresh;
			let cc1 = parseInt(cc);
			var cc2;
			if (g_smaller_text)
				cc2 = (cc1*(1-0.5*parseFloat(pcent)/20)).toFixed(1);
			else
				cc2 = (cc1*(1+parseFloat(pcent)/100)).toFixed(1);
			size_inc += `[s__='${c}']{font-size: ${cc2}px!important;`;
			if (!cfg.skipHeights)
				size_inc += `line-height: ${height_inc}em!important;}\n`;
			else
				size_inc += `}\n`;
			size_inc += `[h__='${c}']{line-height:115%!important;min-height: ${height_inc}em!important}`;
			if (!cfg.skipHeights)
				f_sizes2[c] = "font-size: " + cc2 + "px!important;line-height: " + height_inc + "em!important;";
			else
				f_sizes2[c] = "font-size: " + cc2 + "px!important;";
			line_sizes[c] = `${height_inc}em`;
			if (cc2.substr(-2,2).indexOf('.0') > -1) cc2 = parseInt(cc2);
			f2_sizes2[c] = cc2 + "px";
			if (c > 9)
				size_inc += "[style*='font-size: "+c+"'],[style*='font-size:"+c+"'] { "+f_sizes2[c]+" }";
			else
				size_inc += "[style*='font-size: "+c+"px'],[style*='font-size:"+c+"px'] { "+f_sizes2[c]+" }";
		}
		for (cd = c+1; cd < 50; cd++) {
			size_inc += "[style*='font-size: "+cd+"'],[style*='font-size:"+cd+"'] { font-size: "+cd+"px !important; }";
		}
		css_node.nodeValue = g_style_orig+size_inc;

		if (g_max_css_rules > 0) {
		for (var si = 0; si < document.styleSheets.length; si++) {
		var sheet,rules;
		try {
		sheet = document.styleSheets[si];
		if (g_load_crossorigin && sheet.href && sheet.href.indexOf(window.location.origin) < 0) continue;
		if (sheet.ownerNode.id == '_btv_') continue;
		rules = sheet.cssRules;
		} catch (e) { continue; }
		try {
		let rl = rules.length;
		if (rl > g_max_css_rules) continue;
		let ri = 0;
		for (ri = 0; ri < rl; ri++) {
		let rule = rules[ri];
		var fgr,fgr1,fgarr,imp;
		let txtrul = '';
		let txtrul2 = '';
		if (rule.href && rule.href != undefined && /\.s?css/i.test(rule.href)) { rules = rule.styleSheet.cssRules; ri = 0; rl = rules.length; continue; }
		if (rule.selectorText && rule.style) {
		let key = rule.selectorText;
		let value = rule.style.cssText;
		if (g_foot_re && /footer/i.test(key)) continue;
		if (m_done[key] == undefined) m_done[key] = 0;
		if (/\b(body|html)\b/i.test(key) && b_bdone != true && g_thresh > 0 && g_size > 0 && rule.style.fontSize) {
			var rt, rt1;
			rt1 = rule.style.fontSize;
			if (/var\(/i.test(rt1))
				rt = getVarValue(rt1);
			else
				rt = rt1;
			if (/[\d\.]+.*?px/i.test(rt)) {
			let nfz = parseInt(rt);
			if (nfz <= g_thresh && nfz > 1) {
			txtrul = key+' { font-size: '+f2_sizes2[nfz]+' !important; }';
			n_rulecount++;
			if (!cfg.ssrules) {
				rule.style.setProperty('font-size',f2_sizes2[nfz],'important');
				m_done[key] = 3;
			}
			b_bdone = true;
			}
			}
		}
		if (m_done[key] < 3 && g_thresh > 0 && g_size > 0 && rule.style.fontSize) {
			m_done[key]++;
			var rt, rt1;
			rt1 = rule.style.fontSize;
			if (/var\(/i.test(rt1))
				rt = getVarValue(rt1);
			else
				rt = rt1;
			if (/[\d\.]+.*?px/i.test(rt)) {
			let nfz = parseInt(rt);
			if (nfz <= g_thresh && nfz > 1) {
			txtrul = key+' { '+f_sizes2[nfz]+' }';
			n_rulecount++;
			}
			} else if (/[\d\.]+.*?rem/i.test(rt)) {
			let nfz = parseInt(parseFloat(rt)*body_nfz);
			if (nfz <= g_thresh && nfz > 1) {
			txtrul = key+' { '+f_sizes2[nfz]+' }';
			n_rulecount++;
			}
			} else if (/[\d\.]+.*?pt/i.test(rt)) {
			let nfz = parseInt(parseFloat(rt)*1.333334);
			if (nfz <= g_thresh && nfz > 1) {
			txtrul = key+' { '+f_sizes2[nfz]+' }';
			n_rulecount++;
			}
			}
		}
		if (!txtrul && m_done[key] < 3 && g_thresh > 0 && g_size > 0 && rule.style.fontSize) {
			m_done[key]++;
			var rt,rt1;
			rt1 = rule.style.fontsize;
			if (/var\(/i.test(rt1))
				rt = getVarValue(rt1);
			else
				rt = rt1;
			if (/\d+.*?px/i.test(rt)) {
			let fsz = parseInt(rt);
			if (fsz > 1 && fsz <= g_thresh) {
				txtrul = key + ' { ' + f_sizes2[fsz] + ' }';
				n_rulecount++;
				}
			}
		}
		}
		}
		if (txtrul)
			css_node.nodeValue += txtrul;
			//style_node.sheet.insertRule(txtrul, 0);

		} catch (error) {
		}
		}
		}

		var a_nodes;
		if (window.self == window.top)
			a_nodes = document.body.getElementsByTagName('*');
		else
			a_nodes = nodes;

		for (let n of a_nodes) {
			let nc = map.get(n);
			if (nc && nc != undefined && n instanceof Element) {
				let fosz = orig_font[nc];
				let cfz = getComputedStyle(n).fontSize;
				if (/undefined/.test(fosz+cfz)) continue;
				let nsz = parseInt(fosz);
				let fsz = parseFloat(fosz);
				if (g_size == 0) {
					n.removeAttribute('h__');
					n.removeAttribute('s__');
					let nsty = n.getAttribute('style');
					if (nsty == null) nsty = '';
					let rsty = nsty.replaceAll(/font-size[^\;]*?important\s*\;/g,'');
					n.setAttribute('style', rsty);
					n.style.setProperty('font-size',fosz,'important');
				} else {
				if (parseFloat(cfz) <= g_thresh && fsz <= g_thresh) {
					n.removeAttribute('h__');
					n.removeAttribute('s__');
					let nsty = n.getAttribute('style');
					if (nsty == null) nsty = '';
					let rsty = nsty.replaceAll(/font-size[^\;]*?important\s*\;/g,'');
					n.setAttribute('style', rsty);
					n.style.setProperty('font-size',f2_sizes2[nsz],'important');
					n.style.setProperty('line-height',line_sizes[nsz],'important');
					n.setAttribute('s__',nsz);
					b_cdone[nc] = 999;
				} else if (b_cdone[nc] == 999) {
					n.removeAttribute('h__');
					n.removeAttribute('s__');
					let nsty = n.getAttribute('style');
					if (nsty == null) nsty = '';
					let rsty = nsty.replaceAll(/font-size[^\;]*?important\s*\;/g,'');
					n.setAttribute('style', rsty);
				}
				}
			}
		}
	}

	chrome.storage.local.remove(["url","abrightness","acontrast","azoom","asize","athresh","aweight","afont","awidget"]);
	}

	});
	timerid2 = setTimeout(changeBrightnessContrast, 1500);
}

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
				let pch = hi.parentElement;
				let c = hi;
				while (pch && !/^(BODY|HTML)$/i.test(pch.nodeName)) {
					new_nodes.push(c);
					c = pch;
					pch = pch.parentElement;
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

	timerid2 = setTimeout(changeBrightnessContrast, 2500);

	} catch (e) {
		console.log(e);
		if (cfg.advDimming && !cfg.ssrules)
			document.body.style.setProperty('filter','unset','important');
		if (cfg.forcePlhdr) {
			if (bdy_attr && bdy_val && bdy_attr != undefined)
				document.body.style.setProperty(bdy_attr, bdy_val, 'important');
			if (g_anegative)
				document.documentElement.style.setProperty('--g_filter_invert','invert(1)');
		}
		if (g_loader != null) {
			g_loader.remove();
			g_loader = null;
		}
	}
}

var timerid2;
var g_brt, g_ctr, g_size, g_thresh, g_weight, g_style_orig;

var g_loader = null;
if (window.top == window.self) {
g_loader = document.createElement("div");
g_loader.setAttribute('style','position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 99999; background: rgba(5,5,5,0.01);');
if (document.body)
	document.body.appendChild(g_loader);
}

window.onload = init;
