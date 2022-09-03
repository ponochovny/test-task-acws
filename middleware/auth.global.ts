import { useAuthStore } from '~/composables/auth'

export default defineNuxtRouteMiddleware((to, from) => {
	if (!process.server) {
		const store = useAuthStore()

		if (!store.getUser && to.fullPath != '/auth') {
			return navigateTo('/auth')
		}
	}
})
