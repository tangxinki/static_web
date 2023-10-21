import { withInstall } from "@/utils"
import HelloWorld from "./HelloWorld.vue";
import IconComponent from './Icon/Icon.vue'
export const Hello = withInstall(HelloWorld)
export const Icon = withInstall(IconComponent)
