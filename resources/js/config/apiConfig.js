import store from '../store';
var token = '';

const defaultSetting = {};
defaultSetting.mainHostUrl = "http://backend.test/api/";

defaultSetting.requestHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-API-TOKEN": "scLMh9u7dDl5o8ypiaJz",
    Authorization: `Bearer ${token}`,
    platform: "web"
};
defaultSetting.fileRequestHeader = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "X-API-TOKEN": "scLMh9u7dDl5o8ypiaJz",
    Authorization: `Bearer ${token}`,
    platform: "web"
};

export default defaultSetting;
