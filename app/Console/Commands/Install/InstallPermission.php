<?php

namespace App\Console\Commands\Install;

use Illuminate\Support\Str;
use Illuminate\Console\Command;
use App\Models\Role;
use App\Models\Permission;

class InstallPermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:permission';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert default permissions from config file.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('---- Inserting Permissions ----');
        $this->insertPermissions();
        $this->info('---- Add All Permission To Admin Role ----');
        $this->addAllPermissionToSuperAdmin();
    }

    protected function insertPermissions()
    {
        Permission::truncate();
        $permissions = config('permissions');
        foreach ($permissions as $group => $permissionGroup) {
            foreach ($permissionGroup as $permission) {
                Permission::create([
                    'name' => $permission,
                    'slug' => Str::slug($permission['en']),
                    'group' => $group,
                ]);   
            }
        }
    }

    protected function addAllPermissionToSuperAdmin()
    {
        $role = Role::where('slug', 'super-admin')->first();
        $permissions = Permission::get(['slug'])->pluck('slug');
        $role->update([
            'permissions'=> $permissions,
        ]);
    }
}
