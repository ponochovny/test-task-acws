import { defineStore } from 'pinia'
import { API_HOST } from '~~/tools/global-variables'
import { useCoursesStore } from './courses'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const setCookie = (option, data) => {
	const date = new Date()
	date.setDate(date.getDate() + 1)
	cookies.set(option, data, date)
}

export const useAuthStore = defineStore('auth', () => {
	const coursesStore = useCoursesStore()
	const router = useRouter()

	const user = ref(null)
	const loading = ref(false)
	const api_token = ref(null)
	const error = ref(null)

	const isLoading = computed(() => loading.value)

	const setUserData = (data) => {
		user.value = data
	}

	const getUser = computed(() => user.value)

	const setToken = (token) => {
		api_token.value = token
	}

	const logIn = async ({ email, password }) => {
		loading.value = true
		// teacher@akadasia.com
		// akadasia#dev#v3

		const formData = new FormData()
		formData.append('login', email)
		formData.append('password', password)
		try {
			const data = await fetch(`${API_HOST}/login`, {
				method: 'post',
				body: formData,
			}).then(async (res) => {
				const res2 = await res.json()

				setCookie('token', res2.api_token)

				return res2
			})

			api_token.value = data.api_token

			const userData = {
				avatar: data.data.avatar_url,
				email: data.data.email,
				first_name: data.data.first_name,
				last_name: data.data.last_name,
				username: data.data.username,
			}
			setUserData(userData)

			setCookie('user', JSON.stringify(userData))

			coursesStore.getCourses(data.api_token)
			router.push({ path: '/' })

			loading.value = false
		} catch (err) {
			console.log('error', err)
			error.value = err.message

			loading.value = false
		}
	}

	const logOut = async () => {
		user.value = null
		api_token.value = null
		cookies.remove('token')
		cookies.remove('user')

		router.push({ path: '/auth' })
	}

	return {
		user,
		error,
		isLoading,
		setUserData,
		setToken,
		logIn,
		logOut,
		getUser,
	}
})
