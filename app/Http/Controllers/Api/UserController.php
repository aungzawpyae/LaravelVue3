<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;

class AgentController extends Controller
{
	protected $repo;

	public function __construct(UserRepository $repo){
		$this->repo = $repo;
	}

	public function index(Request $request){
		$list = User::paginate();
		return UserResource::collection($list);
	}
}