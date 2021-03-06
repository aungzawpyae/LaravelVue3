<?php

namespace App\Console\Commands\Install;

use Illuminate\Support\Str;
use Illuminate\Console\Command;
use App\Models\Role;
use App\Models\Permission;

class CreateRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:role';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert new role to database.';

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
        $nameEN = $this->ask('Role Name (English)');
        $nameMM = $this->ask('Role Name (Myanmar)');
        $level = (int) $this->ask('Role Level Number');

        Role::create([
            'name' => ['en' => $nameEN, 'mm' => $nameMM],
            'slug' => Str::slug($nameEN),
            'level' => $level,
        ]);

        $this->info('Role ' . $nameEN . ' is created.');
    }

}
