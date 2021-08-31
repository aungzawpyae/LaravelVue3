import { router } from "../plugins/vue-router";
import store from "../store";

const castBool = data => {
	if (typeof data === "string") {
		return data === "true";
	}
	return !!data;
};

const isGlobalRoute = route =>
    route.meta && route.meta.auth && route.meta.permissions == "global";

const isGuestRoute = route => route.matched.some(m => m.meta.guest);

export const localeNum = (num, i18n) => {
	let numArr = String(num).split("");
	numArr = numArr.map(i => i18n.messages[i18n.locale].message[i]);
	return numArr.join("");
};

// for currency format like 100000 => 100,000 | 10000000 => 10,000,000
const currencyFormat = (value, decimal) => {
    if (!value) {
        return "0";
    }

    if(decimal){
        value = parseFloat(value).toFixed(decimal);
    }

    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1, ");
};

const localeNumbering = (num, messageList) => {
    let currencyNumber = currencyFormat(num);
    return localeNum(currencyNumber, messageList);
};

const isJson = str => {
	try {
		return JSON.parse(str) && !!str;
	} catch (e) {
		return false;
	}
};

const consoleRouteTrace = (routeName, consoleRoute, message) => {
    if (routeName == consoleRoute) {
        console.warn(...message);
    }
};

const consoleTraceForFindByKeyword = (consoleTrace, message) => {
    if (consoleTrace) {
        console.error(...message);
    }
};

// list = ["name" : { "en": "Hello", "mm" : "ဟယ်လို"}], keys = "name.en"
const getNestedValue = (keys, list, defaultValue) => {

    defaultValue = defaultValue ? defaultValue : '';

    if (!keys || !list) {
        return defaultValue;
    }

    keys = keys.split(".");
    let key = keys.shift();
    if (keys.length > 0) {
        return getNestedValue(keys.join("."), list[key]);
    } else {
        return list[key] ? list[key] : defaultValue;
    }
};

const findByKeyword = (list, key, value, lastIndex, consoleTrace) => {
    if (!key || !value) {
        consoleTraceForFindByKeyword(consoleTrace, [
            "Key or Value is invalid ",
            key,
            value
        ]);
        return null;
    }

    if (typeof list != "array" && typeof list != "object") {
        consoleTraceForFindByKeyword(consoleTrace, [
            "list is not array nor object",
            list
        ]);
        return null;
    }

    if (lastIndex) {
        list = list.reverse();
    }

    if (typeof list === "object") {
        const val = Object.values(list);

        if (typeof val == "undefined") return null;

        const result = val.find(item => {
            return value.toString() === getNestedValue(key, item).toString();
        });

        if (!result) {
            consoleTraceForFindByKeyword(consoleTrace, [
                "Not Found ",
                value,
                " may be value is not correct"
            ]);
        }

        return result;
    }

    consoleTraceForFindByKeyword(consoleTrace, "nested value ", val);

    return list.find(
        item => getNestedValue(key, item).toString() === value.toString()
    );
};

const findById = (list, id) => findByKeyword(list, "id", parseInt(id, 10));

const getRouteByName = (routeName, consoleTrace) => {
    return findByKeyword(
        router.options.routes,
        "name",
        routeName,
        false,
        consoleTrace
    );
};

const hasPermissionOverList = permissionList => {
    let flag = true;

    permissionList.map(permission => {
        flag = flag & hasPermission(permission);
    });

    return flag;
};

const hasPermission = permission => {
	
    let user = store.state.auth.user;

    if(user && user.role){
        let current_user_permissions = user.permissions ? user.permissions : [];

        return current_user_permissions.indexOf(permission) != -1;
    } else {
        return true;
    }
};

const checkPermissionForRoute = (route, permit, consoleRoute) => {

    consoleRouteTrace(route, consoleRoute, [
        "initial parameters ===> ",
        route,
        permit
    ]);

    let current_route_obj;

    if (typeof route === "string") {
        // route name
        current_route_obj = getRouteByName(route, consoleRoute == route);

        consoleRouteTrace(route, consoleRoute, [
            "after converting obj ===> ",
            current_route_obj
        ]);
    } else {
        current_route_obj = route;
        consoleRouteTrace(route, consoleRoute, [
            "already obj ===> ",
            current_route_obj
        ]);
    }

    if (!current_route_obj) {
        consoleRouteTrace(route, consoleRoute, [
            "Can't Found route ",
            route,
            current_route_obj
        ]);
        console.warn("no found route for ", route, permit);
        return false;
    }

    if (isGlobalRoute(current_route_obj)) {
        return true;
    }

    let permission = current_route_obj.meta
        ? current_route_obj.meta.permissions
        : undefined;

    consoleRouteTrace(route, consoleRoute, ["needed permission ==> ", permission]);

    if (typeof permission === "object") {
        consoleRouteTrace(route, consoleRoute, ["permission is object ==> ", permission]);
        // page has with many tab
        if (permit && permission[permit]) {

            consoleRouteTrace(route, consoleRoute, ["with permit ==> ", permit]);

            let subPermission = permission[permit];

            consoleRouteTrace(route, consoleRoute, ["sub permission ==> ", subPermission]);

            if(typeof subPermission == 'function'){
                return subPermission();
            }

            permission = permission[permit];
        } else {
            consoleRouteTrace(route, consoleRoute, ["with no permit "]);
            // if no permit is set
            let permissions = Object.values(permission);

            consoleRouteTrace(route, consoleRoute, ["permissions ==> ", permissions]);

            let BreakException = {};
            let result = false;
            try {
                result = permissions.map(permission => {
                    if (permission) {
                        if (hasPermission(permission)) {
                            throw BreakException;
                        }
                    }
                });
            } catch (e) {
                result = true;
            }

            if (!result) {
                consoleRouteTrace(route, consoleRoute, ["permission denied"]);
            }

            return result;
        }
    }

    if (permission) {
        let result = hasPermission(permission);

        if (!result) {
            consoleRouteTrace(route, consoleRoute, ["permission denied"]);
        }

        return result;
    }
};

