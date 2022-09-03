<template>
	<div class="w-1/4 flex justify-center">
		<div
			class="w-10/12 shadow-lg mb-8 mx-2 transition-all cursor-pointer hover:bg-slate-100"
			@click="router.push('/course/' + course.id)"
		>
			<div
				class="w-full h-48 bg-cover"
				:style="{
					backgroundImage: `url(${
						course.thumbnail_url &&
						course.thumbnail_url !=
							'https://service.lms.academweb.tech/storage/samples/sample.jpg'
							? course.thumbnail_url
							: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;h=666&amp;q=80'
					})`,
					backgroundPosition: 'center',
				}"
			></div>
			<div>
				<div class="p-4 sm:p-8">
					<div
						class="font-inter font-extrabold text-2xl text-black tracking-tight mb-1"
					>
						{{ course.name }}
					</div>
					<span class="text-md font-bold"
						>by {{ course.author.first_name + ' ' + course.author.last_name }}
					</span>
					<div class="mt-1 font-medium text-sm text-slate-500 flex">
						<span class="mr-1">{{
							course.price == 0.0 ? 'free' : `$${course.price}`
						}}</span>
						<span v-if="course.ratings_avg_rating">
							· {{ course.ratings_avg_rating }}/5</span
						>
					</div>
					<p class="mt-4 leading-7 text-slate-500"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	course: Object,
})
const { course } = toRefs(props)

const router = useRouter()

// console.log(course.value)
</script>
