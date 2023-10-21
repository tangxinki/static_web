import type { Router } from 'vue-router';
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/pageEnum'
import PAGE_NOT_FOUND_ROUTE from '@/router/routes/basic';
import { useAppStoreWithOut } from '@/store/modules/app'

const LOGIN_PATH = PageEnum.BASE_LOGIN;


// 白名单
const whitePathList: string[] = ['/main/home']

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreWithOut()
    const token = userStore.getToken;
    const appStore = useAppStoreWithOut()
    router.beforeEach((to, from, next) => {
        if (appStore.navTitle) appStore.clear()
        if (whitePathList.includes(to.path)) {
            next()
            return
        }
        if (!token) {
            // TODO: 临时调试使用， 后续需要将以下代码删除
            next()
            return false
            //=======
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            if (to.path === PageEnum.BASE_LOGIN) {
                next()
            } else next({ path: PageEnum.BASE_LOGIN })

            return;
        }

        // Jump to the 404 page after processing the login
        if (
            from.path === LOGIN_PATH &&
            to.name === PAGE_NOT_FOUND_ROUTE.name &&
            to.fullPath !== PageEnum.BASE_HOME
        ) {
            next(PageEnum.BASE_HOME)
            return;
        }
    })

}