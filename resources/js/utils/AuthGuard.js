import {isAuthenticated} from "./Auth";

export const isAuthenticatedGuard = (to, from, next) => {
    if (!isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
};

export const isNotAuthenticatedGuard = (to, from, next) => {
    if (isAuthenticated()) {
        next('/');
    } else {
        next();
    }
};
