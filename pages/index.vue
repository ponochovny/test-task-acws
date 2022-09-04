<template>
	<div>
		<template v-if="coursesStore.courses">
			<div class="flex flex-wrap mt-8">
				<course
					v-for="course of pagedCourses"
					:key="course.id"
					:course="course"
				></course>
			</div>
			<pagination
				:total="coursesStore.courses?.length"
				:to="paginationTo"
				:from="paginationFrom"
				@changePage="changePage"
			/>
		</template>
	</div>
</template>

<script setup>
import { useCoursesStore } from '@/composables/courses'

const coursesStore = useCoursesStore()
const paginationPage = ref(1)

const changePage = (val) => {
	paginationPage.value = val
}

const paginationTo = computed(() => paginationPage.value * 10)
const paginationFrom = computed(() =>
	paginationTo.value - 10 == 0 ? 1 : paginationTo.value - 10
)

const pagedCourses = computed(() => {
	const newArr = [...coursesStore.courses]
	return newArr.slice(paginationFrom.value, paginationTo.value)
})
</script>
