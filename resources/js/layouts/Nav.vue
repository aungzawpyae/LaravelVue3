<template>
	<div class="px-4 py-4 bg-white flex justify-end">
		<div class="ml-4 flex items-center md:ml-6">
	        <button 
	        	type="button" 
	        	class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	        >
	          	<span class="sr-only">View notifications</span>
	          	<BellIcon class="h-6 w-6" aria-hidden="true" />
	        </button>

	        <!-- Profile dropdown -->
	        <Menu as="div" class="ml-3 relative">
	          	<div>
	            	<MenuButton 
	            		class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	            	>
	              		<span class="sr-only">Open user menu</span>
	              		<img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
	            	</MenuButton>
	         	</div>
	          	<transition 
	          		enter-active-class="transition ease-out duration-100" 
	          		enter-from-class="transform opacity-0 scale-95" 
	          		enter-to-class="transform opacity-100 scale-100" 
	          		leave-active-class="transition ease-in duration-75" 
	          		leave-from-class="transform opacity-100 scale-100" 
	          		leave-to-class="transform opacity-0 scale-95"
	          	>
	            	<MenuItems
	            		class="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
	            	>
	            		<MenuItem>
	            			<span
	            				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
	            			>
	            				{{user.name}}
	            			</span>
	            		</MenuItem>
	            		<MenuItem>
	            			<span
	            				@click="logout"
	            				class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
	            			>
	            				Logout
	            			</span>
	            		</MenuItem>
	            	</MenuItems>
	          	</transition>
	        </Menu>
		</div>
	</div>
</template>

<script>
	import {
  		Menu,
  		MenuButton,
  		MenuItem,
  		MenuItems
	} from '@headlessui/vue'
	import {
	  	BellIcon,
	  	CalendarIcon,
	  	ChartBarIcon,
	  	FolderIcon,
	  	HomeIcon
	} from '@heroicons/vue/outline'
	import { SearchIcon } from '@heroicons/vue/solid';
	import { EventBus } from "../event-bus.js";

	export default {
	  	components: {
		    Menu,
		    MenuButton,
		    MenuItem,
		    MenuItems,
		    BellIcon,
	  	},

		data(){
			return{
				user: this.$store.state.auth.user,
			};
		},
		methods:{
			logout(){
				this.$store.dispatch("auth/logout");
			}
		}
	}
</script>