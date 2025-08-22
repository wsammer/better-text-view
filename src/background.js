/**
 * Copyright (C) 2023-2025 Sameer W. All rights reserved.
 * License: https://github.com/wsammer/better-text-view/blob/main/LICENSE
 */

'use strict';

let storage = chrome.storage.local;

let title_apply  = 'Apply Better Text View';
let title_remove = 'Remove Better Text View';

let tabs          = new Set();
let disabled_tabs = new Set();




var browser = browser || chrome;
var arrayUrlRegex = ['/.*/'];
var blackListPattern = ['youtube.com', 'google.com', 'googlevideo.com'];

function convertRegexToUrlFilter(regexArray) {
	return regexArray.map(pattern => {
		let parts = pattern.split('/');
		if (parts.length > 1) {
			let regex = parts[1];
			regex = regex.replace(/\.\*/g, '*');
			regex = regex.replace(/\./g, '\\.');
			return `*${regex}*`;
		}
		return pattern;
	});
}

function updateRules() {
	const regexFilter = arrayUrlRegex[0];
	console.log('Update Rules: ', regexFilter);
	const rules = [];
	const blackListDomain = blackListPattern.map(domain => {
		return `${domain}`;
	});
	console.log('blackListDomain: ', blackListDomain);

	rules.push({
	id: 1,
	priority: 1,
	action: {
	type: "modifyHeaders",
	responseHeaders: [
	{ header: "access-control-allow-origin", operation: "set", value: "*" },
	{ header: "access-control-allow-methods", operation: "set", value: "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS" },
	{ header: "access-control-allow-headers", operation: "set", value: "*" },
	{ header: "access-control-expose-headers", operation: "set", value: "*" }
	]
	},
	condition: {
	regexFilter: regexFilter,
	resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"],
	excludedRequestDomains: blackListDomain,
	excludedInitiatorDomains: blackListDomain,
	}
	});
	

	browser.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [1],
		addRules: rules
	}, () => {
		if (browser.runtime.lastError)
			console.error(browser.runtime.lastError);
		else
			console.log('Rules updated successfully');
	});

}


chrome.runtime.onInstalled.addListener(function(details){

	if (details.reason === 'install') {

		let defaults = {
			'globalStr': 0,
			'size': 14,
			'sizeThreshold': 18,
			'weight': 400,
			'brightness': 50,
			'contrast': 0,
			'skipColoreds': true,
			'skipWhites': false,
			'skipBlack': false,
			'forceIInv': true,
			'doGradients': false,
			'normalInc': true,
			'enableEverywhere': true
		};

		storage.set(defaults);

		chrome.tabs.create({ url: 'Welcome.html' });

updateRules();
		return;
	}
});

chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
return;
	if (request.from !== 'toggle')
		return;

	let title;
	let path;

	if (request.enabled) {
		title = title_remove;
		path = 'assets/icons/halo.png';

		tabs.add(sender.tab.id);
		disabled_tabs.delete(sender.tab.id);
	} else {
		title = title_apply;
		path  = 'assets/icons/halo.png';

		tabs.delete(sender.tab.id);
		disabled_tabs.add(sender.tab.id);
	}

});

chrome.tabs.onUpdated.addListener(function(tabId, change_info, tab) {

	if (change_info.status !== 'complete')
		return;

	let url = tab.url;
	let hostname = '';

	if (url.startsWith('file://')) {
		hostname = url;
	} else {
		let matches = url.match(/\/\/(.+?)\//);

		if (matches)
			hostname = matches[1];
	}
});

chrome.commands.onCommand.addListener(function(command)  {


	let tabs = chrome.tabs.query({ currentWindow: true, active: true });
	let id   = tabs[0].id;

	toggle(chrome.browserAction.getTitle({ tabId: id }), id);
});

chrome.tabs.onRemoved.addListener(function(tab) {
	tabs.delete(tab.id);
	disabled_tabs.delete(tab.id);
});

function toggle(title, tab_id)
{
return;
}
