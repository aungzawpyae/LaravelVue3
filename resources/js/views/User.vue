<template>
	<m-layout>
		<div 
	    	class="flex px-5 py-5"
	    	aria-label="Breadcrumb"
	    >
	        <ol role="list" class="flex items-center space-x-4">
		        <li>
		            <div class="flex">
		            	<router-link
		            		:to="{name:'index'}"
		            		class="text-sm font-medium text-gray-500 hover:text-gray-700"
		            	>
		            		Home
		            	</router-link>
		            </div>
		        </li>
	          	<li>
		            <div class="flex items-center">
		              	<ChevronRightIcon 
		              		class="flex-shrink-0 h-5 w-5 text-gray-400" 
		              		aria-hidden="true" 
		              	/>
		              	<span 
		              		class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
		              	>
		              		User
		              	</span>
		            </div>
	          	</li>
	        </ol>
	    </div>
		
		<div class="mx-5 mt-5 bg-white rounded-lg px-2 py-2">
			User
		</div>
	</m-layout>	
</template>


<script>
	import {
	  	ChevronRightIcon,
	} from '@heroicons/vue/outline'

	export default {
		name: "Dashboard",

		components:{
			ChevronRightIcon
		},

		data(){
			return{

			}
		},
		methods:{
			
		}
	}
</script>