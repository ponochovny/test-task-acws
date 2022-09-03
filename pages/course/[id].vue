<template>
	<div class="relative w-10/12 m-auto mt-8 mb-8">
		<div class="absolute top-2 -left-12 cursor-pointer" @click="router.back()">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-arrow-left-circle-fill w-6 h-6 text-gray-300 hover:text-gray-500 transition-all"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
				/>
			</svg>
		</div>
		<p class="text-3xl mb-4">
			{{ course.name }}
		</p>
		<div
			v-if="
				course.thumbnail_url &&
				course.thumbnail_url !=
					'https://service.lms.academweb.tech/storage/samples/sample.jpg'
			"
			class="mb-4"
		>
			<img :src="course.thumbnail_url" alt="" />
		</div>
		<div class="mb-4 flex gap-4">
			<span>Price: ${{ course.price }}</span>
			<span v-if="course.ratings_avg_rating"
				>Rating: {{ course.ratings_avg_rating }}</span
			>
			<span>Students: {{ course.students_count }}</span>
			<span>Created: {{ $dayjs().format('DD.MM.YYYY') }}</span>
		</div>
		<div class="mb-6">
			<span
				v-for="category of course.categories"
				:key="category.id"
				class="rounded-lg mr-2 bg-red-400 text-xs py-1 px-2 text-white"
			>
				{{ category.name }}
			</span>
		</div>
		<div class="flex gap-4 items-center">
			<div class="overflow-hidden rounded-full items-center">
				<img :src="course.author.avatar_url" alt="" width="70" height="70" />
			</div>
			<span class="text-md font-bold"
				>{{
					course.author.first_name + ' ' + course.author.last_name
				}}
				(Author)</span
			>
		</div>
	</div>
</template>

<script setup>
import { useCoursesStore } from '../../composables/courses'

const router = useRouter()
const route = useRoute()
const coursesStore = useCoursesStore()

const course = computed(() => coursesStore.getCourseById(route.params.id))
</script>
