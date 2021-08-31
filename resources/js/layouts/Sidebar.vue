<template>
    <div class="hidden md:flex md:flex-shrink-0">
      	<div class="flex flex-col w-64">

        <!-- Sidebar component, swap this element with another sidebar if you like -->
        	<div class="flex-1 flex flex-col min-h-0">
        		<router-link :to="{name: 'index'}">
		      		<div 
		      			class="flex items-center cursor-pointer h-16 flex-shrink-0 px-4 bg-gray-900"
		      		>
		        		<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
		      		</div>
		      	</router-link>
          		<div class="flex-1 flex flex-col overflow-y-auto">
            		<nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1">

            			<router-link
            				:to="{name: 'index'}"
            				:class="[current == 'index' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
            			>
            				<HomeIcon
                				:class="[current == 'index' ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" 
                				aria-hidden="true" 
                			></HomeIcon>
                			Dashboard
            			</router-link>
            			<router-link
            				:to="{name: 'user'}"
            				:class="[current == 'user' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
            			>
            				<UserIcon
                				:class="[current == 'user' ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" 
                				aria-hidden="true" 
                			></UserIcon>User

            			</router-link>
            		</nav>
          		</div>
        	</div>
      	</div>
    </div>

</template>

<script>

	import {
	  	HomeIcon,
	  	UserIcon
	} from '@heroicons/vue/outline'

	import { SearchIcon } from '@heroicons/vue/solid'

	export default {
	  	components: {
		    HomeIcon,
		    UserIcon
	  	},
		data(){
			return{
				current: this.$route.name,
			}
		},
		mounted(){},
		methods:{}
	}
</script>