<template>
	<div class="flex shadow-md w-full h-16 items-center justify-between px-10">
		<template v-if="authStore.user">
			<div class="flex gap-6">
				<NuxtLink to="/">
					<p class="text-3xl font-medium">Main page</p>
				</NuxtLink>
				<!-- <NuxtLink to="/auth">
					<p class="text-3xl font-medium">Auth page</p>
				</NuxtLink> -->
			</div>
			<button type="button" @click="authStore.logOut">
				<p class="text-3xl font-medium">Log Out</p>
			</button>
		</template>
	</div>
</template>
<script setup>
import { useAuthStore } from '@/composables/auth'

const authStore = useAuthStore()
</script>
