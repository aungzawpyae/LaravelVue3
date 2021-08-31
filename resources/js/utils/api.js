import store from '../store';
import * as axios from "axios";
import defaultSetting from "../config/apiConfig";

const getRequestHeader = () => Object.assign(defaultSetting.requestHeader, {Authorization: `Bearer ${store.state.auth.token}`});
const getFileRequestHeader = () => Object.assign(defaultSetting.fileRequestHeader, {Authorization: `Bearer ${store.state.auth.token}`});

const puller = async (url, params = "") =>
    axios({
        method: "GET",
        url: `${defaultSetting.mainHostUrl}${url}`,
        headers: getRequestHeader(),
        params: params
    });

const poster = async (url, payload) => 
    axios({
        method: "POST",
        url: `${defaultSetting.mainHostUrl}${url}`,
        headers: getRequestHeader(),
        data: payload
    });

const filePoster = async (url, payload) =>
    axios({
        method: "POST",
        url: `${defaultSetting.mainHostUrl}${url}`,
        headers: getFileRequestHeader(),
        data: payload
    });

const updater = async (url, payload = {}, params = "") =>
    axios({
        method: "PUT",
        url: `${defaultSetting.mainHostUrl}${url}`,
        headers: getRequestHeader(),
        params: params,
        data: payload
    });

const destroyer = async (url, params = "") =>
    axios({
        method: "DELETE",
        url: `${defaultSetting.mainHostUrl}${url}`,
        headers: getRequestHeader(),
        params: params
    });

export default {
    puller,
    poster,
    filePoster,
    destroyer,
    updater
}