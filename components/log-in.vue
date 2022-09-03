<template>
	<div
		class="block p-6 w-96 bg-white rounded-lg border border-gray-200 shadow-md"
	>
		<h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
			Log in to your account
		</h1>

		<form class="mt-6" @submit.prevent="logIn">
			<div>
				<label class="block text-gray-700">Email Address</label>
				<input
					v-model="email"
					type="email"
					name=""
					id="email"
					placeholder="Enter Email Address"
					class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
					autofocus
					autocomplete
					required
				/>
			</div>

			<div class="mt-4">
				<label class="block text-gray-700">Password</label>
				<input
					v-model="password"
					type="password"
					name=""
					id="password"
					placeholder="Enter Password"
					minlength="6"
					class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
					required
				/>
			</div>

			<div class="text-right mt-2">
				<a
					href="#"
					class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
					>Forgot Password?</a
				>
			</div>

			<div class="text-left text-red-700 text-xs">
				{{ authStore.error ? 'Wrong email or password' : '' }}
			</div>

			<button
				type="submit"
				@click="logIn"
				:disabled="authStore.isLoading"
				class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
			>
				Log In
			</button>
		</form>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/composables/auth'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const clearForm = () => {
	email.value = ''
	password.value = ''
}

const logIn = () => {
	// validate fields not empty
	let validated = true

	if (!email.value.trim()) {
		console.log('email is empty')
		validated = false
	}
	if (!password.value.trim()) {
		console.log('password is empty')
		validated = false
	}

	// trigger login in store
	if (validated)
		authStore.logIn({ email: email.value, password: password.value })
}
</script>
