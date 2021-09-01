import {createApp} from 'vue';
import store from "../store";
import { createWebHistory, createRouter } from "vue-router";
import routes from '../routes';
import helper from "../utils/helper";

// createApp(VueRouter);

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {

	let active_user = store ? store.state.auth.user : null;

    if (
        to.matched.some((m) => m.meta.guest) &&
        store.state.auth.auth
    ) {
        next({
            path: "/login"
        });
    } else if (
        to.matched.some((m) => m.meta.auth) &&
        helper.castBool(store.state.auth.auth)
    ) {
        next({
            path: "//"
        });
    } else if (
        !helper.checkPermissionForRoute(
            to.name,
            to.params ? to.params.tab : undefined,
        ) && //if invalid permission
        !helper.isGlobalRoute(to) && 
        !helper.isGuestRoute(to)
    ) {
        next({
            name: "unauthorized"
        });
        //window.toastr.error("You don't have permission");
    } else {
        let title = "";

        const compoenentTitle = to.matched
            .slice()
            .reverse()
            .find(async r => {
                if (typeof r.components.default === "function") {
                    let t = r.components
                        ? await r.components.default()
                        : undefined;
                    return t.default ? t.default.name : '';
                }
            });

        if (compoenentTitle) {
            if (typeof compoenentTitle.components.default === "function") {
                let t = await compoenentTitle.components.default();
                if (t) {
                    title = `${t.default ? t.default.name : ''} | ${
                        active_user ? active_user.name : "Marketplace Seller"
                    }`;
                }
            } else {
                console.log(typeof compoenentTitle.components.default);
            }
        }
        
        if (title) document.title = title;
        next();
    }
})

router.onError(error => {
    console.error("load fail ", error);
    if (/loading chunk \d* failed./i.test(error.message)) {
        window.location.reload();
    }
});