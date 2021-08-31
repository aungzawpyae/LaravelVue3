<template>
	<div>
		<section class="absolute w-full h-full top-0">
		    <div 
		    	class="absolute top-0 w-full h-full bg-gray-900" 
		    	style="background-image: url('/img/loginbg.jpg'); background-size: cover; background-repeat: no-repeat;"
		    ></div>
		    <div class="container mx-auto px-4 h-full">
		        <div class="flex content-center items-center justify-center h-full">
		            <div class="w-full lg:w-4/12 px-4 pt-32">
		                <div 
		                	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0 pt-7"
		                >
		                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
		                        <form>
		                            <div class="relative w-full mb-3">
		                                <label 
		                                	class="block uppercase text-gray-700 text-xs font-bold mb-2" 
		                                	for="username"
		                                >Email</label>
		                                <input 
		                                	type="text"
		                                	id="username"
		                                	name="username"
		                                	class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
		                                	placeholder="Username"
		                                	v-model="form.username" 
		                                	style="transition: all 0.15s ease 0s;"
		                                >
		                            </div>

		                            <!-- <div class="relative w-full mb-3">
		                                <label 
		                                	class="block uppercase text-gray-700 text-xs font-bold mb-2" 
		                                	for="password"
		                                >Password</label>
	                                	<input 
	                                		type="password" 
	                                		id="password"
		                                	name="password"
	                                		class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" 
	                                		placeholder="Password"
	                                		v-model="form.password"  
	                                		style="transition: all 0.15s ease 0s;"
	                                	>
		                            </div> -->

		                            <div class="relative w-full mb-3">
									    <label 
									    	for="password" 
									    	class="block text-sm font-medium text-gray-700"
									    >
											Password
										</label>
									    <div class="mt-1 relative rounded-md shadow-sm">
									      	<input 
									      		:type="[showPassword ? 'text' : 'password']" 
									      		id="password"
		                                		name="password"
									      		class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:shadow-outline block w-full pr-10 text-sm rounded" 
									      		placeholder="Password"
	                                			v-model="form.password"  
	                                			style="transition: all 0.15s ease 0s;"
									      	/>
									      	<div 
									      		class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
									      		@click="toggleShow"
									      		v-if="showPassword"
									      	>
									        	<EyeOffIcon 
									        		class="h-5 w-5 text-gray-400" 
									        		aria-hidden="true" 
									        	/>
									      	</div>
									      	<div 
									      		class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
									      		@click="toggleShow"
									      		v-else
									      	>
									        	<EyeIcon 
									        		class="h-5 w-5 text-gray-400" 
									        		aria-hidden="true" 
									        	/>
									      	</div>
									    </div>
									</div>

		                            <div class="text-center mt-6">
		                                <button 
		                                	class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" 
		                                	type="button" 
		                                	style="transition: all 0.15s ease 0s;"
		                                	@click="login"
		                                >Sign In</button>
		                            </div>
		                        </form>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</section>
	</div>
</template>

<script>
	import helper from "../utils/helper";
	import Api from "../utils/api";
	import {
	  	EyeOffIcon,EyeIcon
	} from '@heroicons/vue/outline'

	export default {
		name: "Login",

		components:{
			EyeOffIcon,
			EyeIcon
		},

		data(){
			return{
				user: this.$store.state.auth.user,
				form:{
					username: null,
					password: null
				},
				showPassword: false
			}
		},
		methods:{
			login(){
				this.$store.dispatch('auth/login', this.createPayload())
				.then( response => {
					//console.log("success");
					console.log("log", this.$router.push({name: 'index'}))
					this.$router.push({name: 'index'});
				}).catch(error => {
					helper.flashErrorMessage(error);
				})
			},

			createPayload(){
				return {
          			username: this.form.username,
          			password: this.form.password
        		};
			},

			toggleShow(){
				if(this.showPassword){
					this.showPassword = false;
				} else {
					this.showPassword = true;
				}
			}
		}
	}
</script>