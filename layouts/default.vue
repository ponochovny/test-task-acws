<template>
	<div>
		<Nav />
		<slot />
	</div>
</template>

<script setup>
// import '@/assets/css/tailwind.css'
import { API_HOST } from '../tools/global-variables'
import { useCoursesStore } from '@/composables/courses'
import { useAuthStore } from '@/composables/auth'

const coursesStore = useCoursesStore()
const authStore = useAuthStore()

if (process.server) {
	const token = useCookie('token')
	if (token.value) {
		const { data, pending, error } = await useFetch(`${API_HOST}/courses`, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token.value}`,
				Connection: 'keep-alive',
			},
		})
		if (error.value == null) {
			// Token is valid
			// 1. set data to store
			coursesStore.setCourses(data.value.data)

			// 2. set token into user store
			authStore.setToken(token.value)

			// 3. set user data from cookies user
			const user = useCookie('user')
			authStore.setUserData(user.value)
		} else {
			// Token is not valid
		}
	}
}
</script>
