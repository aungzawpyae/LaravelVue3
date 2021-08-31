function loadView(view) {
    return () => import(`../views/${view}.vue`);
}

const Login                 = loadView("Login");
const Unauthorized          = loadView("Unauthorized");
const Index                 = loadView("Index");
const User                  = loadView("User");

export default  [
    {
        path: "/",
        name: "index",
        component: Index,
        meta: {
            title:"Dashboard",
            permissions: "global",
            auth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title:"Login",
            permissions: "global",
            guest: true
        }
    },
    {
        path: "/403",
        name: "unauthorized",
        component: Unauthorized,
        meta: {
            title:"Unauthorized",
            permissions: "global",
            auth: true
        }
    },
    {
        path: "/user",
        name: "user",
        component: User,
        meta: {
            title:"Users",
            permissions: "global",
            auth: true
        }
    },
];