<template>
	<div>
		<template v-if="coursesStore.courses">
			<div class="flex flex-wrap mt-8">
				<course
					v-for="course of coursesStore.courses"
					:key="course.id"
					:course="course"
				></course>
			</div>
		</template>
	</div>
</template>

<script setup>
import { useCoursesStore } from '@/composables/courses'

const coursesStore = useCoursesStore()
</script>