const flashErrorMessage = async (error, messageList, callback) => {

    if(!error){
        return;
    }

    let errorMessage = getErrorMessage(error, messageList);

    if(errorMessage){

        if(callback){
            errorMessage = await callback(errorMessage);
        }

        if(!errorMessage){
            if(error.response.status == 404){
                errorMessage = 'Not Found';
            }
        }

        if(errorMessage){
            window.toastr.error(errorMessage);
        }
    }
};

const getErrorMessage = (error, messageList) => {
    
    let showErrorMessage = '';
     // Servier ဘက်က resonse error အပိုင်း
     if (error.response) {
        let errors = error.response.data.errors;

        if (errors) { // server validation error (422)
            // ပထမဦးဆုံး တခုကို ယူ
            let key = Object.keys(errors)[0];

            showErrorMessage = errors[key][0];

        } else { // request response error (db error, ....)

            errors = error.response.data.message;

            if(isJson(errors)){
                return parseJson(errors);
            }

            showErrorMessage = errors;
        }
    } else {
        // ရိုးရိုး error အပိုင်း

        if (error && Array.isArray(error)) {
            
            let errorKeys = Object.keys(error);

            showErrorMessage = `${getLangMessage(errorKeys[0], messageList)} ${getLangMessage(error[errorKeys[0]], messageList)}`;

        } else if (typeof error === "object") { // validate.js ကလာတဲ့ error 

            let errorKeys = Object.keys(error); 

            let name = "";

            // no error to show
            if (errorKeys.length == 0) {
                return false;
            }

            console.log('tag', errorKeys);

            // ပထမဦီးဆုံးတခုကို ယူ
            let errorKey = errorKeys[0];

            // key က dot နဲ့လာမရင် eg . sender.phone နောက်က phone ကိုဘဲယူ

            let keyList = errorKey.split(".");

            if (keyList.length > 1) {

                name = keyList[keyList.length - 1];

            } else {

                name = errorKey;

            }

            let errorMessage = Array.isArray(error[errorKey]) ? error[errorKey][0] : error[errorKey];

            if (typeof errorMessage == 'object') {

                showErrorMessage = `${getLangMessage(name, messageList)} ${
                    messageList[errorMessage.lang]
                }  ${errorMessage.value} ${
                    messageList[errorMessage.suffix]
                }`;
            } else {
                
               showErrorMessage = `${getLangMessage(name, messageList)} ${getLangMessage(errorMessage, messageList)}`;
            }

        } else {
            showErrorMessage =  error;
        }
    }

    return showErrorMessage;
}

const getLocale = (key , i18n) => {
    let message = i18n.messages[i18n.locale].message[key];
    if(!message){
        return key;
    }
    return message;
}

const getLangMessage = (key, i18n,messageList, config) => {
    console.log("getLangMessage", key, messageList);
    let localeMessage = messageList[key];

    console.log("getLangMessage", key, messageList, localeMessage);

    if (!localeMessage) {
        return config
            ? config[key]
                ? config[key]
                : key
            : key;
    }

    return localeMessage;
};

const cloneJson = json => {
    
    if(!json){
        return json;
    }

    return JSON.parse(JSON.stringify(json));
};

const UrlToFile = url => {
	var byteString = atob(url.split(',')[1]);
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([ia], {
	  type: 'image/jpeg'
	});
	var file = new File([blob], "image.jpg");

	return file;
}

export default {
	castBool,
	isGlobalRoute,
	isGuestRoute,
	localeNum,
	isJson,
	consoleRouteTrace,
	consoleTraceForFindByKeyword,
	getNestedValue,
	findByKeyword,
	findById,
	getRouteByName,
	hasPermissionOverList,
	hasPermission,
	checkPermissionForRoute,
	currencyFormat,
	localeNumbering,
	flashErrorMessage,
	getErrorMessage,
	getLocale,
	getLangMessage,
	cloneJson,
	UrlToFile
};