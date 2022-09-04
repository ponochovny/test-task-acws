import { defineStore } from 'pinia'
import { API_HOST } from '~~/tools/global-variables'

export const useCoursesStore = defineStore('courses', () => {
	const data = ref(null)
	const error = ref(null)

	const setCourses = (idata) => {
		data.value = idata
	}

	const getCourses = async (api_token, isReturn = false) => {
		const query = new URLSearchParams({
			// paginator: 'cursor',
			// order_direction: 'asc',
			// page: '1',
		})

		try {
			const resData = await fetch(`${API_HOST}/courses?` + query, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${api_token}`,
					Connection: 'keep-alive',
				},
			}).then((res) => res.json())
			setCourses(resData.data)
			if (isReturn && resData.data) return 'success'
		} catch (err) {
			error.value = err.message
			if (isReturn) return 'error'
		}
	}

	const courses = computed(() => data.value)

	const getCourseById = (id) => data.value.find((el) => el.id == id)

	return { data, courses, getCourses, setCourses, getCourseById }
})
